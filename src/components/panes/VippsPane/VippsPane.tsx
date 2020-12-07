import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentProviderURL } from '../../../store/donation/actions';
import { setPaneNumber } from '../../../store/layout/actions';
import { PaneNumber, PaymentMethod, State } from '../../../store/state';
import { Pane, PaneContainer } from '../Panes.style';
import { VippsButton } from './VippsPane.style';

export default function VippsPane() {
    const vippsPaymentURL = useSelector((state: State) => state.donation.paymentProviderURL)
    const dispatch = useDispatch()

    function openVipps() {
        window.open(vippsPaymentURL)
        dispatch(setPaneNumber(PaneNumber.ResultPane))
    }

    return (
        <Pane>
            <PaneContainer>
                <VippsButton onClick={openVipps}></VippsButton>
            </PaneContainer>
        </Pane>
    )
}