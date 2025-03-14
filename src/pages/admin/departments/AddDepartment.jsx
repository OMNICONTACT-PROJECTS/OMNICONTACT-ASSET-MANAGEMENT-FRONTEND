import PropTypes from "prop-types";
import { Form, Input, Modal, message } from "antd";
import authService from "../../../services/auth.service";
import departmentService from "../../../services/department.service";
import { refreshPage } from "../../../common";

const AddDepartment = ({ open, close }) => {
  const [form] = Form.useForm();

  const handleClear = () => {
    form.resetFields();
  };

  const organisation = authService.getUserOrganisationId();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = { ...values, organisation };
      console.log("data: ", data);
      const response = await departmentService.create(data);
      if (response?.status === 201) {
        message.success("Department added successfully");
        handleClear();
        close();
        refreshPage();
      } else {
        message.error("Failed to add department, please try again later");
      }
    } catch (error) {
      console.log("Failed to submit:", error);
      message.error("Failed to add department, please try again later");
    }
  };

  return (
    <Modal
      title="Add New Department"
      open={open}
      onOk={handleSubmit}
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
      <Form form={form} layout="vertical">
        <Form.Item
          label="Department Name"
          name="name"
          rules={[
            { required: true, message: "Please input the department name!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

AddDepartment.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

console.clear();
export default AddDepartment;
