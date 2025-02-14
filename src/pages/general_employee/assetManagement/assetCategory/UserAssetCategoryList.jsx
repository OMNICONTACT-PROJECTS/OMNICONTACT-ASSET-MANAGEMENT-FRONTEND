import { Button, Space, Table, Tooltip, message } from "antd";
import { LucideView } from 'lucide-react';
import { useLoaderData, useNavigate } from "react-router-dom";
import authService from "../../../../services/auth.service";
import assetCategoriesServices from "../../../../services/asset-categories.services";

export const UserAssetCategoryLoader = async () => {
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

const UserAssetCategoryList = () => {
    const { assetCategoryList } = useLoaderData()
    const navigate = useNavigate();

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
                                    `/user/asset-category/${record.id}/asset-items`
                                );
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table className='table-responsive' dataSource={assetCategoryList} columns={assetCategoryTableColumns} />
        </>
    );
};

export default UserAssetCategoryList;
