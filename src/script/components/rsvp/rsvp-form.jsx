import indexOf from 'lodash/indexOf';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Guest from './guest';
import PlusOne from './plus-one';

export default class extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        allowedPlusOne: PropTypes.bool,
        guests: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.shape({
                    first: PropTypes.string.isRequired,
                    last: PropTypes.string.isRequired,
                }),
                attending: PropTypes.bool,
                plusOne: PropTypes.bool,
            })
        ).isRequired,
    };

    static defaultProps = {
        allowedPlusOne: false,
    };

    get buttonText() {
        const { guests } = this.props;
        const self = (guests.length > 1) ? 'we' : 'I';
        return guests.filter(x => x.attending).length ? 'Submit' : `Sorry, ${self} can't make it`;
    }

    handleGuestUpdate = (i, data) => {
        const guests = this.props.guests[i]
            ? this.props.guests.map((guest, n) => ((i === n) ? { ...guest, ...data } : guest))
            : [...this.props.guests, data];

        return this.props.onChange({ guests });
    };

    removeGuest = i => this.props.onChange({
        guests: this.props.guests.filter((x, n) => (n !== i)),
    });

    handleGuestSelect = i => this.handleGuestUpdate(i, { attending: !this.props.guests[i].attending });

    renderGuests() {
        return (
            <div className="rsvp-rsvpForm-guests">
                {this.props.guests.filter(x => !x.plusOne).map((guest, i) => (
                    <Guest
                        {...guest}
                        key={guest._id}
                        onSelect={() => this.handleGuestSelect(i)}
                    />
                ))}
            </div>
        );
    }

    renderPlusOne() {
        const { guests } = this.props;
        const plusOne = guests.find(x => x.plusOne);
        const plusOneIndex = plusOne ? indexOf(guests, plusOne) : guests.length;

        const handleUpdate = (e) => {
            if (!e.target.value) {
                return this.removeGuest(plusOneIndex);
            }

            return this.handleGuestUpdate(plusOneIndex, {
                attending: true,
                plusOne: true,
                name: {
                    first: e.target.value,
                    last: '',
                },
            });
        };

        return (
            <PlusOne
                disabled={!guests[0].attending}
                {...(plusOne || {})}
                onChange={handleUpdate}
            />
        );
    }

    render() {
        const { onSubmit, allowedPlusOne } = this.props;

        return (
            <form className="rsvp-rsvpForm" onSubmit={onSubmit}>
                <p className="rsvp-rsvpForm-instructions">Please select guests which will be attending:</p>
                {this.renderGuests()}
                {allowedPlusOne && this.renderPlusOne()}
                <button type="submit" className="button rsvp-rsvpForm-submit">{this.buttonText}</button>
            </form>
        );
    }
}
