import PropTypes from "prop-types";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
} from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import assetAllocationsServices from "../../../../services/asset-allocations.services";
import authService from "../../../../services/auth.service";
import assetsServices from "../../../../services/assets.services"; // Import assets service to fetch available assets
import employeeService from "../../../../services/employee.service"; // Assuming employee service is available

const { Option } = Select;

const EditAssetAllocation = ({ visible, onClose, asset, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [availableAssets, setAvailableAssets] = useState([]); // State to store available assets for serial number dropdown
  const [employees, setEmployees] = useState([]); // State to store employee list
  const [admins, setAdmins] = useState([]); // State to store admin list

  useEffect(() => {
    // Fetch the available assets, employees, and admins on component mount
    const fetchData = async () => {
      try {
        const assetsResponse = await assetsServices.getAllByOrganisationId(authService.getUserOrganisationId());
        if (assetsResponse?.status === 200) {
          setAvailableAssets(assetsResponse.data);
        } else {
          message.error("Failed to fetch available assets.");
        }

        const employeesResponse = await employeeService.getAllByOrganisationId(authService.getUserOrganisationId());
        if (employeesResponse?.status === 200) {
          setEmployees(employeesResponse.data);
        } else {
          message.error("Failed to fetch employee data.");
        }

        // Fetch admins, assuming there's an API that fetches admins.
        const adminResponse = await employeeService.getAllAdministratorsByOrganisationId(authService.getUserOrganisationId());
        if (adminResponse?.status === 200) {
          setAdmins(adminResponse.data);
        } else {
          message.error("Failed to fetch admins.");
        }
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch data.");
      }
    };

    fetchData();

    if (asset) {
      form.setFieldsValue({
        asset_model: asset.asset.model_name,
        asset_number: asset.asset.asset_number,
        serial_number: asset.asset.serial_number,
        allocated_to: asset.allocated_to.id, // Set the allocated_to as employee ID for Select dropdown
        allocated_by: asset.allocated_by.id, // Set the allocated_by as admin/employee ID for Select dropdown
        date_allocated: asset.date_allocated
          ? moment(asset.date_allocated, "YYYY-MM-DD")
          : null,
        return_date: asset.return_date
          ? moment(asset.return_date, "YYYY-MM-DD")
          : null,
        status: asset.status,
      });
    }
  }, [asset, form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        allocated_to: values.allocated_to, // Pass the employee ID directly
        allocated_by: values.allocated_by, // Pass the admin ID directly
        asset: asset.id,
        asset_request: asset.asset_request.id,
        date_allocated: values.date_allocated
          ? values.date_allocated.format("YYYY-MM-DD")
          : null,
        return_date: values.return_date
          ? values.return_date.format("YYYY-MM-DD")
          : null,
        organisation: authService.getUserOrganisationId(),
      };

      const response = await assetAllocationsServices.update(asset.id, payload);

      if (response?.status === 200) {
        message.success("Asset allocation updated successfully!");
        onSuccess();
        onClose();
      } else {
        message.error("Failed to update asset allocation, please try again.");
      }
    } catch (error) {
      message.error("An error occurred while updating the asset allocation.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle changes in serial number selection and update model & number
  const handleSerialNumberChange = (serialNumber) => {
    const selectedAsset = availableAssets.find(
      (asset) => asset.serial_number === serialNumber
    );
    if (selectedAsset) {
      form.setFieldsValue({
        asset_model: selectedAsset.model_name,
        asset_number: selectedAsset.asset_number,
      });
    }
  };

  return (
    <Modal
      title="Edit Asset Allocation"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Asset Model"
          name="asset_model"
          rules={[{ required: true, message: "Please enter the asset model!" }]}>
          <Input placeholder="e.g., Lenovo ThinkPad" disabled />
        </Form.Item>

        <Form.Item
          label="Asset Number"
          name="asset_number"
          rules={[{ required: true, message: "Please enter the asset number!" }]}>
          <Input placeholder="e.g., A12345" disabled />
        </Form.Item>

        <Form.Item
          label="Serial Number"
          name="serial_number"
          rules={[{ required: true, message: "Please select the serial number!" }]}>
          <Select
            placeholder="Search serial number"
            onChange={handleSerialNumberChange}
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }>
            {availableAssets.map((asset) => (
              <Option key={asset.id} value={asset.serial_number}>
                {asset.serial_number}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Allocated To"
          name="allocated_to"
          rules={[{ required: true, message: "Please select the person allocated to!" }]}>
          <Select
            placeholder="Select employee"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }>
            {employees.map((employee) => (
              <Option key={employee.id} value={employee.id}>
                {`${employee.first_name} ${employee.last_name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Allocated By"
          name="allocated_by"
          rules={[{ required: true, message: "Please select the person who allocated!" }]}>
          <Select
            placeholder="Select admin"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }>
            {admins.map((admin) => (
              <Option key={admin.id} value={admin.id}>
                {`${admin.first_name} ${admin.last_name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Date Allocated"
          name="date_allocated"
          rules={[{ required: true, message: "Please select the date allocated!" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Return Date"
          name="return_date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the status!" }]}>
          <Select placeholder="Select allocation status">
            <Option value="ALLOCATED">Allocated</Option>
            <Option value="RETURNED">Returned</Option>
            <Option value="PENDING">Pending</Option>
            <Option value="EXTENDED">Extended</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Update Allocation
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditAssetAllocation.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default EditAssetAllocation;
