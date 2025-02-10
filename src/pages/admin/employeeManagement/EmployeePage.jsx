import employeeService from "../../../services/employee.service";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Space, Table, Tag, Tooltip } from "antd";
import { useLoaderData } from "react-router-dom";
import BackButton from "../../../utils/BackButton";
import assetRequestsServices from "../../../services/asset-requests.services";
import assetAllocationsServices from "../../../services/asset-allocations.services";
import assetsServices from "../../../services/assets.services";
import { useState } from "react";
import ViewAssetRequestDetails from "../assetManagement/AssetRequest/ViewAssetRequestDetails";
import ViewAssetAllocationDetails from "../assetManagement/assetAllocation/ViewAssetAllocationDetails";
import ViewAssetDetails from "../assetManagement/Assets/ViewAssetDetails";

export const EmployeePageLoader = async ({ params }) => {
    const id = params.id;
    try {
        const userResponse = await employeeService.get(id);
        const assetRequestResponse = await assetRequestsServices.getAllByUserId(id)
        const assetAllocationResponse = await assetAllocationsServices.getAllByUserId(id)
        const allocatedAssetResponse = await assetsServices.getAllocatedByUserId(id)
        return {
            userData: userResponse?.data,
            assetRequests: assetRequestResponse?.data,
            assetAllocations: assetAllocationResponse?.data,
            allocatedAssets: allocatedAssetResponse?.data
        };
    } catch (e) {
        console.error(e);
        return {
            userData: {},
            assetRequests: [],
            assetAllocations: [],
            allocatedAssets: []
        };
    }
};

