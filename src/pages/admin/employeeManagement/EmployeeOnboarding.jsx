import { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import './employeeOnboarding.css';
import { refreshPage } from '../../../common';
import departmentService from '../../../services/department.service';
import employeeService from '../../../services/employee.service';
import authService from '../../../services/auth.service';

const { Option } = Select;

const EmployeeOnboarding = () => {
  const [form] = Form.useForm();
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDepartmentData();
  }, []);

  const getDepartmentData = async () => {
    try {
      const response = await departmentService.getAllByOrganisationId(
        authService.getUserOrganisationId()
      );

      if (response.status === 200) {
        setDepartmentData(response.data);
      }
    } catch (e) {
      console.log(e);
      message.error("Failed to load department data");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const organisation = authService.getUserOrganisationId();
      const data = { ...values, organisation };

      const response = await employeeService.createGeneralUser(data);

      if (response.status === 201) {
        console.log('Form submitted:', data);
        message.success('Employee onboarding successful');
        refreshPage();
      } else {
        message.error("Failed to onboard employee, please try again later");
      }
    } catch (error) {
      message.error("Failed to onboard employee, please try again later", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <Form
        form={form}
        layout="vertical"
        className="registerForm"
        onFinish={handleSubmit}
        initialValues={{
          gender: '---',
          province: '---',
          employee_status: 'ACTIVE'
        }}
      >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please enter your first name' }, { pattern: /^[a-zA-Z\s]*$/, message: 'Only letters allowed' }]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please enter your last name' }, { pattern: /^[a-zA-Z\s]*$/, message: 'Only letters allowed' }]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Select>
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Personal Email"
          name="personal_email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input placeholder="Enter Personal Email" />
        </Form.Item>

        <Form.Item
          label="Company Email"
          name="company_email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid company email' }]}
        >
          <Input placeholder="Enter Company Email" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{ required: true, message: 'Please enter your phone number' }, { pattern: /^[\d+]*$/, message: 'Only numbers allowed' }]}
        >
          <Input placeholder="Enter Phone Number" />
        </Form.Item>

        <Form.Item
          label="Job Title"
          name="job_title"
          rules={[{ required: true, message: 'Please enter your job title' }]}
        >
          <Input placeholder="Enter Job Title" />
        </Form.Item>

        <Form.Item
          label="Current Location"
          name="current_location"
          rules={[{ required: true, message: 'Please enter your current work station' }]}
        >
          <Input placeholder="Enter Current Location" />
        </Form.Item>

        <Form.Item
          label="Employee Status"
          name="employee_status"
          rules={[{ required: true, message: 'Please select an employee status' }]}
        >
          <Select>
            <Option value="ACTIVE">Active</Option>
            <Option value="INACTIVE">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: 'Please select a department' }]}
        >
          <Select placeholder="Select Department">
            {departmentData.map((department) => (
              <Option key={department.id} value={department.id}>
                {department.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '50%' }} loading={loading}>
            Onboard
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EmployeeOnboarding;
