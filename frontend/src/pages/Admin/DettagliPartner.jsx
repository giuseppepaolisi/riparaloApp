import partnerData from "../../assets/json/partner.json";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const DettagliPartner = () => {
  const { partnerId } = useParams();
  const partner = partnerData.find((partner) => partner.id === partnerId);

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  if (!partner) {
    return <div>Partner non trovato</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div
          className="col-md-6"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2 className="text-center mb-4">Dettagli Partner</h2>
          <p>
            <strong>Ragione Sociale:</strong> {partner.ragioneSociale}
          </p>
          <p>
            <strong>Rappresentante Legale:</strong>{" "}
            {partner.rappresentanteLegale}
          </p>
          <p>
            <strong>Email:</strong> {partner.email}
          </p>
          <p>
            <strong>Provincia:</strong> {partner.provincia}
          </p>
          <p>
            <strong>Codice Univoco:</strong> {partner["codice univoco"]}
          </p>
          <p>
            <strong>Partita IVA:</strong> {partner.piva}
          </p>
          <p>
            <strong>Telefono:</strong> {partner.telefono}
          </p>
          <p>
            <strong>Città:</strong> {partner.citta}
          </p>
          <p>
            <strong>Indirizzo:</strong> {partner.indirizzo}
          </p>
          <p>
            <strong>CAP:</strong> {partner.cap}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DettagliPartner;
