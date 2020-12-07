import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectPaymentMethod, setRecurring } from '../../../store/donation/actions'
import { State, PaymentMethod } from '../../../store/state'
import { nextPane, setPaneNumber } from '../../../store/layout/actions'
import { Pane, PaneContainer } from '../Panes.style'
import { MethodPaneWrapper, MethodWrapper, MethodButton, TextWrapper, InfoText } from './MethodPane.style';
import { RichSelect } from '../../shared/RichSelect/RichSelect';
import { RichSelectOption } from '../../shared/RichSelect/RichSelectOption';
import { RECURRING_DONATION } from '../../../store/donation/types';

export const MethodPane: React.FC = () => {
    const dispatch = useDispatch()
    const recurring = useSelector((state: State) => state.donation.recurring)

    const selectMethod = (method: PaymentMethod) => {
        dispatch(selectPaymentMethod(method))
        dispatch(nextPane())
    }

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
                        <MethodButton onClick={() => selectMethod(PaymentMethod.BANK)}></MethodButton>
                        <MethodButton onClick={() => selectMethod(PaymentMethod.PAYPAL)}>1,90%</MethodButton>
                        <MethodButton onClick={() => selectMethod(PaymentMethod.VIPPS)}>2,99%</MethodButton>
                    </MethodWrapper>
                </MethodPaneWrapper>
            </PaneContainer>
        </Pane>
    );

}
