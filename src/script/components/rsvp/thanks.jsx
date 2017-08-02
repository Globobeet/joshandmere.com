import React from 'react';
import PropTypes from 'prop-types';

const Thanks = ({
    guests,
}) => {
    const message = guests.filter(x => x.attending).length
        ? 'We look forward to seeing you October 8th!'
        : 'We\'re sorry to hear you can\'t make it, but hope to see you soon!';

    return (
        <div className="rsvp-thanks">
            <h1 className="u-leadIn rsvp-panel-title">Thanks!</h1>
            <p className="rsvp-thanks-message">{message}</p>
            <a href="/" className="button rsvp-thanks-button">Return to joshandmere.com</a>
        </div>
    );
};

Thanks.propTypes = {
    guests: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.shape({
                first: PropTypes.string,
                last: PropTypes.string,
            }),
            attending: PropTypes.bool,
        })
    ),
};

Thanks.defaultProps = {
    guests: [],
};

export default Thanks;
