import { Button, Popconfirm, Space, Table, Tooltip, message, Input, Tag } from "antd";
import { CircleCheckBig, LucideView, SquareCheckBig, Trash2 } from 'lucide-react';
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { refreshPage } from "../../../../common";
import assetsServices from "../../../../services/assets.services";
import authService from "../../../../services/auth.service";
import assetRequestsServices from "../../../../services/asset-requests.services";
import ViewAssetRequestDetails from "./ViewAssetRequestDetails";
import NewAssetAllocation from "./NewAssetAllocation";

export const AssetRequestListLoader = async () => {
    try {
        const response = await assetRequestsServices.getAllByOrganisationId(authService.getUserOrganisationId());

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

const AssetRequestList = () => {
    const { assetRequestData } = useLoaderData();
    const [searchText, setSearchText] = useState("");
    const [viewAssetRequestModalState, setViewAssetRequestModalState] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [allocateAssetModalState, setAllocateAssetModalState] = useState(false);

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
            case "ALLOCATED":
                return <Tag color="green">{status}</Tag>;
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
                            onClick={() => viewAssetRequest(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Approve Request">
                        <Popconfirm
                            title="Approve Request"
                            description="Are you sure you want to approve this request?"
                            onConfirm={() => approveAssetRequest(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                className="p-1 border-0 text-light"
                                icon={<SquareCheckBig size={18} />}
                            />
                        </Popconfirm>
                    </Tooltip>
                    <Tooltip title="Allocate Asset">
                        <Popconfirm
                            title="Allocate Asset"
                            description="Are you sure you want to perform the allocation?"
                            onConfirm={() => allocateAsset(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                className="p-1 border-0 text-light"
                                icon={<CircleCheckBig size={18} />}
                            />
                        </Popconfirm>
                    </Tooltip>
                    <Tooltip title="Delete Request">
                        <Popconfirm
                            title="Delete Request"
                            description="Are you sure you want to delete this request?"
                            onConfirm={() => deleteAssetRequest(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="danger"
                                icon={<Trash2 size={18} color="red" />}
                            />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const deleteAssetRequest = async (record) => {
        try {
            const response = await assetsServices.delete(record.id);
            if (response?.status === 204) {
                message.success("Request deleted successfully.");
                refreshPage();
            } else {
                message.error("Failed to delete request.");
            }
        } catch (error) {
            message.error("Failed to delete request.");
            console.error(error);
        }
    };

    const approveAssetRequest = async (record) => {
        const data = {
            approved_by: authService.getUserId(),
        }
        try {
            const response = await assetRequestsServices.approveRequest(record.id, data);
            if (response?.status === 200) {
                message.success("Request approved successfully.");
                refreshPage();
            } else {
                message.error("Failed to approve request");
            }
        } catch (error) {
            message.error(error?.response.data.message || "Failed to approve request, please try again later");
            console.error(error);
        }
    };

    const viewAssetRequest = (record) => {
        setSelectedRecord(record);
        setViewAssetRequestModalState(true);
    };

    const allocateAsset = (record) => {
        setSelectedRecord(record);
        setAllocateAssetModalState(true);
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
            </div>

            <Table
                className="table-responsive mt-3"
                dataSource={handleSearch()}
                columns={assetRequestTableColumns}
                rowKey={(record) => record.id}
            />

            <ViewAssetRequestDetails
                visible={viewAssetRequestModalState}
                onClose={() => setViewAssetRequestModalState(false)}
                asset={selectedRecord}
                onSuccess={() => refreshPage()}
            />

            <NewAssetAllocation
                visible={allocateAssetModalState}
                onClose={() => setAllocateAssetModalState(false)}
                selectedRecord={selectedRecord}
                onSuccess={() => refreshPage()}
            />
        </>
    );
};

export default AssetRequestList;
