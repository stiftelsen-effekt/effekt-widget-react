import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaneNumber } from '../../../store/layout/actions';
import { PaneNumber, State } from '../../../store/state';
import { Pane, PaneContainer } from '../Panes.style';
import DonationInfoBar from '../shared/DonationInfoBar/DonationInfoBar';
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
                <DonationInfoBar />
                <VippsButton onClick={openVipps}></VippsButton>
            </PaneContainer>
        </Pane>
    )
}