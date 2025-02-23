import { Modal, Form, AutoComplete, Input, message } from "antd";
import { useState } from "react";
import authService from "../../../../services/auth.service";
import assetCategoriesServices from "../../../../services/asset-categories.services";
import { refreshPage } from "../../../../common";
import PropTypes from "prop-types";

const NewAssetCategory = ({ open, close }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const organisation = authService.getUserOrganisationId();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = { ...values, organisation };
      console.log("Request data:", data);
      setLoading(true);
      const response = await assetCategoriesServices.create(data);
      if (response?.status === 201) {
        message.success("Asset category added successfully");
        form.resetFields();
        close();
        refreshPage();
      } else {
        message.error("Failed to add asset category, please try again later");
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      message.error("An error occurred while adding the asset category");
    } finally {
      setLoading(false);
    }
  };

  console.clear();
  return (
    <Modal
      title="Add New Asset Category"
      open={open}
      onCancel={close}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Add"
      cancelText="Cancel"
      width={600}
      maskClosable
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Asset category name"
          name="name"
          rules={[{ required: true, message: "Asset category name is required!" }]}
        >
          <AutoComplete
            size="large"
            placeholder="Select category"
            filterOption={(inputValue, option) =>
              option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            showSearch
            options={[
              { label: "LAPTOP", value: "LAPTOP" },
              { label: "DESKTOP", value: "DESKTOP" },
              { label: "HEADSET", value: "HEADSET" },
              { label: "PRINTER", value: "PRINTER" },
              { label: "KEYBOARD", value: "KEYBOARD" },
              { label: "MOUSE", value: "MOUSE" },
              { label: "MONITOR", value: "MONITOR" },
              { label: "TABLET", value: "TABLET" },
              { label: "SMARTPHONE", value: "SMARTPHONE" },
              { label: "PROJECTOR", value: "PROJECTOR" },
              { label: "WEBCAM", value: "WEBCAM" },
              { label: "SCANNER", value: "SCANNER" },
              { label: "SERVER", value: "SERVER" },
              { label: "ROUTER", value: "ROUTER" },
              { label: "SWITCH", value: "SWITCH" },
              { label: "UPS", value: "UPS" },
              { label: "EXTERNAL HARD DRIVE", value: "EXTERNAL_HARD_DRIVE" },
              { label: "USB FLASH DRIVE", value: "USB_FLASH_DRIVE" },
              { label: "DOCKING STATION", value: "DOCKING_STATION" },
              { label: "MICROPHONE", value: "MICROPHONE" },
              { label: "SPEAKERS", value: "SPEAKERS" },
              { label: "NETWORK CABLE", value: "NETWORK_CABLE" },
              { label: "HEADPHONES", value: "HEADPHONES" },
              { label: "SMART WATCH", value: "SMART_WATCH" },
              { label: "VIRTUAL REALITY HEADSET", value: "VR_HEADSET" },
              { label: "DRONE", value: "DRONE" },
              { label: "CCTV CAMERA", value: "CCTV_CAMERA" },
              { label: "ACCESS CONTROL DEVICE", value: "ACCESS_CONTROL_DEVICE" },
              { label: "3D PRINTER", value: "3D_PRINTER" },
              { label: "E-READER", value: "E_READER" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter a brief description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
NewAssetCategory.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default NewAssetCategory;
