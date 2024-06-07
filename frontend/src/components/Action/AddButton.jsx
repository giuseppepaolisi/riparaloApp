import PropTypes from "prop-types";

export default function AddButton({ label, link }) {
  return (
    <a
      href={link}
      className="btn btn-primary d-flex align-items-center justify-content-center"
    >
      + {label}
    </a>
  );
}

AddButton.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
