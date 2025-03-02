import { Modal, Upload, Select, Button, message, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import PropTypes from "prop-types";
import employeeService from "../../../services/employee.service";
import authService from "../../../services/auth.service";

const { Dragger } = Upload;
const { Option } = Select;

const UserBulkyUpload = ({ visible, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("XLSX");
  const [form] = Form.useForm();

  const handleUpload = async (values) => {
    if (!file) {
      message.error("Please upload a file before submitting.");
      return;
    }

    setLoading(true);
    try {
      const organisationId = authService.getUserOrganisationId();
      const formData = new FormData();

      formData.append("file_type", values.file_type);
      formData.append("file_name", values.file_name);
      formData.append("file", file);
      formData.append("organisation", organisationId);

      const response = await employeeService.bulkUploadUsers(formData);

      if (response?.status === 201) {
        message.success("File uploaded successfully!");
        onSuccess();
        setFile(null);
        form.resetFields();
        onClose();
      } else {
        message.error("Failed to upload file, please try again.");
      }
    } catch (error) {
      message.error(error.response?.data?.error || "An error occurred while uploading the file.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      setFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => setFile(null),
  };
  console.clear();
  return (
    <Modal
      title="Bulk Upload Assets"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleUpload}>
        {/* File Type Selection */}
        <Form.Item
          label="File Type"
          name="file_type"
          rules={[{ required: true, message: "Please select a file type!" }]}
        >
          <Select value={fileType} onChange={setFileType} placeholder="please select file type">
            <Option default value="XLSX">XLSX</Option>
            <Option value="XLS">XLS</Option>
            <Option value="CSV">CSV</Option>
            <Option value="JSON">JSON</Option>
          </Select>
        </Form.Item>

        {/* Readonly File Name Field */}
        <Form.Item label="File Name" name="file_name" initialValue="USER_UPLOAD_FILE">
          <Input readOnly />
        </Form.Item>

        {/* File Upload */}
        <Form.Item
          label="Upload File"
          rules={[{ required: true, message: "Please upload a file!" }]}
        >
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Only one file can be uploaded at a time.</p>
          </Dragger>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
            Upload File
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

UserBulkyUpload.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default UserBulkyUpload;
