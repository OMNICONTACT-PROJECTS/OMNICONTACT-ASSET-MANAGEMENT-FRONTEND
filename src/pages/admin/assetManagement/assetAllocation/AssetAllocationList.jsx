import { Button, Space, Table, Tooltip, message, Input } from "antd";
import { Edit3, LucideView } from 'lucide-react';
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { refreshPage } from "../../../../common";
import authService from "../../../../services/auth.service";
import assetAllocationsServices from "../../../../services/asset-allocations.services";
import EditAssetAllocation from "./EditAssetAllocation";
import NewAssetAllocation from "../assetRequest/NewAssetAllocation";
import ViewAssetAllocationDetails from "./ViewAssetAllocationDetails";

export const AssetAllocationListLoader = async () => {
    try {
        const response = await assetAllocationsServices.getAllByOrganisationId(authService.getUserOrganisationId());

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

const AssetAllocationList = () => {
    const { allocationData } = useLoaderData();
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [newAllocationModalVisible, setNewAllocationModalVisible] = useState(false);
    const [viewAssetAllocationModalState, setViewAssetAllocationModalState] =
    useState(false);

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
                <strong
                    className="p-1 border-0 text-light"
                >
                    Allocated
                </strong>
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
                            onClick={() => viewAssetAllocation(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Allocation">
                        <Button
                            className="p-1 border-0 text-light"
                            icon={<Edit3 size={18} />}
                            onClick={() => editAllocation(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];
    
    
    const viewAssetAllocation = (record) => {
        setSelectedRecord(record);
        setViewAssetAllocationModalState(true);
      };

    const editAllocation = (record) => {
        setSelectedRecord(record);
        setEditModalVisible(true);
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
            <ViewAssetAllocationDetails
            visible={viewAssetAllocationModalState}
            onClose={() => setViewAssetAllocationModalState(false)}
            asset={selectedRecord}
            onSuccess={() => refreshPage()}
            />

            <NewAssetAllocation
                visible={newAllocationModalVisible}
                onClose={() => setNewAllocationModalVisible(false)}
                onSuccess={() => refreshPage()}
            />

            <EditAssetAllocation
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                asset={selectedRecord}
                onSuccess={() => refreshPage()}
            />
        </>
    );
};

export default AssetAllocationList;
