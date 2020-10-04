import React from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import '../style/Pane.css'

export default function ReferralPane(props: PaneProps) {

    const pretendDatabase = [
        {ID: 1, name: "Anbefaling av en bekjent"},
        {ID: 2, name: "Twitter"},
        {ID: 3, name: "Facebook"}
    ]

    return (
        <div className="pane">
            <h1>Hvor hørte du om oss?</h1>
            <p>Valgfritt</p>
            <div className="pane">
                {pretendDatabase.map(ref => { return (<button key={ref.ID} onClick={() => {props.widget.nextPane()} }>{ref.name}</button>)})}
            </div>
            <div>
                {props.widget.prevButton()}
                {props.widget.nextButton()}
            </div>
        </div>
    );
}