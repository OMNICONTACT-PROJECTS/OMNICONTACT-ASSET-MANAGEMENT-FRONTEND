import PropTypes from 'prop-types';
import { Form, Input, Modal } from 'antd';

const EditEmployee = ({ open, close, selectedEmployee }) => {
    const [form] = Form.useForm();

    const handleClear = () => {
        form.resetFields();
    };

    return (
        <>
            <Modal
                title="Modify Employee Details"
                open={open}
                okText="Save"
                cancelText="Cancel"
                onCancel={() => {
                    handleClear();
                    close();
                }}
                width={800}
                maskClosable
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={selectedEmployee}
                // onFinish={handleSaveChanges}
                >
                    <Form.Item label="First Name">
                        <Input defaultValue={selectedEmployee?.first_name} />
                    </Form.Item>
                    <Form.Item label="Last Name">
                        <Input defaultValue={selectedEmployee?.last_name} />
                    </Form.Item>
                    <Form.Item label="Role">
                        <Input defaultValue={selectedEmployee?.role} />
                    </Form.Item>
                    <Form.Item label="Gender">
                        <Input defaultValue={selectedEmployee?.gender} />
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        <Input defaultValue={selectedEmployee?.phone_number} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input defaultValue={selectedEmployee?.company_email} />
                    </Form.Item>
                    <Form.Item label="Province">
                        <Input defaultValue={selectedEmployee?.current_location} />
                    </Form.Item>
                    <Form.Item label="Department">
                        <Input defaultValue={selectedEmployee?.department.name} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

EditEmployee.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    selectedEmployee: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        role: PropTypes.string,
        gender: PropTypes.string,
        phone_number: PropTypes.string,
        company_email: PropTypes.string,
        current_location: PropTypes.string,
        department: PropTypes.string,
    }),
};

export default EditEmployee;
