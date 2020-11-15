import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectPaymentMethod } from '../../../store/donation/actions'
import { State, PaymentMethod } from '../../../store/state'
import { PaneTitle } from '../Panes.style'
import { BankButton, MethodPaneWrapper, MethodWrapper, PayPalButton, VippsButton, TextWrapper, InfoText } from './MethodPane.style';

export default function MethodPane() {
    const currentPaymentMethod = useSelector((state: State) => state.donation.method)
    const dispatch = useDispatch()

    function methodClicked(method: PaymentMethod) {
        dispatch(selectPaymentMethod(method))
        document.getElementById("buttonNext")?.click()
    }

    return (
        <MethodPaneWrapper>
            <TextWrapper>
                <PaneTitle>Betalingsmåte</PaneTitle>
            </TextWrapper>
            <TextWrapper>
                <InfoText>Kostnadene angitt dekkes av oss, slik at 100% av din donasjon kommer frem.</InfoText>
            </TextWrapper>
            <MethodWrapper>
                <BankButton onClick={() => methodClicked(PaymentMethod.BANK)}>2kr</BankButton>
                <PayPalButton onClick={() => methodClicked(PaymentMethod.PAYPAL)}>1,90% + 2,8kr</PayPalButton>
            </MethodWrapper>
            <MethodWrapper>
                <VippsButton onClick={() => methodClicked(PaymentMethod.VIPPS)}>2,99%</VippsButton>
            </MethodWrapper>
            <p>Current method: {currentPaymentMethod}</p>
        </MethodPaneWrapper>
    );
}
