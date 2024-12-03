import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import authService from "../../../services/auth.service";
import employeeService from "../../../services/employee.service"; 
import departmentService from "../../../services/department.service";
import { refreshPage } from "../../../common";

const { Option } = Select;

const EditEmployee = ({ open, close, selectedEmployee }) => {
    const [form] = Form.useForm();
    const [departmentData, setDepartmentData] = useState([]);

    useEffect(() => {
        getDepartmentData();
    }, []);

    const getDepartmentData = async () => {
        try {
            const response = await departmentService.getAllByOrganisationId(authService.getUserOrganisationId());
            if (response.status === 200) {
                setDepartmentData(response?.data);
            }
        } catch (e) {
            message.error("Failed to load department data");
            console.log(e);
        }
    };

    const handleClear = () => {
        form.resetFields();
    };

    const organisation = authService.getUserOrganisationId();

    const handleSaveChanges = async () => {
        try {
            const values = await form.validateFields();
            const data = { ...values, organisation };

            const response = await employeeService.update(selectedEmployee.id, data);

            if (response?.status === 200) {
                message.success("Employee details updated successfully");
                handleClear();
                close();
                refreshPage();
            } else {
                message.error("Failed to update employee details, please try again later");
            }
        } catch (error) {
            console.error('Failed to save changes:', error);
            message.error("Error saving changes.");
        }
    };

    return (
        <Modal
            title="Modify Employee Details"
            open={open}
            onOk={handleSaveChanges}
            onCancel={() => {
                handleClear();
                close();
            }}
            okText="Save"
            cancelText="Cancel"
            width={800}
            maskClosable
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    ...selectedEmployee,
                    department: selectedEmployee?.department?.id,
                }}
            >
                <Form.Item label="First Name" name="first_name" >
                    <Input />
                </Form.Item>

                <Form.Item label="Last Name" name="last_name" >
                    <Input />
                </Form.Item>

                <Form.Item label="Job Title" name="job_title" >
                    <Input />
                </Form.Item>

                <Form.Item label="Gender" name="gender" >
                    <Input />
                </Form.Item>

                <Form.Item label="Phone Number" name="phone_number" >
                    <Input />
                </Form.Item>

                <Form.Item label="Company Email" name="company_email" >
                    <Input />
                </Form.Item>

                <Form.Item label="Personal Email" name="personal_email" >
                    <Input />
                </Form.Item>

                <Form.Item label="Current Location" name="current_location" >
                    <Input />
                </Form.Item>

                <Form.Item 
                    label="Employee Status" 
                    name="employee_status" 
                >
                    <Select placeholder="Select Employee Status">
                        <Option value="ACTIVE">Active</Option>
                        <Option value="ON_LEAVE">On Leave</Option>
                        <Option value="ON_PAUSE">On Pause</Option>
                        <Option value="BUFFER">Buffer</Option>
                        <Option value="SECONDMENT">Secondment</Option>
                        <Option value="TERMINATED">Terminated</Option>
                    </Select>
                </Form.Item>

                <Form.Item 
                    label="Account Status" 
                    name="account_status" 
                >
                    <Select placeholder="Select Employee Status">
                        <Option value="ACTIVE">Active</Option>
                        <Option value="IN_ACTIVE">In Active</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Department"
                    name='department'
                >
                    <Select placeholder="Select Department">
                        {departmentData.map((department) => (
                            <Option key={department.id} value={department.id}>
                                {department.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

EditEmployee.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    selectedEmployee: PropTypes.shape({
        id: PropTypes.string.isRequired,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        role: PropTypes.string,
        gender: PropTypes.string,
        phone_number: PropTypes.string,
        company_email: PropTypes.string,
        current_location: PropTypes.string,
        department: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
        }),
    }),
};

export default EditEmployee;
