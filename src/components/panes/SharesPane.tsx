import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function MethodPane(props: PaneProps) {

    const pretendDatabase = [
        "Against malaria foundation",
        "GiveWell",
        "Malaria Consortium"
    ]

    return (
        <div className="pane">
            <h1>Velg fordeling</h1>
            <div className="pane">
                {pretendDatabase.map(org => { return (<div><p>{org}</p><input type="tel"></input></div>)})}
            </div>
            <div>
                <button onClick={() => { props.widget.prevPane() }}>Tilbake</button>
                <button onClick={() => { props.widget.nextPane() }}>Fram</button>
            </div>
        </div>
    );
}