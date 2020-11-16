import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSum, setRecurring } from '../../../store/donation/actions'
import { selectCustomShare } from '../../../store/layout/actions'
import { NavigationWrapper, PaneContainer, PaneTitle } from '../Panes.style';
import { PaymentMethod, State } from '../../../store/state';
import { NextButton, PrevButton } from '../shared/NavigationButtons';
import { useForm } from 'react-hook-form';
import DonorNameBar from '../shared/DonorNameBar';

export interface DonationFormValues {
    recurring: string;
    customShare: string;
    sum: number;
}

export default function DonationPane() {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(false)
    const currentPaymentMethod = useSelector((state: State) => state.donation.method)
    const { register, watch, errors } = useForm<DonationFormValues>({mode: 'onTouched'})
    const watchAllFields = watch()

    function updateDonationState(values: DonationFormValues) {
        dispatch(setSum(values.sum))
        dispatch(setRecurring(values.recurring === "true"))
        dispatch(selectCustomShare(values.customShare === "true"))
    }

    // Disables nextbutton if there are any input validation errors
    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            setNextDisabled(false)
        }
        else {
            setNextDisabled(true)
        }
        updateDonationState(watchAllFields)
    }, [watchAllFields])
    
    return (
        <PaneContainer>
            <DonorNameBar />
            <PaneTitle>Om donasjonen</PaneTitle>
            {(currentPaymentMethod === PaymentMethod.PAYPAL || currentPaymentMethod === PaymentMethod.VIPPS) && 
                    <input name="sum" type="tel" placeholder="0" ref={register({required: true, pattern: /[0-9]/ })} />
                }
                {currentPaymentMethod === PaymentMethod.PAYPAL &&
                    <div>
                        <div>
                            <input name="recurring" type="radio" value="true" ref={register} />Jeg vil gi en månedlig donasjon
                        </div>
                        <div>
                            <input name="recurring" type="radio" value="false" ref={register} />Jeg vil gi en engangsdonasjon
                        </div>
                        <br />
                    </div>
                }
                <div>
                    <input name="customShare" type="radio" value="false" ref={register} />Bruk vår anbefalte fordeling
                </div>
                <div>
                    <input name="customShare" type="radio" value="true" ref={register} />Jeg vil velge fordeling selv
                </div>
                <NavigationWrapper>
                    <PrevButton />
                    <NextButton disabled={nextDisabled} />
                </NavigationWrapper>
        </PaneContainer>
    );
}