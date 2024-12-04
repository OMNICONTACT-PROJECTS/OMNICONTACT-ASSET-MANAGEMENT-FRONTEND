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
import assetsServices from "../../../../services/assets.services";
import authService from "../../../../services/auth.service";
import PropTypes from "prop-types";
import employeeService from "../../../../services/employee.service";

const { Option } = Select;

const NewAssetItem = ({ visible, onClose, onSuccess, category }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await employeeService.getAll();
        if (response?.data) {
          setUsers(response?.data);
        }
      } catch (error) {
        message.error("Failed to fetch users.");
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const organisationId = authService.getUserOrganisationId();
      const payload = {
        ...values,
        category: category,
        organisation: organisationId,
        acquired_date: values.acquired_date.format("YYYY-MM-DD"),
      };

      const response = await assetsServices.create(payload);

      if (response?.status === 201) {
        message.success("Asset added successfully!");
        onSuccess();
        form.resetFields();
        onClose();
      } else {
        message.error("Failed to add asset, please try again");
      }
    } catch (error) {
      message.error("An error occurred while adding the asset.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Asset"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={750}
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
          rules={[{ required: true, message: "Please enter the serial number!" }]}
        >
          <Input placeholder="e.g., T2637M0" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Additional details about the asset" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the asset status!" }]}
        >
          <Select
            placeholder="Select asset status"
            onChange={(value) => setStatus(value)}
          >
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
        {status === "ALLOCATED" && (
          <Form.Item
            label="Allocated To"
            name="allocated_to"
            rules={[{ required: true, message: "Please select the user allocated the asset!" }]}
          >
            <Select placeholder="Select user with the asset">
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          label="Purchase Price"
          name="purchase_price"
          rules={[{ required: true, message: "Please enter the purchase price!" }]}
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
          rules={[{ required: true, message: "Please enter the current value!" }]}
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
          rules={[{ required: true, message: "Please select the acquired date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewAssetItem.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default NewAssetItem;
