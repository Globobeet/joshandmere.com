import React from 'react';
import PropTypes from 'prop-types';

const PlusOne = ({
    name,
    disabled,
    onChange,
}) => (
    <input
        type="text"
        className="rsvp-rsvpForm-plusOne"
        placeholder="Along with guest..."
        value={name.first}
        onChange={onChange}
        readOnly={disabled}
    />
);

PlusOne.propTypes = {
    name: PropTypes.shape({
        first: PropTypes.string,
        last: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

PlusOne.defaultProps = {
    disabled: false,
    name: {
        first: '',
        last: '',
    },
};

export default PlusOne;
