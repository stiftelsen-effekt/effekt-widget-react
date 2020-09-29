import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function ReferralPane(props: PaneProps) {

    const pretendDatabase = [
        "Anbefaling av en bekjent",
        "Twitter",
        "Facebook"
    ]

    return (
        <div className="pane">
            <h1>Hvor hørte du om oss?</h1>
            <p>Valgfritt</p>
            <div className="pane">
                {pretendDatabase.map(ref => { return (<button onClick={() => {props.widget.nextPane()} }>{ref}</button>)})}
            </div>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}