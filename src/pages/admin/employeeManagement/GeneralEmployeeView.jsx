import { Space, Table, Input, Button, Popconfirm, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import { Edit3, LucideView, Trash2 } from 'lucide-react';
import employeeService from '../../../services/employee.service';
import authService from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { refreshPage } from '../../../common';
import EditEmployee from './EditEmployee';


const GeneralEmployeeView = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('');
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState([])

  const fetchGeneralEmployeeData = async() => {
   try {
     const employeeResponse = await employeeService.getAllGeneralUsersByOrganisationId(
       authService.getUserOrganisationId()
     );
 
     if (employeeResponse.status == 200) {
       setEmployeeData(employeeResponse?.data)
     }
   } catch (e) {
     console.log(e);
     message.error("No employees found")
   }
 }

   useEffect(() => {
    fetchGeneralEmployeeData()
   }, [])
   
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
          <Tooltip title="More details">
            <Button
              className="p-1 border-0 text-light"
              icon={<LucideView size={18} />}
              onClick={() => {
                navigate(
                  `#`
                );
              }}
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

  const editEmployee = (vehicle) => {
    setSelectedEmployee(vehicle);
    setEditEmployeeModal(true);
  };

  const closeEditEmployeeModal = () => {
    setEditEmployeeModal(false);
    setSelectedEmployee(null);
  }

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

      <EditEmployee
        open={editEmployeeModal}
        close={closeEditEmployeeModal}
        selectedEmployee={selectedEmployee}
      />
    </>
  );
};

export default GeneralEmployeeView;
