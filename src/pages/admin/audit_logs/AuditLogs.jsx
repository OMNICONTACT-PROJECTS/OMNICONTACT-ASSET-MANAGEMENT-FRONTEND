import { useState, useEffect } from 'react';
import { Select, Table, Tag, DatePicker, Input, Segmented, message } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import auditLogsService from '../../../services/audit-logs.service';
import authService from '../../../services/auth.service';

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;
const { Search } = Input;

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('my');
    const [currentUserId] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10
    });


    useEffect(() => {
        console.clear();
        const fetchLogs = async () => {
            try {
                const res = await auditLogsService.getAllByOrganisationId(authService.getUserOrganisationId());
                if (res?.status === 200) {
                    message.success("Audit Logs fetched successfully");
                }
                setLogs(res?.data);

                const uniqueUsers = Array.from(new Set(res?.data.map(log => log.user.id)))
                    .map(id => {
                        const user = res?.data.find(log => log.user.id === id)?.user;
                        return {
                            value: id,
                            label: `${user?.first_name} ${user?.last_name}`
                        };
                    });
                setUsers(uniqueUsers);
            } catch (error) {
                console.error('Error fetching audit logs:', error);
                message.error("Failed to fetch audit logs, please try again later");
            }
        };
        fetchLogs();
    }, []);

    const filteredData = logs.filter(log => {
        const matchesDate = dateRange
            ? dayjs(log.created_at).isBetween(dateRange[0], dateRange[1], null, '[]')
            : true;
        const matchesSearch = log.action.toLowerCase().includes(searchText.toLowerCase());
        const matchesUser = selectedUser ? log.user.id === Number(selectedUser) : true;
        const matchesFilter = filterType === 'my'
            ? log.user.id === currentUserId
            : log.user.id !== currentUserId;

        return matchesDate && matchesSearch && matchesUser && matchesFilter;
    });

    const columns = [
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '40%',
        },
        {
            title: 'User',
            key: 'user',
            render: (_, record) => (
                <div className="flex items-center">
                    <span className="font-medium">
                        {record.user.first_name} {record.user.last_name}
                    </span>
                    <Tag color="blue" className="ml-2">
                        @{record.user.username}
                    </Tag>
                </div>
            ),
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            render: (operation) => (
                <Tag color={operation === 'Create' ? 'green' : 'orange'}>
                    {operation}
                </Tag>
            ),
        },
        {
            title: 'Date & Time',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => dayjs(date).format('DD MMM YYYY, hh:mm A'),
        },
    ];
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Audit Logs</h1>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="col-span-1">
                            <Segmented
                                options={[
                                    { label: 'My Audit Logs', value: 'my' },
                                    { label: 'Other Users Logs', value: 'others' },
                                ]}
                                value={filterType}
                                onChange={(value) => {
                                    setFilterType(value);
                                    if (value === 'my') setSelectedUser(null);
                                }}
                                block
                                className="h-10"
                                style={{ fontWeight: "600" }}
                            />
                        </div>

                        <Select
                            placeholder="Select User"
                            options={users}
                            onChange={setSelectedUser}
                            allowClear
                            showSearch
                            disabled={filterType === 'my'}
                            className="w-full h-10"
                        />

                        <RangePicker
                            showTime
                            onChange={(dates) => setDateRange(dates)}
                            className="w-full h-10"
                        />

                        <Search
                            placeholder="Search actions..."
                            allowClear
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full"
                            size="large"
                            style={{
                                height: 15,
                            }}
                        />
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        pagination={{
                            current: pagination.currentPage,
                            pageSize: pagination.pageSize,
                            pageSizeOptions: ['10', '50', '100', '500'],
                            showSizeChanger: true,
                            onChange: (page, pageSize) => {
                                setPagination({
                                    currentPage: page,
                                    pageSize: pageSize
                                });
                            },
                        }}
                        scroll={{ x: true }}
                        bordered
                    />
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
