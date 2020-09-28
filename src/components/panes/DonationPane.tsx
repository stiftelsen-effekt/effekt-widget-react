import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function DonationPane(props: PaneProps) {
    
    return (
        <div>
            <h1>Om donasjonen</h1>
            <form>
                <label>
                    <input type="radio" value="recommended"/>
                    Bruk vår anbefalte fordeling
                </label>
                <label>
                    <input type="radio" value="custom"/>
                    Jeg vil velge fordeling selv
                </label>
            </form>
            <div>
                <button onClick={() => { props.widget.prevPane() }}>Tilbake</button>
                <button onClick={() => { props.widget.nextPane() }}>Fram</button>
            </div>
        </div>
    );
}