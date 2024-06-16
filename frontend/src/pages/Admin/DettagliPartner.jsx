import { fetchPartnerById, updatePartner } from "../../api/apiPartner";
import DettagliUtente from "../../components/DettagliUtente";

const DettagliPartner = () => {
  return (
    <DettagliUtente
      fetchUserById={fetchPartnerById}
      updateUser={updatePartner}
    />
  );
};

export default DettagliPartner;
