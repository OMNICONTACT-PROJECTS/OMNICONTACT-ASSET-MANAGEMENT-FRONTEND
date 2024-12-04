import PropTypes from "prop-types";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Button,
  message,
} from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import assetsServices from "../../../../services/assets.services";
import authService from "../../../../services/auth.service";

const { Option } = Select;

const EditMyAssetRequest = ({ visible, onClose, asset, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (asset) {
      form.setFieldsValue({
        ...asset,
        acquired_date: asset.acquired_date
          ? moment(asset.acquired_date, "YYYY-MM-DD")
          : null,
      });
    }
  }, [asset, form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        category: asset.category.id,
        organisation: authService.getUserOrganisationId(),
        acquired_date: values.acquired_date
          ? values.acquired_date.format("YYYY-MM-DD")
          : null,
      };

      const response = await assetsServices.update(asset.id, payload);

      if (response?.status === 200) {
        message.success("Asset updated successfully!");
        onSuccess();
        onClose();
      } else {
        message.error("Failed to update asset, please try again.");
      }
    } catch (error) {
      message.error("An error occurred while updating the asset.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Asset"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Model Name"
          name="model_name"
          rules={[{ required: true, message: "Please enter the model name!" }]}
        >
          <Input placeholder="e.g., Lenovo ThinkPad" />
        </Form.Item>

        <Form.Item
          label="Serial Number"
          name="serial_number"
          rules={[
            { required: true, message: "Please enter the serial number!" },
          ]}
        >
          <Input placeholder="e.g., T2637M0" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Additional details about the asset" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            { required: true, message: "Please select the asset status!" },
          ]}
        >
          <Select placeholder="Select asset status">
            <Option value="AVAILABLE">Available</Option>
            <Option value="ALLOCATED">Allocated</Option>
            <Option value="UNDER_MAINTENANCE">Under Maintenance</Option>
            <Option value="RESERVED">Reserved</Option>
            <Option value="LOST">Lost</Option>
            <Option value="DISCARDED">Discarded</Option>
            <Option value="TRANSFERRED">Transferred</Option>
            <Option value="OBSOLETE">Obsolete</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Purchase Price"
          name="purchase_price"
          rules={[
            { required: true, message: "Please enter the purchase price!" },
          ]}
        >
          <InputNumber
            min={0}
            placeholder="e.g., 550.00"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Current Value"
          name="current_value"
          rules={[
            { required: true, message: "Please enter the current value!" },
          ]}
        >
          <InputNumber
            min={0}
            placeholder="e.g., 500.00"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter the location!" }]}
        >
          <Input placeholder="e.g., Graniteside" />
        </Form.Item>

        <Form.Item
          label="Acquired Date"
          name="acquired_date"
          rules={[
            { required: true, message: "Please select the acquired date!" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Update Asset
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
