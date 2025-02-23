import PropTypes from "prop-types";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import assetCategoriesServices from "../../../../services/asset-categories.services";
import authService from "../../../../services/auth.service";
import assetRequestsServices from "../../../../services/asset-requests.services";

const { Option } = Select;

const EditUserAssetRequest = ({ visible, onClose, asset, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    console.clear();
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

  useEffect(() => {
    console.clear();
    if (asset) {
      form.setFieldsValue({
        category: asset.category?.id,
        asset_requested: asset.asset_requested,
        request_description: asset.request_description,
      });
    }
  }, [asset, form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        category: values.category,
        asset_requested: values.asset_requested,
        request_description: values.request_description,
        requested_by: asset?.requested_by?.id
      };

      const response = await assetRequestsServices.update(asset.id, payload);

      if (response?.status === 200) {
        message.success("Asset request updated successfully!");
        onSuccess();
        onClose();
      } else {
        message.error("Failed to update request, please try again.");
      }
    } catch (error) {
      message.error("An error occurred while updating the request.");
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
      width={600}
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
            Update Request
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditUserAssetRequest.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default EditUserAssetRequest;