const EmployeePage = () => {
    const { userData, assetRequests, assetAllocations, allocatedAssets } = useLoaderData();
    const [viewAssetRequestModalState, setViewAssetRequestModalState] =
        useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [viewAssetAllocationModalState, setViewAssetAllocationModalState] =
        useState(false);
    const [viewAssetModalState, setViewAssetModalState] =
        useState(false);

    const profilePicture = userData?.profile_picture;
    console.log("profilePicture: " + profilePicture);

    const requestStatusTag = (status) => {
        switch (status) {
            case "PENDING":
                return <Tag color="gold">
                    <strong className="border-0 text-light">
                        {status}
                    </strong>
                </Tag>;
            case "APPROVED":
                return <Tag color="blue">
                    <strong className="border-0 text-light">
                        {status}
                    </strong>
                </Tag>;
            case "REJECTED":
                return <Tag color="red">
                    <strong className="border-0 text-light">
                        {status}
                    </strong>
                </Tag>;
            case "ALLOCATED":
                return <Tag color="green">
                    <strong className="border-0 text-light">
                        {status}
                    </strong>
                </Tag>;
            default:
                return <Tag>
                    <strong className="border-0 text-light">
                        {status}
                    </strong>
                </Tag>;
        }
    };

    const viewAssetRequest = (record) => {
        setSelectedRecord(record);
        setViewAssetRequestModalState(true);
    };

    const viewAssetAllocation = (record) => {
        setSelectedRecord(record);
        setViewAssetAllocationModalState(true);
    };

    const viewAsset = (record) => {
        setSelectedRecord(record);
        setViewAssetModalState(true);
    };

    const requestTableColumns = [
        {
            title: "Category",
            dataIndex: ["category", "name"],
            key: "category_name",
            render: (name) => <strong>{name}</strong>,
            sorter: (a, b) => a.category.name.localeCompare(b.category.name),
        },
        {
            title: "Request Date",
            dataIndex: "request_date",
            key: "request_date",
            sorter: (a, b) => new Date(a.request_date) - new Date(b.request_date),
            render: (date) => new Date(date).toLocaleDateString("en-GB"),
        },
        {
            title: "Request Status",
            dataIndex: "request_status",
            key: "request_status",
            filters: [
                { text: "Pending", value: "PENDING" },
                { text: "Approved", value: "APPROVED" },
                { text: "Rejected", value: "REJECTED" },
            ],
            onFilter: (value, record) => record.request_status === value,
            render: (status) => requestStatusTag(status),
        },
        {
            title: "Date Approved",
            dataIndex: "date_approved",
            key: "date_approved",
            render: (date) =>
                date ? new Date(date).toLocaleDateString("en-GB") : "Not Approved",
        },
        {
            title: "Allocation Status",
            dataIndex: "allocation_status",
            key: "allocation_status",
            render: (status) => requestStatusTag(status),
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <Space size="middle">
                    <Tooltip title="View Request Details">
                        <Button
                            className="p-2 border-0"
                            type="primary"
                            icon={<EyeOutlined />}
                            onClick={() => viewAssetRequest(record)}
                        />
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
                    <Tooltip title="View Details">
                        <Button
                            className="p-2 border-0"
                            type="primary"
                            icon={<EyeOutlined />}
                            onClick={() => viewAssetAllocation(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const allocatedAssetsTableColumns = [
        {
            title: "Category",
            dataIndex: ["category", "name"],
            key: "category",
        },
        {
            title: "Model Name",
            dataIndex: "model_name",
            key: "asset",
        },
        {
            title: "Asset Number",
            dataIndex: "asset_number",
            key: "asset_number",
        },
        {
            title: "Serial Number",
            dataIndex: "serial_number",
            key: "serial_number",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Purchase Price",
            dataIndex: "purchase_price",
            key: "purchase_price",
        },
        {
            title: "Current Value",
            dataIndex: "current_value",
            key: "current_value",
        },
        {
            title: "Acquired Date",
            dataIndex: "acquired_date",
            key: "acquired_date",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record) => (
                <Space size="middle">
                    <Tooltip title="View Asset Details">
                        <Button
                            className="p-2 border-0"
                            type="primary"
                            icon={<EyeOutlined />}
                            onClick={() => viewAsset(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <BackButton />

            <div className="flex justify-between items-center mb-6 mt-1">
                <h1 className="text-2xl font-semibold text-gray-800">Employee Details</h1>
            </div>
            <Divider />

            {/* Employee Details Section */}
            <div className="bg-white shadow rounded-md p-6 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center justify-center bg-gray-50 shadow-sm rounded-lg p-4 w-64 h-65 mx-auto">
                        <Avatar
                            size={130}
                            icon={!profilePicture && <UserOutlined />}
                            src={profilePicture}
                            alt={`${userData?.first_name} ${userData?.last_name}`}
                            className="shadow-md"
                        />
                        <h2 className="text-xl font-medium text-gray-900 text-center mt-4">
                            {userData?.first_name} {userData?.last_name}
                        </h2>
                        <p className="text-gray-500 mt-2">{userData?.job_title}</p>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">Main Details</h3>
                        {[
                            { label: "First Name", value: userData?.first_name },
                            { label: "Last Name", value: userData?.last_name },
                            { label: "Gender", value: userData?.gender },
                            { label: "Role", value: userData?.role },
                            { label: "Job Title", value: userData?.job_title },
                            { label: "Current Location", value: userData?.current_location },
                        ].map(({ label, value }, idx) => (
                            <p key={idx} className="flex justify-between border-b py-2">
                                <span className="text-gray-600">{label}:</span>
                                <strong className="text-gray-900">{value}</strong>
                            </p>
                        ))}
                    </div>
                </div>
                <Divider />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">Account Details</h3>
                        {[
                            { label: "Username", value: userData?.username },
                            {
                                label: "Account Status",
                                value: (
                                    <Tag
                                        icon={
                                            userData?.account_status === "ACTIVE" ? (
                                                <CheckCircleOutlined />
                                            ) : (
                                                <CloseCircleOutlined />
                                            )
                                        }
                                        color={
                                            userData?.account_status === "ACTIVE" ? "green" : "red"
                                        }
                                    >
                                        {userData?.account_status}
                                    </Tag>
                                ),
                            },
                            { label: "Employee Status", value: userData?.employee_status },
                            { label: "Is Staff", value: userData?.is_staff ? "Yes" : "No" },
                            { label: "Is Active", value: userData?.is_active ? "Yes" : "No" },
                        ].map(({ label, value }, idx) => (
                            <p key={idx} className="flex justify-between border-b py-2">
                                <span className="text-gray-600">{label}:</span>
                                <strong className="text-gray-900">{value}</strong>
                            </p>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">Contact Information</h3>
                        {[
                            { label: "Personal Email", value: userData?.personal_email },
                            { label: "Company Email", value: userData?.company_email },
                            { label: "Phone Number", value: userData?.phone_number },
                            {
                                label: "Date Created",
                                value: new Date(userData?.date_created).toLocaleString(),
                            },
                            {
                                label: "Last Updated",
                                value: new Date(userData?.last_updated).toLocaleString(),
                            },
                        ].map(({ label, value }, idx) => (
                            <p key={idx} className="flex justify-between border-b py-2">
                                <span className="text-gray-600">{label}:</span>
                                <strong className="text-gray-900">{value}</strong>
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6 mt-10">
                <h1 className="text-2xl font-semibold text-gray-800">Asset Details</h1>
            </div>
            <Divider />
            {/* Asset History Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4 ml-2">Asset Request History</h3>
                    <Table
                        className='table-responsive'
                        columns={requestTableColumns}
                        dataSource={assetRequests}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                    />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4 ml-2">Asset Allocation History</h3>
                    <Table
                        className='table-responsive'
                        columns={allocationTableColumns}
                        dataSource={assetAllocations}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </div>
            {/* <Divider /> */}
            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4 ml-2">Currently Allocated Assets</h3>
                <Table
                    className='table-responsive'
                    columns={allocatedAssetsTableColumns}
                    dataSource={allocatedAssets}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </div>

            <ViewAssetRequestDetails
                visible={viewAssetRequestModalState}
                onClose={() => setViewAssetRequestModalState(false)}
                asset={selectedRecord}
            />
            <ViewAssetAllocationDetails
                visible={viewAssetAllocationModalState}
                onClose={() => setViewAssetAllocationModalState(false)}
                asset={selectedRecord}
            />
            <ViewAssetDetails
                visible={viewAssetModalState}
                onClose={() => setViewAssetModalState(false)}
                asset={selectedRecord}
            />
        </>
    );
};

export default EmployeePage;
