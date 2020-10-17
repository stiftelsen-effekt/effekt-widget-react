import React from 'react';
import { PaneProps } from './PaneProps';
import { useDispatch, useSelector } from 'react-redux'
import { selectPaymentMethod } from '../../store/donation/actions'
import { WidgetState, PaymentMethod } from '../../store/state'
import './Pane.css'

export default function MethodPane(props: PaneProps) {

    const dispatch = useDispatch()
    const currentPaymentMethod = useSelector((state: WidgetState) => state.donation.method)

    //dispatch(selectPaymentMethod(PaymentMethod.BANK))

    const widgetState = props.widget.state

    const widget = props.widget

    function selectBank() {
        dispatch(selectPaymentMethod(PaymentMethod.BANK))
        widget.nextPane()
    }

    function selectPayPal() {
        dispatch(selectPaymentMethod(PaymentMethod.PAYPAL))
        widget.nextPane()
    }

    function selectVipps() {
        dispatch(selectPaymentMethod(PaymentMethod.VIPPS))
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