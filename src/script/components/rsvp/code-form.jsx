import React from 'react';
import PropTypes from 'prop-types';

const CodeForm = ({
    code,
    onChange,
    onSubmit,
}) => (
    <form className="rsvp-codeForm" onSubmit={onSubmit}>
        <h3 className="u-leadIn rsvp-panel-title">Enter your RSVP Code</h3>
        <input autoFocus type="text" className="rsvp-codeForm-input" onChange={onChange} value={code} />
        <button type="submit" className="u-hide">Submit</button>
    </form>
);

CodeForm.propTypes = {
    code: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CodeForm;
