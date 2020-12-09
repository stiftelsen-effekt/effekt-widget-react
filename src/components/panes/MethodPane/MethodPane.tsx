import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectPaymentMethod } from '../../../store/donation/actions'
import { State, PaymentMethod } from '../../../store/state'
import { setPaneNumber } from '../../../store/layout/actions'
import { Pane, PaneContainer, PaneTitle } from '../Panes.style'
import { BankButton, MethodPaneWrapper, MethodWrapper, PayPalButton, VippsButton, TextWrapper, InfoText } from './MethodPane.style';
import { sendAnalytics } from '../../helpers/googleanalytics';

//TODO: Move recurring donation option from DonationPane to this pane

export default function MethodPane() {
    const currentPaneNumber = useSelector((state: State) => state.layout.paneNumber)
    const dispatch = useDispatch()

    function methodClicked(method: PaymentMethod) {
        dispatch(selectPaymentMethod(method))
        dispatch(setPaneNumber(currentPaneNumber + 1))
        //TODO: Send Google analytics
        //sendAnalytics("set_method", method)
    }

    return (
        <Pane>
            <PaneContainer>
                <MethodPaneWrapper>
                    <TextWrapper>
                        <PaneTitle>Betalingsmåte</PaneTitle>
                    </TextWrapper>
                    <TextWrapper>
                        <InfoText>Kostnadene angitt dekkes av oss, slik at 100% av din donasjon kommer frem.</InfoText>
                    </TextWrapper>
                    <MethodWrapper>
                        <PayPalButton onClick={() => methodClicked(PaymentMethod.PAYPAL)}>1,90%</PayPalButton>
                        <VippsButton onClick={() => methodClicked(PaymentMethod.VIPPS)}>2,99%</VippsButton>
                        <BankButton onClick={() => methodClicked(PaymentMethod.BANK)}></BankButton>
                    </MethodWrapper>
                </MethodPaneWrapper>
            </PaneContainer>
        </Pane>
    );

}
