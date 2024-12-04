import { useState } from "react";
import {
    Avatar,
    Button,
    Divider,
    Space,
    Tag,
    Tooltip,
    Table,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, EyeOutlined } from "@ant-design/icons";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import employeeService from "../../../services/employee.service";
import authService from "../../../services/auth.service";

export const UserProfileLoader = async () => {
    const id = authService.getUserId()
    try {
        const response = await employeeService.get(id)
        return {user: response?.data}
    } catch (error) {
        console.log(error)
        return {user: []}
    }
};


const UserProfile = () => {
    const {user} = useLoaderData()
    const [assetRequests, setAssetRequests] = useState([]);
    const [assetAllocations, setAssetAllocations] = useState([]);
    const [allocatedAssets, setAllocatedAssets] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const profilePicture = user?.profile_picture;
    console.log("user: ", user)
    const requestTableColumns = [
        { title: "Category", dataIndex: ["category", "name"], key: "category" },
        { title: "Request Date", dataIndex: "request_date", key: "request_date" },
        { title: "Request Status", dataIndex: "request_status", key: "request_status" },
        { title: "Description", dataIndex: "request_description", key: "request_description" },
        { title: "Allocation Status", dataIndex: "allocation_status", key: "allocation_status" },
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
        { title: "Asset Name", dataIndex: ["asset", "model_name"], key: "asset" },
        { title: "Asset Number", dataIndex: ["asset", "asset_number"], key: "asset_number" },
        { title: "Serial Number", dataIndex: ["asset", "serial_number"], key: "serial_number" },
        { title: "Date Allocated", dataIndex: "date_allocated", key: "date_allocated" },
        { title: "Return Date", dataIndex: "return_date", key: "return_date" },
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

    const allocatedAssetsTableColumns = [
        { title: "Category", dataIndex: ["category", "name"], key: "category" },
        { title: "Asset Name", dataIndex: "model_name", key: "asset" },
        { title: "Asset Number", dataIndex: "asset_number", key: "asset_number" },
        { title: "Serial Number", dataIndex: "serial_number", key: "serial_number" },
        { title: "Date Allocated", dataIndex: "date_allocated", key: "date_allocated" },
        { title: "Location", dataIndex: "location", key: "location" },
        { title: "Purchase Price", dataIndex: "purchase_price", key: "purchase_price" },
        { title: "Current Value", dataIndex: "current_value", key: "current_value" },
        { title: "Acquired Date", dataIndex: "acquired_date", key: "acquired_date" },
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
        <div className="p-6">
            <div className="p-6 mb-6 text-white rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex flex-col items-center justify-center">
                    <Avatar
                        size={150}
                        icon={!profilePicture && <UserOutlined />}
                        src={profilePicture}
                        alt={`${user?.first_name} ${user?.last_name}`}
                        className="shadow-lg"
                    />
                    <h2 className="mt-4 text-2xl font-bold">{user?.first_name} {user?.last_name}</h2>
                    <p className="text-lg text-gray-200">{user?.job_title || "N/A"}</p>
                </div>
            </div>

            <Divider />

            {/* Main Details */}
            <div className="p-6 mb-6 bg-white rounded-md shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Profile Details</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {[
                        { label: "First Name", value: user?.first_name },
                        { label: "Last Name", value: user?.last_name },
                        { label: "Username", value: user?.username },
                        { label: "Role", value: user?.role },
                        { label: "Job Title", value: user?.job_title },
                        { label: "Gender", value: user?.gender },
                        { label: "Location", value: user?.current_location },
                    ].map(({ label, value }, idx) => (
                        <p key={idx} className="flex justify-between py-2 border-b">
                            <span className="font-medium text-gray-600">{label}:</span>
                            <strong className="text-gray-800">{value || "N/A"}</strong>
                        </p>
                    ))}
                </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 mb-6 bg-white rounded-md shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Contact Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {[
                        { label: "Email", value: user?.company_email, icon: <MailOutlined /> },
                        { label: "Phone Number", value: user?.phone_number, icon: <PhoneOutlined /> },
                        { label: "Personal Email", value: user?.personal_email, icon: <MailOutlined /> },
                        
                    ].map(({ label, value, icon }, idx) => (
                        <div key={idx} className="flex items-center py-2 border-b">
                            <div className="mr-4 text-blue-500">{icon}</div>
                            <div>
                                <p className="text-gray-600">{label}:</p>
                                <strong className="text-gray-800">{value || "N/A"}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Account Status */}
            <div className="p-6 bg-white rounded-md shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Account Status</h3>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    {[
                        {
                            label: "Account Status",
                            value: user?.account_status,
                            color: user?.account_status === "ACTIVE" ? "green" : "red",
                        },
                        {
                            label: "Is Active",
                            value: user?.is_active ? "Yes" : "No",
                            color: user?.is_active ? "green" : "red",
                        },
                        {
                            label: "Is Staff",
                            value: user?.is_staff ? "Yes" : "No",
                            color: user?.is_staff ? "green" : "red",
                        },
                    ].map(({ label, value, color }, idx) => (
                        <div key={idx} className="mb-4 sm:mb-0">
                            <p className="text-gray-600">{label}:</p>
                            <Tag color={color} className="text-lg">
                                {value || "N/A"}
                            </Tag>
                        </div>
                    ))}
                </div>
            </div>

            {/* Asset Details Section */}
            <div className="p-6 mt-6 bg-white rounded-md shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">Asset Details</h3>
                <Divider />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <h4 className="mb-4 text-lg font-medium text-gray-700">Asset Request History</h4>
                        <Table
                            columns={requestTableColumns}
                            dataSource={assetRequests}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                    <div>
                        <h4 className="mb-4 text-lg font-medium text-gray-700">Asset Allocation History</h4>
                        <Table
                            columns={allocationTableColumns}
                            dataSource={assetAllocations}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                </div>
                <Divider />
                <h4 className="mb-4 text-lg font-medium text-gray-700">Currently Allocated Assets</h4>
                <Table
                    columns={allocatedAssetsTableColumns}
                    dataSource={allocatedAssets}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </div>

            {/* Back Button */}
            <div className="mt-6">
                <Button type="primary" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;
