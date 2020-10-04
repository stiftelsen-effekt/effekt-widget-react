import React from 'react';
import { PaneProps } from './PaneProps';
import * as EmailValidator from 'email-validator';
import './Pane.css'

export default function MethodPane(props: PaneProps) {

    const widgetState = props.widget.state

    function handleName(e: React.FormEvent<HTMLInputElement>) {
        widgetState.setDonorName(e.currentTarget.value)
    }

    function handleEmail(e: React.FormEvent<HTMLInputElement>) {
        widgetState.setEmail(e.currentTarget.value)
    }

    function handleTax(e: React.FormEvent<HTMLInputElement>) {
        widgetState.setTaxDeduction(e.currentTarget.checked)
    }

    function handlePrivacyPolicy(e: React.FormEvent<HTMLInputElement>) {
        widgetState.setPrivacyPolicy(e.currentTarget.checked)
    }

    function handleNewsletter(e: React.FormEvent<HTMLInputElement>) {
        widgetState.setNewsletter(e.currentTarget.checked)
    }

    function invalidEmailWarning() {
        if (!EmailValidator.validate(widgetState.email)) {
            return (
                <div>Ugyldig email inntastet</div>
            )
        }
    }

    return (
        <div className="pane">
            <h1>Om deg</h1>
            <div className="pane">
                <input type="text" inputMode="text" placeholder="Navn" maxLength={100} onChange={handleName} value={widgetState.donorName}></input>
                <input type="email" inputMode="email" placeholder="Email" maxLength={100} onChange={handleEmail} value={widgetState.email}></input>
                {invalidEmailWarning()}
                <div><input type="checkbox" id="check-tax-deduction" onChange={handleTax} checked={widgetState.taxDeduction}></input>Jeg ønsker skattefradrag</div>
                <div><input type="checkbox" id="check-privacy-policy" onChange={handlePrivacyPolicy} checked={widgetState.privacyPolicy}></input>Jeg godtar <a href="https://gieffektivt.no/samarbeid-drift#personvern">personvernerklæringen *</a></div>
                <div><input type="checkbox" id="check-newsletter" onChange={handleNewsletter} checked={widgetState.newsletter}></input>Jeg ønsker å melde meg på nyhetsbrevet</div>
            </div>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}