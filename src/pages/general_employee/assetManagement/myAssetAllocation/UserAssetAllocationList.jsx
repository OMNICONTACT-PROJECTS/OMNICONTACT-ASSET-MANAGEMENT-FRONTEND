import { Button, Space, Table, Tooltip, message, Input, Tag } from "antd";
import { LucideView } from 'lucide-react';
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import authService from "../../../../services/auth.service";
import assetAllocationsServices from "../../../../services/asset-allocations.services";
import ViewUserAssetAllocationDetails from "./ViewMyAssetAllocationDetails";

export const UserAssetAllocationListLoader = async () => {
    try {
        const response = await assetAllocationsServices.getAllByUserId(authService.getUserId());

        if (response?.status !== 200) {
            message.error("No allocations found.");
        }

        return {
            allocationData: response?.data,
        };
    } catch (e) {
        console.log(e);
        return { allocationData: [] };
    }
};

const UserAssetAllocationList = () => {
    const { allocationData } = useLoaderData();
    const [searchText, setSearchText] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [viewMyAssetAllocationModalState, setViewMyAssetAllocationModalState] = useState(false);

    const handleSearch = () => {
        return allocationData.filter((item) => {
            const fullName = `${item.allocated_to.first_name} ${item.allocated_to.last_name}`.toLowerCase();
            return fullName.includes(searchText.toLowerCase());
        });
    };

    const allocationTableColumns = [
        {
            title: "Asset Model",
            dataIndex: ["asset", "model_name"],
            key: "asset_model",
            render: (model) => <strong>{model}</strong>,
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
            title: "Allocated To",
            dataIndex: "allocated_to",
            key: "allocated_to",
            render: (allocatedTo) => `${allocatedTo.first_name} ${allocatedTo.last_name}`,
        },
        {
            title: "Allocated By",
            dataIndex: "allocated_by",
            key: "allocated_by",
            render: (allocatedBy) => `${allocatedBy.first_name} ${allocatedBy.last_name}`,
        },
        {
            title: "Date Allocated",
            dataIndex: "date_allocated",
            key: "date_allocated",
            render: (date) => new Date(date).toLocaleDateString("en-GB"),
        },
        {
            title: "Return Date",
            dataIndex: "return_date",
            key: "return_date",
            render: (date) => new Date(date).toLocaleDateString("en-GB"),
        },
        {
            title: "Status",
            dataIndex: "",
            key: "status",
            render: () => (
                <Tag color="green" className="p-1">
                    <strong
                        className="p-1 border-0 text-light"
                    >
                        ALLOCATED
                    </strong>
                </Tag>
            ),
        },
        {
            title: "Action",
            dataIndex: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <Button
                            className="p-1 border-0 text-light"
                            icon={<LucideView size={18} />}
                            onClick={() => viewMyAssetAllocation(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const viewMyAssetAllocation = (record) => {
        setSelectedRecord(record);
        setViewMyAssetAllocationModalState(true);
    };

    return (
        <>
            <div className="flex items-center justify-between mt-2">
                <div>
                    <Input
                        placeholder="Search by Allocated To"
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
                className="mt-3 table-responsive"
                dataSource={handleSearch()}
                columns={allocationTableColumns}
                rowKey={(record) => record.id}
            />

            <ViewUserAssetAllocationDetails
                visible={viewMyAssetAllocationModalState}
                onClose={() => setViewMyAssetAllocationModalState(false)}
                asset={selectedRecord}
            />
        </>
    );
};

console.clear();
export default UserAssetAllocationList;
