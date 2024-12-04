import PropTypes from 'prop-types';
import { Form, Input, Modal, message } from 'antd';
import authService from "../../../services/auth.service";
import departmentService from "../../../services/department.service";
import { refreshPage } from "../../../common";

const EditDepartment = ({ open, close, selectedDepartment }) => {
  const [form] = Form.useForm();

  const handleClear = () => {
    form.resetFields();
  };

  const organisation = authService.getUserOrganisationId();
  const handleSaveChanges = async () => {
    try {
      const values = await form.validateFields();
      const data = { ...values, organisation };
      console.log("data: ", data);

      const response = await departmentService.update(selectedDepartment.id, data);

      if (response?.status === 200) {
        message.success("Department edited successfully");
        handleClear();
        close();
        refreshPage();
      } else {
        message.error("Failed to edit department, please try again later");
      }
    } catch (error) {
      console.log('Failed to save changes:', error);
    }
  };

  return (
    <Modal
      title="Modify Department Details"
      open={open}
      onOk={handleSaveChanges}
      onCancel={() => {
        handleClear();
        close();
      }}
      okText="Save"
      cancelText="Cancel"
      width={600}
      maskClosable
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={selectedDepartment}
      >
        <Form.Item
          label="Department Name"
          name="name"
          rules={[{ required: true, message: 'Please input the department name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditDepartment.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  selectedDepartment: PropTypes.shape({
    id: PropTypes.string.isRequired,  // Ensure id is required
    name: PropTypes.string,
    organisation_name: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default EditDepartment;
