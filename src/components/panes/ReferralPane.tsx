import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function ReferralPane(props: PaneProps) {

    const widgetState = props.widget.state

    const pretendDatabase = [
        {ID: 1, name: "Anbefaling av en bekjent"},
        {ID: 2, name: "Twitter"},
        {ID: 3, name: "Facebook"}
    ]

    function handlePrev() {
        if (widgetState.recommendedShare) {
            widgetState.setPaneNumber(2)
        }
        else {
            widgetState.setPaneNumber(3)
        }
    }

    return (
        <div className="pane">
            <h1>Hvor hørte du om oss?</h1>
            <p>Valgfritt</p>
            <div className="pane">
                {pretendDatabase.map(ref => { return (<button key={ref.ID} onClick={() => {props.widget.nextPane()} }>{ref.name}</button>)})}
            </div>
            <div>
                <button onClick={handlePrev}>Tilbake</button>
                {props.widget.nextButton()}
            </div>
        </div>
    );
}