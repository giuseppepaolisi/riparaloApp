import { fetchTecnicoById, updateTecnico } from "../../api/apiTecnico";
import DettagliUtente from "../../components/DettagliUtente";

const DettaglioTecnico = () => {
  return (
    <DettagliUtente
      fetchUserById={fetchTecnicoById}
      updateUser={updateTecnico}
    />
  );
};

export default DettaglioTecnico;
