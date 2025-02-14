import { Button, Space, Table, Tooltip, message, Input, Tag } from "antd";
import { LucideView } from 'lucide-react';
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import assetsServices from "../../../../services/assets.services";
import authService from "../../../../services/auth.service";
import ViewAssetDetails from "./UserViewAssetDetails";

export const UserAssetLoader = async () => {
    try {
        const response = await assetsServices.getAllByOrganisationId(authService.getUserOrganisationId());

        if (response?.status !== 200) {
            message.error("No assets found.");
        }

        return {
            assetData: response?.data,
        };
    } catch (e) {
        console.log(e);
        return { assetData: [] };
    }
};

const UserAssetList = () => {
    const { assetData } = useLoaderData();
    const [searchText, setSearchText] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [viewAssetModalState, setViewAssetModalState] =
        useState(false);

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
        return assetData.filter((item) =>
            item.asset_number.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const getStatusTag = (status) => {
        switch (status) {
            case "AVAILABLE":
                return <Tag color="blue">
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
            case "UNDER_MAINTENANCE":
            case "RESERVED":
            case "TRANSFERRED":
                return <Tag color="gold">
                    <strong className="border-0 text-light">
                        {status}
                    </strong>
                </Tag>;
            default:
                return <Tag color="red">
                    <strong className="border-0 text-light">
                        {status}
                    </strong>
                </Tag>;
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
                            onClick={() => viewAsset(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const viewAsset = (record) => {
        setSelectedRecord(record);
        setViewAssetModalState(true);
    };

    return (
        <>
            <div className="flex items-center justify-between mt-2">
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
            </div>

            <Table
                className="mt-3 table-responsive"
                dataSource={handleSearch()}
                columns={assetItemsTableColumns}
                rowKey={(record) => record.id}
            />
            <ViewAssetDetails
                visible={viewAssetModalState}
                onClose={() => setViewAssetModalState(false)}
                asset={selectedRecord}
            />
        </>
    );
};

export default UserAssetList;
