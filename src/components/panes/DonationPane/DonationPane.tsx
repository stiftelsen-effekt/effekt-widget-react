import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSum } from '../../../store/donation/actions'
import { setPaneNumber } from '../../../store/layout/actions'
import { HorizontalLine, NavigationWrapper, Pane, PaneContainer, PaneTitle, VerticalLine } from '../Panes.style';
import { PaneNumber, PaymentMethod, paymentMethodStrings, State } from '../../../store/state';
import { NextButton, PrevButton } from '../../shared/Buttons/NavigationButtons';
import { useForm } from 'react-hook-form';
import { InputLabel, RadioButton, RadioWrapper, TextField } from '../Forms.style';
import { Collapse } from '@material-ui/core';
import ErrorField from '../../shared/Error/ErrorField';
import Validator from 'validator'
import { postDonation } from './../../helpers/network'
import { DonationData } from '../../helpers/network.types';

interface DonationFormValues {
    recurring: string;
    customShare: string;
    sum: string;
}

//TODO: Add loading animation after submitting

export const DonationPane: React.FC = () => {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(false)
    const [ sumErrorAnimation, setSumErrorAnimation ] = useState(false)
    const [ customShareErrorAnimation, setCustomShareErrorAnimation ] = useState(false)
    const isCustomShare = useSelector((state: State) => state.layout.customShare)
    const DonationMethod = useSelector((state: State) => state.donation.method)
    const donorName = useSelector((state: State) => state.donation.donor?.name)
    const donorEmail = useSelector((state: State) => state.donation.donor?.email)
    const donorSSN = useSelector((state: State) => state.donation.donor?.ssn)
    const donorNewsletter = useSelector((state: State) => state.donation.donor?.newsletter)
    const donationSum = useSelector((state: State) => state.donation.sum)
    const currentPaymentMethod = useSelector((state: State) => state.donation.method)
    const answeredReferral = useSelector((state: State) => state.layout.answeredReferral)
    const { register, watch, errors, handleSubmit } = useForm<DonationFormValues>({mode: 'all'})
    const watchAllFields = watch()


    useEffect(() => {
        errors.sum ? setSumErrorAnimation(true) : setSumErrorAnimation(false)
        errors.customShare ? setCustomShareErrorAnimation(true) : setCustomShareErrorAnimation(false)

        if (Object.keys(errors).length === 0) {
            setNextDisabled(false)
        }
        else {
            setNextDisabled(true)
        }

        let values = watchAllFields
        if (values.sum) dispatch(setSum(Validator.isInt(values.sum) ? parseInt(values.sum) : 0))
    }, [dispatch, errors, watchAllFields])

    // This hook waits for the response from the POST donation request sent when submittig
    // It then uses the response data to determine how many panes to skip
    useEffect(() => {
        if (answeredReferral !== undefined) {
            if (!isCustomShare && answeredReferral) {
                if (DonationMethod === PaymentMethod.BANK) {
                    dispatch(setPaneNumber(PaneNumber.ResultPane))
                }
                else if (DonationMethod === PaymentMethod.VIPPS) {
                    dispatch(setPaneNumber(PaneNumber.VippsPane))
                }
                else if (DonationMethod === PaymentMethod.PAYPAL) {
                    dispatch(setPaneNumber(PaneNumber.PayPalPane))

                }
            }
            else if (!isCustomShare) {
                dispatch(setPaneNumber(PaneNumber.ReferralPane))
            }
        }
    }, [DonationMethod, answeredReferral, dispatch, isCustomShare])

    function onSubmit() {
        if (Object.keys(errors).length === 0) {
            if (!isCustomShare) {
                if (donorName && donorEmail && donorNewsletter !== undefined && currentPaymentMethod) {
                    //TODO: Move this to network.ts
                    const postData: DonationData = {
                        donor: {
                            name: donorName,
                            email: donorEmail,
                            ssn: donorSSN ? donorSSN.toString() : "",
                            newsletter: donorNewsletter
                        },
                        method: paymentMethodStrings[currentPaymentMethod]
                    }
                    if (donationSum && (currentPaymentMethod !== PaymentMethod.BANK && currentPaymentMethod !== PaymentMethod.BANK_UKID )) { 
                        postData.amount = donationSum
                    }
                    postDonation(postData, dispatch)
                }
            }
            else if (isCustomShare === true) {
                dispatch(setPaneNumber(PaneNumber.SharesPane))
            }
        }
    }
    
    return (
        <Pane>
            <PaneContainer>
                <PaneTitle>Om donasjonen</PaneTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Collapse in={sumErrorAnimation}>
                        <ErrorField text="Ugyldig sum"/>
                    </Collapse>
                    {(currentPaymentMethod === PaymentMethod.PAYPAL || currentPaymentMethod === PaymentMethod.VIPPS) && 
                        <TextField name="sum" maxLength={10} type="tel" placeholder="0" ref={register({required: true, validate: val => Validator.isInt(val) && val > 0 })} />
                    }
                    {currentPaymentMethod === PaymentMethod.PAYPAL &&
                        <div>
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