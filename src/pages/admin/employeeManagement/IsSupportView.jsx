import { Space, Table, Input, Button, Modal, Form, Input as AntdInput } from 'antd';
import { useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';

const IsSupportView = () => {
    const [searchText, setSearchText] = useState('');
    const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [data, setData] = useState([
        {
            key: '1',
            firstName: 'Lisa',
            surname: 'Kun',
            role: 'Developer',
            gender: 'Female',
            phoneNumber: '0778853159',
            nationalId: '23-2839789 Y45',
            province: 'Harare Central',
            department: 'Web Developer',
        },
        {
            key: '2',
            firstName: 'Macdonald',
            surname: 'Chiroro',
            role: 'Developer',
            gender: 'Male',
            phoneNumber: '07788531444',
            nationalId: '23-2839789 Y45',
            province: 'Matebeleland',
            department: 'Web Developer',
        },
        {
            key: '3',
            firstName: 'Anesu',
            surname: 'Mashonga',
            role: 'Developer',
            gender: 'Male',
            phoneNumber: '345-678-9012',
            nationalId: 'ID11223',
            province: 'Harare Central',
            department: 'Web Developer',
        },
        {
            key: '4',
            firstName: 'Grace',
            surname: 'Mwale',
            role: 'User',
            gender: 'Female',
            phoneNumber: '0712345678',
            nationalId: '23-1234567 A12',
            province: 'Harare Central',
            department: 'Human Resources HR',
        },
        {
            key: '5',
            firstName: 'Peter',
            surname: 'Moyo',
            role: 'IS SUPPORT',
            gender: 'Male',
            phoneNumber: '0789987654',
            nationalId: '23-9876543 B34',
            province: 'Matebeleland',
            department: 'Information Systems',
        },
        {
            key: '6',
            firstName: 'Nokuthula',
            surname: 'Gumbo',
            role: 'Admin',
            gender: 'Female',
            phoneNumber: '0734567890',
            nationalId: '23-5678901 C56',
            province: 'Matebeleland',
            department: 'Help Desk',
        },
        {
            key: '7',
            firstName: 'Simba',
            surname: 'Shumba',
            role: 'Admin',
            gender: 'Male',
            phoneNumber: '0712345689',
            nationalId: '23-8765432 D78',
            province: 'Harare Central',
            department: 'Business Analysis',
        },
        {
            key: '8',
            firstName: 'Tatenda',
            surname: 'Ngwenya',
            role: 'Developer',
            gender: 'Male',
            phoneNumber: '0779876543',
            nationalId: '23-6789012 E90',
            province: 'Harare Central',
            department: 'Marketing',
        },
        {
            key: '9',
            firstName: 'Chipo',
            surname: 'Nyathi',
            role: 'IS SUPPORT',
            gender: 'Female',
            phoneNumber: '0798765432',
            nationalId: '23-8901234 F12',
            province: 'Matebeleland',
            department: 'Impact Source Team',
        },
        {
            key: '10',
            firstName: 'James',
            surname: 'Mandaza',
            role: 'User',
            gender: 'Male',
            phoneNumber: '0789123456',
            nationalId: '23-3456789 G34',
            province: 'Harare Central',
            department: 'Inbound',
        },
    ]);


    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
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
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'National ID',
            dataIndex: 'nationalId',
            key: 'nationalId',
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
            filters: [
                { text: 'Harare Central', value: 'Harare Central' },
                { text: 'Matebeleland', value: 'Matebeleland' },
            ],
            onFilter: (value, record) => record.province === value,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            filters: [
                { text: 'Web Developer', value: 'Web Developer' },
                { text: 'Information Systems', value: 'Information Systems' },
                { text: 'Human Resources HR', value: 'Human Resources HR' },
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
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showModifyModal(record)}>
                        <Edit3 size={18} />
                    </a>
                    <a onClick={() => showDeleteModal(record)}>
                        <Trash2 size={18} color='red' />
                    </a>
                </Space>
            ),
        },
    ];


    const handleSearch = () => {
        const filteredData = data.filter(
            (item) =>
                item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
                item.surname.toLowerCase().includes(searchText.toLowerCase())
        );
        return filteredData;
    };

    const showModifyModal = (record) => {
        setSelectedEmployee(record);
        setIsModifyModalVisible(true);
    };

    const handleModifyCancel = () => {
        setIsModifyModalVisible(false);
    };

    const handleSaveChanges = (values) => {
        const updatedData = data.map((employee) =>
            employee.key === selectedEmployee.key ? { ...employee, ...values } : employee
        );
        setData(updatedData);
        setIsModifyModalVisible(false);
        setSelectedEmployee(null);
    };

    const showDeleteModal = (record) => {
        setSelectedEmployee(record);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
    };

    const handleDeleteConfirm = () => {
        setData((prevData) => prevData.filter((employee) => employee.key !== selectedEmployee.key));
        setIsDeleteModalVisible(false);
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
            <Table columns={columns} dataSource={handleSearch()} />

            <Modal
                title="Modify Employee Details"
                visible={isModifyModalVisible}
                onOk={handleSaveChanges}
                onCancel={handleModifyCancel}
                okText="Save"
                cancelText="Cancel"
            >
                <Form
                    layout="vertical"
                    initialValues={selectedEmployee}
                    onFinish={handleSaveChanges}
                >
                    <Form.Item label="First Name">
                        <AntdInput defaultValue={selectedEmployee?.firstName} />
                    </Form.Item>
                    <Form.Item label="Surname">
                        <AntdInput defaultValue={selectedEmployee?.surname} />
                    </Form.Item>
                    <Form.Item label="Role">
                        <AntdInput defaultValue={selectedEmployee?.role} />
                    </Form.Item>
                    <Form.Item label="Gender">
                        <AntdInput defaultValue={selectedEmployee?.gender} />
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        <AntdInput defaultValue={selectedEmployee?.phoneNumber} />
                    </Form.Item>
                    <Form.Item label="National ID">
                        <AntdInput defaultValue={selectedEmployee?.nationalId} />
                    </Form.Item>
                    <Form.Item label="Province">
                        <AntdInput defaultValue={selectedEmployee?.province} />
                    </Form.Item>
                    <Form.Item label="Department">
                        <AntdInput defaultValue={selectedEmployee?.department} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Delete Confirmation"
                visible={isDeleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Yes, Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete {selectedEmployee?.firstName}&apos;s details?</p>
            </Modal>
        </>
    );
};

export default IsSupportView;
