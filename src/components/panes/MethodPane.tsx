import React from 'react';
import { PaneProps } from '../interfaces/PaneProps';
import '../style/Pane.css'

export default function MethodPane(props: PaneProps) {

    const widget = props.widget

    function selectBank() {
        widget.state.setMethod("Bank")
        widget.nextPane()
    }

    function selectPayPal() {
        widget.state.setMethod("PayPal")
        widget.nextPane()
    }

    function selectVipps() {
        widget.state.setMethod("Vipps")
        widget.nextPane()
    }

    return (
        <div className="pane">
            <h1>Betalingsmåte</h1>
            <div>
                <button onClick={selectBank}>Bank</button>
                <button onClick={selectPayPal}>PayPal</button>
                <button onClick={selectVipps}>Vipps</button>
            </div>
        </div>
    );
}