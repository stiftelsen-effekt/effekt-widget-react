import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectPaymentMethod } from '../../store/donation/actions'
import { WidgetState, PaymentMethod } from '../../store/state'

export default function MethodPane() {

    const dispatch = useDispatch()
    const currentPaymentMethod = useSelector((state: WidgetState) => state.donation.method)

    //dispatch(selectPaymentMethod(PaymentMethod.BANK))

    function selectBank() {
        dispatch(selectPaymentMethod(PaymentMethod.BANK))
    }

    function selectPayPal() {
        dispatch(selectPaymentMethod(PaymentMethod.PAYPAL))
    }

    function selectVipps() {
        dispatch(selectPaymentMethod(PaymentMethod.VIPPS))
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