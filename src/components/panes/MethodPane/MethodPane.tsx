import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectPaymentMethod, setRecurring } from '../../../store/donation/actions'
import { State, PaymentMethod } from '../../../store/state'
import { setPaneNumber } from '../../../store/layout/actions'
import { Pane, PaneContainer } from '../Panes.style'
import { MethodPaneWrapper, MethodWrapper, MethodButton, TextWrapper, InfoText } from './MethodPane.style';
import { RichSelect } from '../../shared/RichSelect/RichSelect';
import { RichSelectOption } from '../../shared/RichSelect/RichSelectOption';
import { RECURRING_DONATION } from '../../../store/donation/types';

export default function MethodPane() {
    const dispatch = useDispatch()
    const recurring = useSelector((state: State) => state.donation.recurring)

    return (
        <Pane>
            <PaneContainer>
                <MethodPaneWrapper>
                    <TextWrapper>
                        <InfoText>Kostnadene angitt dekkes av oss, slik at 100% av din donasjon kommer frem.</InfoText>
                    </TextWrapper>
                    <RichSelect 
                        selected={recurring}
                        onChange={(value: RECURRING_DONATION) => dispatch(setRecurring(value))}
                        >
                        <RichSelectOption 
                            label="Gi en fast månedlig sum" 
                            sublabel="Du vil bli varslet ved trekk og kan avslutte når som helst" 
                            value={RECURRING_DONATION.RECURRING} />
                        <RichSelectOption 
                            label="Gi et engangsbeløp" 
                            value={RECURRING_DONATION.NON_RECURRING} />
                    </RichSelect>
                    <MethodWrapper>
                        <MethodButton onClick={() => dispatch(selectPaymentMethod(PaymentMethod.BANK))}></MethodButton>
                        <MethodButton onClick={() => dispatch(selectPaymentMethod(PaymentMethod.PAYPAL))}>1,90%</MethodButton>
                        <MethodButton onClick={() => dispatch(selectPaymentMethod(PaymentMethod.VIPPS))}>2,99%</MethodButton>
                    </MethodWrapper>
                </MethodPaneWrapper>
            </PaneContainer>
        </Pane>
    );

}
