import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectPaymentMethod } from '../../../store/donation/actions'
import { State, PaymentMethod } from '../../../store/state'

export default function MethodPane() {

    const dispatch = useDispatch()
    const currentPaymentMethod = useSelector((state: State) => state.donation.method)

    return (
        <div className="pane">
            <h1>Betalingsmåte</h1>
            <div>
                <button onClick={() => dispatch(selectPaymentMethod(PaymentMethod.BANK))}>Bank</button>
                <button onClick={() => dispatch(selectPaymentMethod(PaymentMethod.PAYPAL))}>PayPal</button>
                <button onClick={() => dispatch(selectPaymentMethod(PaymentMethod.VIPPS))}>Vipps</button>
                <p>Current method: {currentPaymentMethod}</p>
            </div>
        </div>
    );
}