import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSum, setRecurring, setDonorID, setKID } from '../../../store/donation/actions'
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
import { postDonation } from './../../helpers/network'

/**
 * This component renders inputs for donations
 * If the donor chooses recommended share, a post request is sent to register the donation when clicking next
 * If the donor chooses custom share, the request is sent from SharesPane instead
 */
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
    const donorName = useSelector((state: State) => state.donation.donor?.name)
    const donorEmail = useSelector((state: State) => state.donation.donor?.email)
    const donorSSN = useSelector((state: State) => state.donation.donor?.ssn)
    const donorNewsletter = useSelector((state: State) => state.donation.donor?.newsletter)
    const donationSum = useSelector((state: State) => state.donation.sum)
    const currentPaymentMethod = useSelector((state: State) => state.donation.method)
    const currentPaneNumber = useSelector((state: State) => state.layout.paneNumber)
    const { register, watch, errors, handleSubmit } = useForm<DonationFormValues>({mode: 'all'})
    const watchAllFields = watch()

    function updateDonationState(values: DonationFormValues) {
        if (values.sum) dispatch(setSum(Validator.isInt(values.sum) ? parseInt(values.sum) : 0))
        if (values.recurring) dispatch(setRecurring(values.recurring == "true"))
        if (values.customShare) dispatch(selectCustomShare(values.customShare == "true"))
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

    function onSubmit() {
        if (Object.keys(errors).length === 0) {
            if (!isCustomShare) {
                if (donorName && donorEmail && donorNewsletter !== undefined && donationSum ) {
                    const postData = {
                            donor: {
                                name: donorName,
                                email: donorEmail,
                                ssn: donorSSN ? donorSSN.toString() : "",
                                newsletter: donorNewsletter
                            },
                        amount: donationSum
                    }
                postDonation(postData, dispatch)
                }
            }
            dispatch(setPaneNumber(currentPaneNumber + (isCustomShare ? 1 : 2)))
        }
    }
    
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
                        <NextButton isDisabled={nextDisabled} text={isCustomShare ? "Neste" : "Fullfør"} />
                    </NavigationWrapper>
                </form>
            </PaneContainer>
        </Pane>
    );
}