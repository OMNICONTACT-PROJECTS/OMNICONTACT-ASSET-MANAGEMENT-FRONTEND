import { Button, Space, Table, Tooltip, message, Input, Tag } from "antd";
import { Edit3, LucideView } from 'lucide-react';
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { refreshPage } from "../../../../common";
import EditAssetRequestItem from "./EditMyAssetRequest";
import authService from "../../../../services/auth.service";
import assetRequestsServices from "../../../../services/asset-requests.services";
import NewMyAssetRequest from "./NewMyAssetRequest";

export const MyAssetAllocationListLoader = async () => {
    try {
        const response = await assetRequestsServices.getAllByUserId(authService.getUserId());

        if (response?.status !== 200) {
            message.error("No assets found.");
        }

        return {
            assetRequestData: response?.data,
        };
    } catch (e) {
        console.log(e);
        return { assetRequestData: [] };
    }
};

const MyAssetAllocationList = () => {
    const { id } = useParams();
    const { assetRequestData } = useLoaderData();
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const [EditAssetRequestModalState, setEditAssetRequestModalState] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [newAssetModalVisible, setNewAssetModalVisible] = useState(false);

    const handleSearch = () => {
        return assetRequestData.filter((item) => {
            const fullName = `${item.requested_by.first_name} ${item.requested_by.last_name}`.toLowerCase();
            return fullName.includes(searchText.toLowerCase());
        });
    };

    const requestStatusTag = (status) => {
        switch (status) {
            case "PENDING":
                return <Tag color="gold">{status}</Tag>;
            case "APPROVED":
                return <Tag color="blue">{status}</Tag>;
            case "REJECTED":
                return <Tag color="red">{status}</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    const assetRequestTableColumns = [
        {
            title: "Category",
            dataIndex: ["category", "name"],
            key: "category_name",
            render: (name) => <strong>{name}</strong>,
            sorter: (a, b) => a.category.name.localeCompare(b.category.name),
        },
        {
            title: "Requested By",
            dataIndex: "requested_by",
            key: "requested_by",
            render: (requestedBy) =>
                `${requestedBy.first_name} ${requestedBy.last_name}`,
            sorter: (a, b) =>
                a.requested_by.first_name.localeCompare(b.requested_by.first_name),
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
            title: "Approved By",
            dataIndex: "approved_by",
            key: "approved_by",
            render: (approvedBy) =>
                approvedBy ? `${approvedBy.first_name} ${approvedBy.last_name}` : "Not Approved",
        },
        {
            title: "Allocated By",
            dataIndex: "allocated_by",
            key: "allocated_by",
            render: (allocatedBy) =>
                allocatedBy ? `${allocatedBy.first_name} ${allocatedBy.last_name}` : "Not Allocated",
        },
        {
            title: "Allocation Status",
            dataIndex: "allocation_status",
            key: "allocation_status",
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
            title: "Action",
            dataIndex: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Request Details">
                        <Button
                            className="p-1 border-0 text-light"
                            icon={<LucideView size={18} />}
                            onClick={() => navigate("#")}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Request">
                        <Button
                            className="p-1 border-0 text-light"
                            icon={<Edit3 size={18} />}
                            onClick={() => EditAssetRequest(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const EditAssetRequest = (record) => {
        setSelectedRecord(record);
        setEditAssetRequestModalState(true);
    };

    return (
        <>
            <div className="flex justify-between items-center mt-2">
                <div>
                    <Input
                        placeholder="Search by Requested By"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200, marginRight: 8 }}
                    />
                    <Button type="primary" style={{ marginRight: 8 }} onClick={handleSearch}>
                        Search
                    </Button>
                </div>
                <Button
                    type="primary"
                    style={{ marginRight: "25px" }}
                    onClick={() => setNewAssetModalVisible(true)}
                >
                    <Space>
                        New Asset Request
                        <PlusCircleOutlined />
                    </Space>
                </Button>
            </div>

            <Table
                className="table-responsive mt-3"
                dataSource={handleSearch()}
                columns={assetRequestTableColumns}
                rowKey={(record) => record.id}
            />

            <NewMyAssetRequest
                visible={newAssetModalVisible}
                onClose={() => setNewAssetModalVisible(false)}
                onSuccess={() => refreshPage()}
                category={id}
            />

            <EditAssetRequestItem
                visible={EditAssetRequestModalState}
                onClose={() => setEditAssetRequestModalState(false)}
                asset={selectedRecord}
                onSuccess={() => refreshPage()}
            />
        </>
    );
};

export default MyAssetAllocationList;
