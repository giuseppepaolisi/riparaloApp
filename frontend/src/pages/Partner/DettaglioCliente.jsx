import { fetchClienteById, updateCliente } from "../../api/apiPartner";
import DettagliUtente from "../../components/DettagliUtente";

const DettaglioCliente = () => {
  return (
    <DettagliUtente
      fetchUserById={fetchClienteById}
      updateUser={updateCliente}
    />
  );
};

export default DettaglioCliente;
