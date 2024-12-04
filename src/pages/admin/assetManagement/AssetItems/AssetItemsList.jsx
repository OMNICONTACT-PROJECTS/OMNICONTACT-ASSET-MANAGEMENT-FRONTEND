import { Button, Popconfirm, Space, Table, Tooltip, message, Input, Tag } from "antd";
import { Edit3, LucideView, Trash2 } from 'lucide-react';
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { refreshPage } from "../../../../common";
import assetsServices from "../../../../services/assets.services";
import NewAssetItem from "./NewAssetItem";
import EditAssetItem from "./EditAssetItems";
import BackButton from "../../../../utils/BackButton";

export const AssetItemsLoader = async ({ params }) => {
    try {
        const category_id = params?.id
        const response = await assetsServices.getAllByCategoryId(category_id);

        if (response?.status !== 200) {
            message.error("No asset items found.");
        }

        return {
            assetItemsList: response?.data,
        };
    } catch (e) {
        console.log(e);
        return { assetItemsList: [] };
    }
};

const AssetItemsList = () => {
    const { id } = useParams();
    const { assetItemsList } = useLoaderData();
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const [EditAssetModalState, setEditAssetModalState] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null)

    const [newAssetModalVisible, setNewAssetModalVisible] = useState(false);
    const statusFilters = [
        "AVAILABLE",
        "ALLOCATED",
        "UNDER_MAINTENANCE",
        "RESERVED",
        "LOST",
        "DISCARDED",
        "TRANSFERRED",
        "OBSOLETE",
    ].map((status) => ({ text: status, value: status }));

    const handleSearch = () => {
        return assetItemsList.filter((item) =>
            item.asset_number.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const getStatusTag = (status) => {
        switch (status) {
            case "AVAILABLE":
                return <Tag color="blue">{status}</Tag>;
            case "ALLOCATED":
                return <Tag color="green">{status}</Tag>;
            case "UNDER_MAINTENANCE":
            case "RESERVED":
            case "TRANSFERRED":
                return <Tag color="gold">{status}</Tag>;
            default:
                return <Tag color="red">{status}</Tag>;
        }
    };


    const assetItemsTableColumns = [
        {
            title: "Category",
            dataIndex: ["category", "name"],
            key: "category_name",
            render: (dataIndex) => (
                <strong>{dataIndex}</strong>),
            sorter: (a, b) => a.category.name.localeCompare(b.category.name),
        },
        {
            title: "Model Name",
            dataIndex: "model_name",
            key: "model_name",
            sorter: (a, b) => a.model_name.localeCompare(b.model_name),
        },
        {
            title: "Serial Number",
            dataIndex: "serial_number",
            key: "serial_number",
            sorter: (a, b) => a.serial_number.localeCompare(b.serial_number),
        },
        {
            title: "Asset Number",
            dataIndex: "asset_number",
            key: "asset_number",
            render: (dataIndex) => (
                <strong>{dataIndex}</strong>),
            sorter: (a, b) => a.asset_number.localeCompare(b.asset_number),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: statusFilters,
            onFilter: (value, record) => record.status === value,
            render: (status) => getStatusTag(status),
        },
        {
            title: "Purchase Price",
            dataIndex: "purchase_price",
            key: "purchase_price",
            render: (price) => `$${parseFloat(price).toFixed(2)}`,
            sorter: (a, b) => a.purchase_price - b.purchase_price,
        },
        {
            title: "Current Value",
            dataIndex: "current_value",
            key: "current_value",
            render: (value) => `$${parseFloat(value).toFixed(2)}`,
            sorter: (a, b) => a.current_value - b.current_value,
        },
        {
            title: "Acquired Date",
            dataIndex: "acquired_date",
            key: "acquired_date",
            sorter: (a, b) => new Date(a.acquired_date) - new Date(b.acquired_date),
            render: (date) => new Date(date).toLocaleDateString("en-GB"),
        },
        {
            title: "Action",
            dataIndex: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Asset Details">
                        <Button
                            className="p-1 border-0 text-light"
                            icon={<LucideView size={18} />}
                            onClick={() => navigate("#")}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Asset">
                        <Button
                            className="p-1 border-0 text-light"
                            icon={<Edit3 size={18} />}
                            onClick={() => editAsset(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete Asset">
                        <Popconfirm
                            title="Delete Asset"
                            description="Are you sure you want to delete this asset?"
                            onConfirm={() => deleteAsset(record)}
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

    const deleteAsset = async (record) => {
        try {
            const response = await assetsServices.delete(record.id);
            if (response?.status === 204) {
                message.success("Asset deleted successfully.");
                refreshPage();
            } else {
                message.error("Failed to delete asset.");
            }
        } catch (error) {
            message.error("Failed to delete asset.");
            console.error(error);
        }
    };

    const editAsset = (record) => {
        setSelectedRecord(record)
        setEditAssetModalState(true)
    };

    return (
        <>
            <BackButton />
            <div className="flex justify-between items-center mt-2">
                <div>
                    <Input
                        placeholder="Search by asset number"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200, marginRight: 8 }}
                    />
                    <Button onClick={handleSearch()} type="primary" style={{ marginRight: 8 }}>
                        Search
                    </Button>
                </div>
                <Button
                    type="primary"
                    style={{ marginRight: "25px" }}
                    onClick={() => setNewAssetModalVisible(true)}
                >
                    <Space>
                        New Asset
                        <PlusCircleOutlined />
                    </Space>
                </Button>
            </div>

            <Table
                className="table-responsive mt-3"
                dataSource={handleSearch()}
                columns={assetItemsTableColumns}
                rowKey={(record) => record.id}
            />

            <NewAssetItem
                visible={newAssetModalVisible}
                onClose={() => setNewAssetModalVisible(false)}
                onSuccess={() => refreshPage()}
                category={id}
            />

            <EditAssetItem
                visible={EditAssetModalState}
                onClose={() => setEditAssetModalState(false)}
                asset={selectedRecord}
                onSuccess={() => refreshPage()}
            />
        </>
    );
};

export default AssetItemsList;
