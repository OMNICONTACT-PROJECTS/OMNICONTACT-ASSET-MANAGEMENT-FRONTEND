import { Button, Popconfirm, Space, Table, Tooltip, message, Alert } from "antd";
import { Edit3, LucideView, Trash2 } from 'lucide-react';

import {
    PlusCircleOutlined,
}
    from "@ant-design/icons";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import NewAssetCategory from "./NewAssetCategory";
import authService from "../../../../services/auth.service";
import assetCategoriesServices from "../../../../services/asset-categories.services";
import EditAssetCategory from "./EditAssetCategory";
import { refreshPage } from "../../../../common";

export const assetCategoryLoader = async () => {
    try {
        const response = await assetCategoriesServices.getAllByOrganisationId(authService.getUserOrganisationId());

        if (response?.status !== 200) {
            message.error("No asset categories found.");
        }

        return {
            assetCategoryList: response?.data,
        };
    } catch (e) {
        console.log(e);
        return { assetCategoryList: [] };
    }
};

const AssetCategoryList = () => {
    const { assetCategoryList } = useLoaderData()
    const [EditAssetCategoryModalState, setEditAssetCategoryModalState] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null)

    const navigate = useNavigate();

    const [newAssetCategoryModalState, setNewAssetCategoryModalState] = useState(false);

    const assetCategoryTableColumns = [
        {
            title: "Asset Category ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Asset Category Name",
            dataIndex: "name",
            key: "name",
            render: (dataIndex) => (
                <strong>{dataIndex}</strong>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Organisation",
            dataIndex: ["organisation", "organisation_name"],
            key: "organisation_name",
        },
        {
            title: "Date Created",
            dataIndex: "created_at",
            key: "created_at",
            render: (date) =>
                new Date(date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }),
            sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created),
        },
        {
            title: "Action",
            dataIndex: "",
            key: "",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Asset Items">
                        <Button
                            className="p-1 border-0 text-light"
                            icon={<LucideView size={18} />}
                            onClick={() => {
                                navigate(
                                    `/admin/asset-category/${record.id}/asset-items`
                                );
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Asset Category">
                        <Button
                            className="p-1 border-0 text-light"
                            icon={<Edit3 size={18} />}
                            onClick={() => editAssetCategory(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete Asset Category">
                        <Popconfirm
                            title="Delete Employee"
                            description="Are you sure you want to delete this asset category?"
                            onConfirm={() => deleteAssetCategory(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="danger"
                                icon={<Trash2 size={18} color='red' />}
                            />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const deleteAssetCategory = async (record) => {
        try {
            const response = await assetCategoriesServices.delete(record.id)

            if (response?.status === 204) {
                message.info("Asset category deleted successfully")
                refreshPage()
            } else {
                message.error("Asset category could not be deleted")
            }
        } catch (error) {
            message.error("Asset category could not be deleted")
            console.log(error)
        }
    }

    const editAssetCategory = (record) => {
        setSelectedRecord(record)
        setEditAssetCategoryModalState(true)
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold"></h3>

                <Button
                    type="primary"
                    style={{ marginRight: '25px' }}
                    onClick={() => setNewAssetCategoryModalState(true)}
                >
                    <Space>
                        New asset category
                        <PlusCircleOutlined />
                    </Space>
                </Button>
            </div>

            <Space
                className="mb-3 mt-3"
                direction="vertical"
                style={{
                    width: '100%',
                }}
            >
                <Alert
                    message="Instructions"
                    description="First add the asset category for the assets you want to capture and then select the asset category you just created. Inside that asset category, add all the assets items which falls under that category."
                    type="info"
                    showIcon
                    closable
                />
            </Space>

            <Table className='table-responsive' dataSource={assetCategoryList} columns={assetCategoryTableColumns} />

            <NewAssetCategory open={newAssetCategoryModalState} close={() => setNewAssetCategoryModalState(false)} />
            <EditAssetCategory open={EditAssetCategoryModalState} close={() => setEditAssetCategoryModalState(false)} selectedRecord={selectedRecord} />
        </>
    );
};

export default AssetCategoryList;
