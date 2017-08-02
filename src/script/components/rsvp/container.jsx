import React, { Component } from 'react';
import classnames from 'classnames';
import CodeForm from './code-form';
import RSVPForm from './rsvp-form';
import Responded from './responded';
import Thanks from './thanks';

const getCodeErrorMessage = (statusCode) => {
    switch (statusCode) {
        case 404: return 'Code not found';
        default: return 'An error occurred, please try again';
    }
};

export default class extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currentView: 'code',
            code: '',
            invite: null,
            error: null,
        };
    }

    handleCodeSubmit = (e) => {
        e.preventDefault();
        if (!this.state.code) { return; }

        this.setState({
            loading: true,
            error: null,
        });

        return fetch(`/rsvp/${this.state.code}`)
            .then(response => (response.ok ? response.json() : Promise.reject(response)))
            .then(invite => this.setState({
                invite,
                loading: false,
                currentView: invite.responded ? 'responded' : 'rsvp',
            }))
            .catch(({ status }) => this.setState({
                loading: false,
                error: getCodeErrorMessage(status),
            }));
    };

    handleRSVPChange = ({ guests }) => this.setState({ invite: { ...this.state.invite, guests } });

    handleRSVPSubmit = (e) => {
        e.preventDefault();

        const { invite } = this.state;
        this.setState({ loading: true });

        return fetch(`/rsvp/${invite.code}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invite),
        })
            .then(response => !response.ok && Promise.reject(response))
            .then(() => this.setState({
                loading: false,
                currentView: 'thanks',
            }))
            .catch(({ status }) => this.setState({
                loading: false,
                error: getCodeErrorMessage(status),
            }));
    };

    renderView() {
        switch (this.state.currentView) {
            case 'code':
                return (
                    <CodeForm
                        code={this.state.code}
                        onChange={e => this.setState({ code: e.target.value.toUpperCase() })}
                        onSubmit={this.handleCodeSubmit}
                    />
                );

            case 'rsvp':
                return (
                    <RSVPForm
                        {...this.state.invite}
                        onChange={this.handleRSVPChange}
                        onSubmit={this.handleRSVPSubmit}
                    />
                );
                
            case 'responded':
                return (<Responded />);

            case 'thanks':
                return (<Thanks guests={this.state.invite.guests} />);

            default: throw new Error(`No view specified for ${this.state.currentView}`);
        }
    }

    render() {
        const panelClasses = classnames(
            'rsvp-panel',
            `rsvp-panel--${this.state.currentView}`,
            {
                'is-loading': this.state.loading,
            }
        );

        return (
            <div className={panelClasses}>
                <div className="rsvp-panel-wrap">
                    {this.renderView()}
                    {this.state.error && <p className="rsvp-panel-error">{this.state.error}</p>}
                </div>
            </div>
        );
    }
}
