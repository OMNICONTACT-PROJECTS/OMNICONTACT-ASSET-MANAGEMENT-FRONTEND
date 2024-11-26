import { Space, Table, Input, Button, Popconfirm, Tooltip, message, Modal } from 'antd';
import { useState } from 'react';
import { Edit3, LucideView, Trash2 } from 'lucide-react';
import employeeService from '../../../services/employee.service';
import authService from '../../../services/auth.service';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { refreshPage } from '../../../common';
import EditEmployee from './EditEmployee';

export async function AllEmployeesViewLoader() {
  try {
    const employeeResponse = await employeeService.getAllByOrganisationId(
      authService.getUserOrganisationId()
    );
    if (employeeResponse.status !== 200) {
      console.log("No employees found.");
    }

    return {
      employeeData: employeeResponse?.data,
    };
  } catch (e) {
    console.log(e);
    return { employeeData: [] };
  }
}

const AllEmployeesView = () => {
  const navigate = useNavigate()
  const { employeeData } = useLoaderData();
  const [searchText, setSearchText] = useState('');
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewEmployeeModal, setViewEmployeeModal] = useState(false);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'User', value: 'User' },
        { text: 'IS SUPPORT', value: 'IS SUPPORT' },
        { text: 'Admin', value: 'Admin' },
        { text: 'Developer', value: 'Developer' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Employee Status',
      dataIndex: 'employee_status',
      key: 'employee_status',
    },
    {
      title: 'Location',
      dataIndex: 'current_location',
      key: 'current_location',
      filters: [
        { text: 'Harare', value: 'Harare' },
        { text: 'Matebeleland', value: 'Matebeleland' },
        { text: 'Bulawayo', value: 'Bulawayo' },
        { text: 'Mutare', value: 'Mutare' },
        { text: 'Masvingo', value: 'Masvingo' },
        { text: 'Gweru', value: 'Gweru' },
        { text: 'Kwekwe', value: 'Kwekwe' },
      ],
      onFilter: (value, record) => record.province === value,
    },
    {
      title: 'Department',
      dataIndex: ['department', 'name'],
      key: 'department',
      filters: [
        { text: 'Web Developer', value: 'Web Developer' },
        { text: 'IS', value: 'IS' },
        { text: 'HR', value: 'HR' },
        { text: 'Business Analysis', value: 'Business Analysis' },
        { text: 'Inbound', value: 'Inbound' },
        { text: 'Outbound', value: 'Outbound' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Help Desk', value: 'Help Desk' },
        { text: 'Impact Source Team', value: 'Impact Source Team' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="small">
          <Tooltip title="View More">
            <Button
              className="p-1 border-0 text-light"
              icon={<LucideView size={18} />}
              onClick={() => showEmployeeDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Employee">
            <Button
              className="p-1 border-0 text-light"
              icon={<Edit3 size={18} />}
              onClick={() => editEmployee(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Employee">
            <Popconfirm
              title="Delete Employee"
              description="Are you sure you want to delete this Employee?"
              onConfirm={() => deleteUser(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="danger"
                icon={<Trash2 size={18} color='red' />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const editEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEditEmployeeModal(true);
  };

  const deleteUser = async (user) => {
    try {
      const response = await employeeService.delete(user.id);
      if (response.status === 204) {
        message.success("Employee Deleted successfully");
        refreshPage();
      }
    } catch (e) {
      message.error("Failed to delete employee");
      console.error(e);
    }
  };

  const showEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setViewEmployeeModal(true);
  };

  const closeViewEmployeeModal = () => {
    setViewEmployeeModal(false);
    setSelectedEmployee(null);
  };

  const handleSearch = () => {
    const filteredData = employeeData.filter(
      (item) =>
        item.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredData;
  };

  return (
    <>
      <Input
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 200, marginBottom: 16, marginRight: 8 }}
      />
      <Button onClick={handleSearch} type="primary">
        Search
      </Button>
      <Table className='table-responsive' columns={columns} dataSource={handleSearch()} />

      {/* Employee Details Modal */}
      <Modal
        title="Employee Details"
        visible={viewEmployeeModal}
        onCancel={closeViewEmployeeModal}
        footer={null}
        width={800}
      >
        {selectedEmployee && (
          <div>
            <p><strong>Profile Picture:</strong> {selectedEmployee.profile_picture}</p>
            <p><strong>First Name:</strong> {selectedEmployee.first_name}</p>
            <p><strong>Last Name:</strong> {selectedEmployee.last_name}</p>
            <p><strong>Gender:</strong> {selectedEmployee.gender}</p>
            <p><strong>National ID:</strong> {selectedEmployee.id}</p>
            <p><strong>Phone Number:</strong> {selectedEmployee.phone_number}</p>
            <p><strong>Username:</strong> {selectedEmployee.username}</p>
            <p><strong>Role:</strong> {selectedEmployee.role}</p>
            <p><strong>Personal Email:</strong> {selectedEmployee.personal_email}</p>
            <p><strong>Company Email:</strong> {selectedEmployee.company_email}</p>
            <p><strong>Organisation:</strong> {selectedEmployee.organisation.organisation_name}</p>
            <p><strong>Location:</strong> {selectedEmployee.current_location}</p>
            <p><strong>Department:</strong> {selectedEmployee.department?.name}</p>
            <p><strong>Job Title:</strong> {selectedEmployee.job_title}</p>
            <p><strong>Employee Status:</strong> {selectedEmployee.employee_status}</p>
            <p><strong>Account Status:</strong> {selectedEmployee.account_status}</p>
            <p><strong>Date Created:</strong> {selectedEmployee.date_created}</p>
            <p><strong>Last Updated:</strong> {selectedEmployee.last_updated}</p>
          </div>
        )}
      </Modal>

      {/* Edit Employee Modal */}
      <EditEmployee
        open={editEmployeeModal}
        close={() => setEditEmployeeModal(false)}
        selectedEmployee={selectedEmployee}
      />
    </>
  );
};

export default AllEmployeesView;
