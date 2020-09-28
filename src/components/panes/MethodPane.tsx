import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function MethodPane(props: PaneProps) {

    return (
        <div className="pane">
            <h1>Betalingsmåte</h1>
            <div>
                <button onClick={() => { props.widget.nextPane() }}>BANK</button>
                <button onClick={() => { props.widget.nextPane() }}>PayPal</button>
                <button onClick={() => { props.widget.nextPane() }}>Vipps</button>
            </div>
        </div>
    );
}