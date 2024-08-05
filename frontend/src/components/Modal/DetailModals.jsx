import PropTypes from "prop-types";
import InfoPartnerDetailModal from "../../components/Modal/InfoPartnerDetailModal";
import HistoryDetailModal from "../../components/Modal/HistoryDetailModal";
import InfoDeviceDetailModal from "../../components/Modal/InfoDeviceDetailModal";
import DescriptionDetailModal from "../../components/Modal/DescriptionDetailModal";

const DetailModals = ({
  partnerDetailModal,
  setPartnerDetailModal,
  historyDetailModal,
  setHistoryDetailModal,
  deviceDetailModal,
  setDeviceDetailModal,
  descriptionDetailModal,
  setDescriptionDetailModal,
  technicalDescription,
  showTechnician,
}) => (
  <>
    <InfoPartnerDetailModal
      open={partnerDetailModal.isOpen}
      onClose={() => setPartnerDetailModal({ isOpen: false, partner: null })}
      partner={partnerDetailModal.partner}
    />
    <HistoryDetailModal
      open={historyDetailModal.isOpen}
      onClose={() => setHistoryDetailModal({ isOpen: false, history: null })}
      history={historyDetailModal.history}
      showTechnician={showTechnician}
    />
    <InfoDeviceDetailModal
      open={deviceDetailModal.isOpen}
      onClose={() => setDeviceDetailModal({ isOpen: false, device: null })}
      device={deviceDetailModal.device}
    />
    <DescriptionDetailModal
      open={descriptionDetailModal.isOpen}
      onClose={() =>
        setDescriptionDetailModal({ isOpen: false, description: null })
      }
      description={technicalDescription}
    />
  </>
);

DetailModals.propTypes = {
  partnerDetailModal: PropTypes.shape({
    isOpen: PropTypes.bool,
    partner: PropTypes.object,
  }).isRequired,
  setPartnerDetailModal: PropTypes.func.isRequired,
  historyDetailModal: PropTypes.shape({
    isOpen: PropTypes.bool,
    history: PropTypes.array,
  }).isRequired,
  setHistoryDetailModal: PropTypes.func.isRequired,
  deviceDetailModal: PropTypes.shape({
    isOpen: PropTypes.bool,
    device: PropTypes.object,
  }).isRequired,
  setDeviceDetailModal: PropTypes.func.isRequired,
  descriptionDetailModal: PropTypes.shape({
    isOpen: PropTypes.bool,
  }).isRequired,
  setDescriptionDetailModal: PropTypes.func.isRequired,
  technicalDescription: PropTypes.string.isRequired,
  showTechnician: PropTypes.bool,
};

export default DetailModals;
