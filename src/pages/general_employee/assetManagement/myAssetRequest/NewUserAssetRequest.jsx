import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
} from "antd";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import authService from "../../../../services/auth.service";
import assetCategoriesServices from "../../../../services/asset-categories.services";
import assetRequestsServices from "../../../../services/asset-requests.services";

const { Option } = Select;

const NewUserAssetRequest = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await assetCategoriesServices.getAllByOrganisationId(authService.getUserOrganisationId());

        if (categoryResponse?.status === 200) {
          setCategories(categoryResponse?.data);
        }
      } catch (error) {
        message.error("Failed to fetch data.");
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        asset_requested: values.asset_requested,
        request_description: values.request_description,
        category: values.category,
        requested_by: authService.getUserId(),
      };

      const response = await assetRequestsServices.create(payload);

      if (response?.status === 201) {
        message.success("Asset request submitted successfully!");
        onSuccess();
        form.resetFields();
        onClose();
      } else {
        message.error("Failed to submit request, please try again.");
      }
    } catch (error) {
      message.error("An error occurred while submitting the request.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Request New Asset"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={550}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select the asset category!" }]}
        >
          <Select placeholder="Select category">
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Asset Requested"
          name="asset_requested"
          rules={[{ required: true, message: "Please enter the asset name!" }]}
        >
          <Input placeholder="e.g., Laptop" />
        </Form.Item>

        <Form.Item
          label="Request Description"
          name="request_description"
        >
          <Input.TextArea placeholder="Provide details about the request" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit Request
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewUserAssetRequest.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default NewUserAssetRequest;
