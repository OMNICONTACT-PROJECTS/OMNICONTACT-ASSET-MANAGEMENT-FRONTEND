import PropTypes from "prop-types";
import { Modal, Form, Input, Row, Col, Divider } from "antd";

const UserViewAssetDetails = ({ visible, onClose, asset }) => {
  return (
    <Modal
      title={
        <h2 className="text-xl font-bold text-center text-blue-600">
          Asset Details
        </h2>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      bodyStyle={{ padding: "24px 32px", background: "#f0f7ff" }}
    >
      <Form
        layout="vertical"
        className="p-6 space-y-4 bg-white border border-blue-100 rounded-lg shadow-lg"
      >
        {asset ? (
          <>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-semibold text-blue-500">ID</span>}
                >
                  <Input
                    value={asset.id || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-semibold text-blue-500">Model Name</span>}
                >
                  <Input
                    value={asset.model_name || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Asset Number</span>
                  }
                >
                  <Input
                    value={asset.asset_number || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Serial Number</span>
                  }
                >
                  <Input
                    value={asset.serial_number || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Organisation</span>
                  }
                >
                  <Input
                    value={asset?.organisation?.organisation_name || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-semibold text-blue-500">Category</span>}
                >
                  <Input
                    value={asset?.category?.name || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Allocated To</span>
                  }
                >
                  <Input
                    value={`${asset?.allocated_to?.first_name || ""} ${asset?.allocated_to?.last_name || "N/A"
                      }`}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-semibold text-blue-500">Location</span>}
                >
                  <Input
                    value={asset.location || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Purchase Price</span>
                  }
                >
                  <Input
                    value={asset.purchase_price || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Current Value</span>
                  }
                >
                  <Input
                    value={asset.current_value || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Acquired Date</span>
                  }
                >
                  <Input
                    value={
                      asset?.acquired_date
                        ? new Date(asset.acquired_date).toLocaleDateString("en-GB")
                        : "N/A"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span className="font-semibold text-blue-500">Status</span>}
                >
                  <Input
                    value={asset.status || "N/A"}
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Created At</span>
                  }
                >
                  <Input
                    value={
                      asset?.created_at
                        ? new Date(asset.created_at).toLocaleString("en-GB")
                        : "N/A"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Date Updated</span>
                  }
                >
                  <Input
                    value={
                      asset?.date_updated
                        ? new Date(asset.date_updated).toLocaleString("en-GB")
                        : "N/A"
                    }
                    readOnly
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  label={
                    <span className="font-semibold text-blue-500">Description</span>
                  }
                >
                  <Input.TextArea
                    value={asset.description || "N/A"}
                    readOnly
                    rows={4}
                    style={{
                      backgroundColor: "#f0f7ff",
                      borderColor: "#cce4ff",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider style={{ borderColor: "#cce4ff" }} />
          </>
        ) : (
          <p className="text-center text-gray-500">No details available.</p>
        )}
      </Form>
    </Modal>
  );
};

UserViewAssetDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.object,
};

console.clear();
export default UserViewAssetDetails;
