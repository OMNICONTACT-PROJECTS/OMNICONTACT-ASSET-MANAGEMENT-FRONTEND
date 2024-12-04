import PropTypes from "prop-types";
import {
  Modal,
} from "antd";

const ViewAssetRequestDetails = ({ visible, onClose, asset }) => {

  return (
    <Modal
      title="Edit Asset"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="flex justify-center items-center">
        <h3>Request Details</h3>
        <p>{asset?.status}</p>
      </div>
    </Modal>
  );
};

ViewAssetRequestDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default ViewAssetRequestDetails;
