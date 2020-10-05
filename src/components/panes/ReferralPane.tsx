import React from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import { getReferrals} from '../helpers/network'
import '../style/Pane.css'

export default function ReferralPane(props: PaneProps) {

    return (
        <div className="pane">
            <h1>Hvor hørte du om oss?</h1>
            <p>Valgfritt</p>
            <div>
                {getReferrals().map(ref => { return (<button key={ref.ID} onClick={() => {props.widget.nextPane()} }>{ref.name}</button>)})}
            </div>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}