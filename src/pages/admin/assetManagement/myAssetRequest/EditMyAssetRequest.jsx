import PropTypes from "prop-types";
import { Modal, Form, Input, Select, DatePicker, Button, message, Tag } from "antd";
import { useState, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import authService from "../../../../services/auth.service";
import assetRequestsServices from "../../../../services/asset-requests.services";
import assetCategoriesServices from "../../../../services/asset-categories.services";

const { Option } = Select;

const EditMyAssetRequest = ({ visible, onClose, asset, onSuccess }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await assetCategoriesServices.getAllByOrganisationId(authService.getUserOrganisationId());
        if (response?.status === 200) {
          setCategories(response?.data || []);
        } else {
          message.error("Failed to fetch asset categories.");
        }
      } catch (error) {
        message.error("An error occurred while fetching asset categories.");
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (asset) {
      form.setFieldsValue({
        category: asset.category?.name,
        requested_by: `${asset.requested_by?.first_name} ${asset.requested_by?.last_name}`,
        request_date: moment(),
        request_status: asset.request_status,
        approved_by: asset.approved_by ? `${asset.approved_by.first_name} ${asset.approved_by.last_name}` : "",
        allocated_by: asset.allocated_by ? `${asset.allocated_by.first_name} ${asset.allocated_by.last_name}` : "",
        allocation_status: asset.allocation_status,
        date_approved: asset.date_approved ? moment(asset.date_approved) : null,
      });
    }
  }, [asset, form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const selectedCategory = categories.find(category => category.name === values.category);

      const payload = {
        ...values,
        category: selectedCategory?.id,
        requested_by: asset.requested_by?.id,
        approved_by: asset.approved_by?.id,
        allocated_by: asset.allocated_by?.id,
        request_date: values.request_date ? values.request_date.format("YYYY-MM-DD") : null,
        date_approved: values.date_approved ? values.date_approved.format("YYYY-MM-DD") : null,
      };

      const response = await assetRequestsServices.update(asset.id, payload);

      if (response?.status === 200) {
        message.success("Asset request updated successfully!");
        onSuccess();
        onClose();
      } else {
        message.error("Failed to update asset request, please try again.");
      }
    } catch (error) {
      message.error("An error occurred while updating the asset request.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Asset Request"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select category">
            {categories.map(category => (
              <Option key={category.id} value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Requested By"
          name="requested_by"
          rules={[{ required: true, message: "Please enter the requested by!" }]}
        >
          <Input placeholder="e.g., John Doe" disabled />
        </Form.Item>

        <Form.Item
          label="Request Date"
          name="request_date"
          rules={[{ required: true, message: "Please select the request date!" }]}
        >
          <DatePicker style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item
          label="Request Status"
          name="request_status"
          rules={[{ required: true, message: "Please select the request status!" }]}
        >
          <Select placeholder="Select status" disabled>
            <Option value="PENDING">Pending</Option>
            <Option value="APPROVED">Approved</Option>
            <Option value="REJECTED">Rejected</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Approved By"
          name="approved_by"
        >
          <Input placeholder="e.g., Jane Smith" disabled />
        </Form.Item>

        <Form.Item
          label="Allocated By"
          name="allocated_by"
        >
          <Input placeholder="e.g., Tom Williams" disabled />
        </Form.Item>

        <Form.Item
          label="Allocation Status"
          name="allocation_status"
        >
          <Select placeholder="Select allocation status" disabled>
            <Option value="ALLOCATED">Allocated</Option>
            <Option value="NOT_ALLOCATED">Not Allocated</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date Approved"
          name="date_approved"
        >
          <DatePicker style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Update Request
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditMyAssetRequest.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default EditMyAssetRequest;
