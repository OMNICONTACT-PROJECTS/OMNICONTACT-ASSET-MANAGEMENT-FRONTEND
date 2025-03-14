import {
  Modal,
  Form,
  Select,
  DatePicker,
  Button,
  message,
} from "antd";
import { useState, useEffect } from "react";
import authService from "../../../../services/auth.service";
import PropTypes from "prop-types";
import assetAllocationsServices from "../../../../services/asset-allocations.services";
import assetsServices from "../../../../services/assets.services";
import assetCategoriesServices from "../../../../services/asset-categories.services";

const { Option } = Select;

const NewAssetAllocation = ({ visible, onClose, onSuccess, selectedRecord }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    console.clear();
    const fetchData = async () => {
      try {
        const response = await assetsServices.getAllByOrganisationId(
          authService.getUserOrganisationId()
        );
        const categoryResponse = await assetCategoriesServices.getAllByOrganisationId(
          authService.getUserOrganisationId()
        );

        if (response?.status === 200 && categoryResponse?.status === 200) {
          setAssets(response?.data);
          setCategories(categoryResponse?.data);
        }
      } catch (error) {
        message.error("Failed to fetch data.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    // Filter assets based on selected category
    const matchingAssets = assets.filter(
      (asset) => asset.category.id === categoryId && asset.status === "AVAILABLE"
    );
    setFilteredAssets(matchingAssets);
    form.setFieldsValue({ asset: null });
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        asset_request: selectedRecord?.id,
        allocated_to: selectedRecord?.requested_by?.id,
        date_allocated: values.date_allocated.format("YYYY-MM-DD"),
        return_date: values.return_date.format("YYYY-MM-DD"),
        asset: values.asset,
        allocated_by: authService.getUserId(),
      };

      const response = await assetAllocationsServices.create(payload);

      if (response?.status === 201) {
        message.success("Asset allocated successfully!");
        onSuccess();
        form.resetFields();
        onClose();
      } else {
        message.error("Failed to allocate asset, please try again.");
      }
    } catch (error) {
      message.error(error?.response.data.message || "An error occurred while allocating the asset.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Allocate New Asset"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Asset Category"
          name="asset_category"
          rules={[{ required: true, message: "Please select the asset category!" }]}
        >
          <Select
            placeholder="Select an asset category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Asset"
          name="asset"
          rules={[{ required: true, message: "Please select the asset to allocate!" }]}
        >
          <Select placeholder="Select an asset to allocate" disabled={!filteredAssets.length}>
            {filteredAssets.map((asset) => (
              <Option key={asset.id} value={asset.id}>
                {asset.model_name} (SN: {asset.serial_number})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Date Allocated"
          name="date_allocated"
          rules={[{ required: true, message: "Please select the date allocated!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Return Date"
          name="return_date"
          rules={[{ required: true, message: "Please select return date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Allocate Asset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewAssetAllocation.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  selectedRecord: PropTypes.shape({
    id: PropTypes.number.isRequired,
    requested_by: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default NewAssetAllocation;
