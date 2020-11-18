import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSum, setRecurring } from '../../../store/donation/actions'
import { selectCustomShare, setPaneNumber } from '../../../store/layout/actions'
import { HorizontalLine, NavigationWrapper, Pane, PaneContainer, PaneTitle, VerticalLine } from '../Panes.style';
import { PaymentMethod, State } from '../../../store/state';
import { NextButton, PrevButton } from '../shared/NavigationButtons';
import { useForm } from 'react-hook-form';
import DonationInfoBar from '../shared/DonationInfoBar/DonationInfoBar';
import { InputLabel, RadioButton, RadioWrapper, TextField } from '../Forms.style';
import { Collapse } from '@material-ui/core';
import ErrorField from '../shared/ErrorField';
import Validator from 'validator'
interface DonationFormValues {
    recurring: string;
    customShare: string;
    sum: string;
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
    const currentPaneNumber = useSelector((state: State) => state.layout.paneNumber)
    const { register, watch, errors, handleSubmit } = useForm<DonationFormValues>({mode: 'all'})
    const watchAllFields = watch()

    function updateDonationState(values: DonationFormValues) {
        console.log(values.sum)
        if (values.sum) console.log(Validator.isInt(values.sum))
        if (values.sum) dispatch(setSum(Validator.isInt(values.sum) ? parseInt(values.sum) : 0))
        if (values.recurring) dispatch(setRecurring(values.recurring == "true"))
        if (values.customShare) dispatch(selectCustomShare(values.customShare == "true"))
    }

    function onSubmit() {
        if (Object.keys(errors).length === 0) {
            dispatch(setPaneNumber(currentPaneNumber + (isCustomShare ? 1 : 2)))
        }
    }

    useEffect(() => {
        errors.sum ? setSumErrorAnimation(true) : setSumErrorAnimation(false)
        errors.recurring ? setRecurringErrorAnimation(true) : setRecurringErrorAnimation(false)
        errors.customShare ? setCustomShareErrorAnimation(true) : setCustomShareErrorAnimation(false)

        if (Object.keys(errors).length === 0) {
            setNextDisabled(false)
        }
        else {
            setNextDisabled(true)
        }

        updateDonationState(watchAllFields)
    }, [watchAllFields])
    
    return (
        <Pane>
            <PaneContainer>
                <DonationInfoBar sum={watchAllFields.sum === "" || !Validator.isInt(watchAllFields.sum ? watchAllFields.sum : "")  ? 0 : parseInt(watchAllFields.sum)} />
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
                    <NavigationWrapper>
                        <PrevButton />
                        <VerticalLine />
                        <NextButton isDisabled={nextDisabled} />
                    </NavigationWrapper>
                </form>
            </PaneContainer>
        </Pane>
    );
}