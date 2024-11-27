import employeeService from "../../../services/employee.service";
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Divider, Space, Table, Tag, Tooltip } from "antd";

export const EmployeePageLoader = async ({ params }) => {
    const id = params.id;
    try {
        const userResponse = await employeeService.get(id);
        return {
            userData: userResponse?.data,
            assetRequests: [],
            assetAllocations: [],
        };
    } catch (e) {
        console.error(e);
        return {
            userData: {},
            assetRequests: [],
            assetAllocations: [],
        };
    }
};

const EmployeePage = () => {
    const { userData, assetRequests, assetAllocations } = useLoaderData();
    const navigate = useNavigate();

    const requestTableColumns = [
        {
            title: "Category",
            dataIndex: ["category", "name"],
            key: "category",
        },
        {
            title: "Request Date",
            dataIndex: "request_date",
            key: "request_date",
        },
        {
            title: "Request Status",
            dataIndex: "request_status",
            key: "request_status",
        },
        {
            title: "Description",
            dataIndex: "request_description",
            key: "request_description",
        },
        {
            title: "Allocation Status",
            dataIndex: "allocation_status",
            key: "allocation_status",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <Space size="middle">
                    <Tooltip title="View Request">
                        <Button type="primary" icon={<EyeOutlined />} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const allocationTableColumns = [
        {
            title: "Asset Name",
            dataIndex: ["asset", "model_name"],
            key: "asset",
        },
        {
            title: "Asset Number",
            dataIndex: ["asset", "asset_number"],
            key: "asset_number",
        },
        {
            title: "Serial Number",
            dataIndex: ["asset", "serial_number"],
            key: "serial_number",
        },
        {
            title: "Date Allocated",
            dataIndex: "date_allocated",
            key: "date_allocated",
        },
        {
            title: "Return Date",
            dataIndex: "return_date",
            key: "return_date",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <Space size="middle">
                    <Tooltip title="View Allocation">
                        <Button type="primary" icon={<EyeOutlined />} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Link
                to=".."
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}
                className="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2"
            >
                <ArrowLeftOutlined /> Back
            </Link>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Employee Details</h1>
            </div>
            <Divider />

            <div className="bg-white shadow rounded-md p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Main Details</h3>
                        <div className="space-y-3">
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">First Name:</span>
                                <strong className="text-gray-900">{userData?.first_name}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Last Name:</span>
                                <strong className="text-gray-900">{userData?.last_name}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Gender:</span>
                                <strong className="text-gray-900">{userData?.gender}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Role:</span>
                                <strong className="text-gray-900">{userData?.role}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Job Title:</span>
                                <strong className="text-gray-900">{userData?.job_title}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Current Location:</span>
                                <strong className="text-gray-900">{userData?.current_location}</strong>
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Account Details</h3>
                        <div className="space-y-3">
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Username:</span>
                                <strong className="text-gray-900">{userData?.username}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Account Status:</span>
                                <Tag
                                    icon={
                                        userData?.account_status === "ACTIVE" ? (
                                            <CheckCircleOutlined />
                                        ) : (
                                            <CloseCircleOutlined />
                                        )
                                    }
                                    color={userData?.account_status === "ACTIVE" ? "green" : "red"}
                                >
                                    {userData?.account_status}
                                </Tag>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Employee Status:</span>
                                <strong className="text-gray-900">{userData?.employee_status}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Is Superuser:</span>
                                <strong className="text-gray-900">{userData?.is_superuser ? "Yes" : "No"}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Is Staff:</span>
                                <strong className="text-gray-900">{userData?.is_staff ? "Yes" : "No"}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Is Active:</span>
                                <strong className="text-gray-900">{userData?.is_active ? "Yes" : "No"}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <Divider />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>
                        <div className="space-y-3">
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Personal Email:</span>
                                <strong className="text-gray-900">{userData?.personal_email}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Company Email:</span>
                                <strong className="text-gray-900">{userData?.company_email}</strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Phone Number:</span>
                                <strong className="text-gray-900">{userData?.phone_number}</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Other Details</h3>
                        <div className="space-y-3">
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Date Created:</span>
                                <strong className="text-gray-900">
                                    {new Date(userData?.date_created).toLocaleString()}
                                </strong>
                            </p>
                            <p className="flex justify-between border-b py-2">
                                <span className="text-gray-600">Last Updated:</span>
                                <strong className="text-gray-900">
                                    {new Date(userData?.last_updated).toLocaleString()}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4 pr-5">Asset Request History</h3>
                    <Divider />
                    <Table
                        columns={requestTableColumns}
                        dataSource={assetRequests}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                    />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4 mr-5">Asset Allocation History</h3>
                    <Divider />
                    <Table
                        columns={allocationTableColumns}
                        dataSource={assetAllocations}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </div>
        </>
    );
};

export default EmployeePage;
