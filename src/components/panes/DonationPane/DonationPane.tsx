import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSum, setRecurring } from '../../../store/donation/actions'
import { selectCustomShare } from '../../../store/layout/actions'
import { HorizontalLine, NavigationWrapper, PaneContainer, PaneTitle, VerticalLine } from '../Panes.style';
import { PaymentMethod, State } from '../../../store/state';
import { NextButton, PrevButton } from '../shared/NavigationButtons';
import { useForm } from 'react-hook-form';
import DonorNameBar from '../shared/DonorNameBar';
import { InputLabel, RadioButton, RadioWrapper, TextField } from '../Forms.style';
import { Collapse } from '@material-ui/core';
import ErrorField from '../shared/ErrorField';
import Validator from 'validator'
export interface DonationFormValues {
    recurring: string;
    customShare: string;
    sum: number;
}

export default function DonationPane() {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(false)
    const [ sumErrorAnimation, setSumErrorAnimation ] = useState(false)
    const [ recurringErrorAnimation, setRecurringErrorAnimation ] = useState(false)
    const [ customShareErrorAnimation, setCustomShareErrorAnimation ] = useState(false)
    const isCustomShare = useSelector((state: State) => state.layout.customShare)
    const isRecurring = useSelector((state: State) => state.donation.recurring)
    const currentPaymentMethod = useSelector((state: State) => state.donation.method)
    const { register, watch, errors, handleSubmit } = useForm<DonationFormValues>({mode: 'all'})
    const watchAllFields = watch()

    function updateDonationState(values: DonationFormValues) {
        if (values.sum) dispatch(setSum(values.sum))
        if (values.recurring) dispatch(setRecurring(values.recurring == "true"))
        if (values.customShare) dispatch(selectCustomShare(values.customShare == "true"))
    }

    // TODO: Replace when new carousel
    function onSubmit() {
        if (Object.keys(errors).length === 0) {
            document.getElementById("buttonNext")?.click()
        }
    }

    useEffect(() => {
        // Plays animation if an error changes
        errors.sum ? setSumErrorAnimation(true) : setSumErrorAnimation(false)
        errors.recurring ? setRecurringErrorAnimation(true) : setRecurringErrorAnimation(false)
        errors.customShare ? setCustomShareErrorAnimation(true) : setCustomShareErrorAnimation(false)

        // Disables nextbutton if there are any input validation errors
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Collapse in={sumErrorAnimation}>
                    <ErrorField text="Ugyldig sum"/>
                </Collapse>
                {(currentPaymentMethod === PaymentMethod.PAYPAL || currentPaymentMethod === PaymentMethod.VIPPS) && 
                    <TextField name="sum" type="tel" placeholder="0" ref={register({required: true, validate: val => Validator.isInt(val) && val > 0 })} />
                }
                {currentPaymentMethod === PaymentMethod.PAYPAL &&
                    <div>
                        <RadioWrapper>
                            <Collapse in={recurringErrorAnimation}>
                                <ErrorField text="Du må velge et alternativ"/>
                            </Collapse>
                            <div><RadioButton name="recurring" type="radio" value="true" ref={register} defaultChecked={isRecurring} /><InputLabel>Jeg vil gi en månedlig donasjon</InputLabel></div>
                            <div><RadioButton name="recurring" type="radio" value="false" ref={register} defaultChecked={!isRecurring} /><InputLabel>Jeg vil gi en engangsdonasjon</InputLabel></div>
                        </RadioWrapper>
                        <HorizontalLine />
                    </div>
                }
                <RadioWrapper>
                    <Collapse in={customShareErrorAnimation}>
                        <ErrorField text="Du må velge et alternativ"/>
                    </Collapse>
                    <div><RadioButton name="customShare" type="radio" value="false" ref={register} defaultChecked={!isCustomShare} /><InputLabel>Bruk vår anbefalte fordeling</InputLabel></div>
                    <div><RadioButton name="customShare" type="radio" value="true" ref={register} defaultChecked={isCustomShare} /><InputLabel>Jeg vil velge fordeling selv</InputLabel></div>
                </RadioWrapper>
                <HorizontalLine />
                <NavigationWrapper>
                    <PrevButton />
                    <VerticalLine />
                    <NextButton isDisabled={nextDisabled} />
                </NavigationWrapper>
            </form>
        </PaneContainer>
    );
}