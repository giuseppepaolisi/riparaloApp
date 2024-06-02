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

  const partnerDetails = [
    { label: "Ragione Sociale", value: partner.ragioneSociale },
    { label: "Rappresentante Legale", value: partner.rappresentanteLegale },
    { label: "Email", value: partner.email },
    { label: "Provincia", value: partner.provincia },
    { label: "Codice Univoco", value: partner["codice univoco"] },
    { label: "Partita IVA", value: partner.piva },
    { label: "Telefono", value: partner.telefono },
    { label: "Città", value: partner.citta },
    { label: "Indirizzo", value: partner.indirizzo },
    { label: "CAP", value: partner.cap },
  ];

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
          {partnerDetails.map((detail, index) => (
            <p key={index}>
              <strong>{detail.label}:</strong> {detail.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DettagliPartner;
