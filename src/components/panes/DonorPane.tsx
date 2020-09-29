import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function MethodPane(props: PaneProps) {

    return (
        <div className="pane">
            <h1>Om deg</h1>
            <div className="pane">
                <input type="text" placeholder="Navn" maxLength={100}></input>
                <input type="text" placeholder="Email" maxLength={100}></input>
                <div><input type="checkbox" id="check-tax-deduction"></input>Jeg ønsker skattefradrag</div>
                <div><input type="checkbox" id="check-privacy-policy"></input>Jeg godtar <a href="https://gieffektivt.no/samarbeid-drift#personvern">personvernerklæringen *</a></div>
                <div><input type="checkbox" id="check-newsletter"></input>Jeg ønsker å melde meg på nyhetsbrevet</div>
            </div>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}