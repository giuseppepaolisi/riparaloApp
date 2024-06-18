import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Title = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} - Riparalo`;
  }, [location, title]);

  return null;
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
