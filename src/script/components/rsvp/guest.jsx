import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Guest = ({
    name,
    attending,
    onSelect,
}) => {
    const guestClasses = classnames('rsvp-rsvpForm-guest', {
        'is-attending': attending,
    });

    return (
        <button type="button" className={guestClasses} onClick={onSelect}>{name.first} {name.last}</button>
    );
};

Guest.propTypes = {
    onSelect: PropTypes.func.isRequired,
    attending: PropTypes.bool,
    name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
    }).isRequired,
};

Guest.defaultProps = {
    attending: false,
};

export default Guest;
