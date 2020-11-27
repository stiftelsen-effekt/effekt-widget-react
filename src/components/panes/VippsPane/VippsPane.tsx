import React from 'react';
import { useSelector } from 'react-redux';
import { PaymentMethod, State } from '../../../store/state';
import { Pane, PaneContainer, PaneTitle } from '../Panes.style';
import DonationInfoBar from '../shared/DonationInfoBar/DonationInfoBar';
import { PrevButton } from '../shared/NavigationButtons';

export default function VippsPane() {

    function openVipps() {

    }

    return (
        <Pane>
            <PaneContainer>
                <DonationInfoBar />
                <PaneTitle>Vipps</PaneTitle>
                <button onClick={openVipps}></button>
            </PaneContainer>
        </Pane>
    )
}