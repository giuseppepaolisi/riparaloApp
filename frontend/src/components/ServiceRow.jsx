import PropTypes from "prop-types";

const ServiceRow = ({
  service,
  index,
  handleServiceChange,
  handleServiceToggle,
  priceValidity,
}) => (
  <div key={service.id} className="row mb-2 align-items-center">
    <div className="col-md-1">
      <input
        type="checkbox"
        className="form-check-input"
        checked={service.active}
        onChange={() => handleServiceToggle(index)}
      />
    </div>
    <div className="col-md-5">
      <input
        type="text"
        className="form-control"
        name="name"
        value={service.name}
        onChange={(e) => handleServiceChange(index, e)}
        disabled={!service.active}
        style={{ maxWidth: "300px" }}
      />
    </div>
    <div className="col-md-5">
      <input
        type="text"
        className={`form-control ${
          priceValidity[index] === false ? "is-invalid" : ""
        }`}
        name="price"
        value={service.price}
        onChange={(e) => handleServiceChange(index, e)}
        disabled={!service.active}
        style={{ maxWidth: "300px" }}
      />
      {priceValidity[index] === false && (
        <div className="invalid-feedback">Prezzo non valido</div>
      )}
    </div>
  </div>
);

ServiceRow.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleServiceChange: PropTypes.func.isRequired,
  handleServiceToggle: PropTypes.func.isRequired,
  priceValidity: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default ServiceRow;
