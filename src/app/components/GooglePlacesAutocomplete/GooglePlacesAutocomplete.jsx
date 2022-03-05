import React from 'react';
import PropTypes from 'prop-types';
import GPA from 'react-google-places-autocomplete';
import colors from '@constants/colors.constants';

const { red, oldBurgundy } = colors;

const autocompleteStyles = {
  control: (provided) => ({
    ...provided,
    border: `1px solid ${red[500]}`,
    borderRadius: '19px',
    '&:hover': {
      borderColor: red[600],
    },
    '&:active': {
      borderColor: red[700],
    },
  }),
  input: (provided) => ({
    ...provided,
    paddingLeft: '12px',
    color: oldBurgundy[500],
  }),
  placeholder: (provided) => ({
    ...provided,
    paddingLeft: '12px',
    fontSize: '12px',
  }),
  option: (provided) => ({
    ...provided,
    color: oldBurgundy[500],
    '&:hover': {
      backgroundColor: red[200],
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: oldBurgundy[500],
    paddingLeft: `12px`,
  }),
};

const GooglePlacesAutocomplete = ({ apiKey, value, onChange }) => {
  return (
    <GPA
      apiKey={apiKey}
      apiOptions={{ language: 'es', region: 'co' }}
      autocompletionRequest={{
        componentRestrictions: {
          country: ['co'],
        },
      }}
      minLengthAutocomplete={3}
      selectProps={{
        value,
        onChange,
        styles: autocompleteStyles,
        placeholder: 'Busca un lugar ej: Zona G',
      }}
    />
  );
};

GooglePlacesAutocomplete.defaultProps = {
  apiKey: '',
  value: '',
  onChange: () => {},
};

GooglePlacesAutocomplete.propTypes = {
  apiKey: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default GooglePlacesAutocomplete;
