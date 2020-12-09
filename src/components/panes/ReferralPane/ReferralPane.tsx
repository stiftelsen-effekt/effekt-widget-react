import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Collapse } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setPaneNumber } from '../../../store/layout/actions'
import { PaneNumber, PaymentMethod, State } from '../../../store/state'
import { getReferrals, postReferral } from '../../helpers/network'
import { NavigationWrapper, Pane, PaneContainer, PaneTitle, UnderTitle, VerticalLine } from '../Panes.style'
import DonationInfoBar from '../shared/DonationInfoBar/DonationInfoBar'
import { NavButton, NextButton, PrevButton } from '../shared/NavigationButtons'
import { OtherInput, OtherInputWrapper, ReferralButton, ReferralsWrapper } from './ReferralPane.style'

interface Referral {
    ID: number;
    name: string;
    ordering: number;
}

export default function ReferralPane() {
    const [referrals, setReferrals] = useState<Referral[]>()
    const [openOtherInput, setOpenOtherInput ] = useState(false)
    const currentPaneNumber = useSelector((state: State) => state.layout.paneNumber)
    const paymentMethod = useSelector((state: State) => state.donation.method)
    const donorID = useSelector((state: State) => state.donation.donor?.donorID)
    const { handleSubmit, register, watch, errors } = useForm()
    const watchOtherInput = watch("other", false)
    const dispatch = useDispatch()

    useEffect(() => {
        getReferrals()
          .then(response => setReferrals(response))
          .catch((error) => console.log(error.message))
    }, [])

    function setupReferrals() {
        let referralsList: JSX.Element[] = []

        if (referrals) {
            referrals.forEach(ref => {
                //TODO: Add input field for "annet" referral
                if (ref.name !== "BYNN podcast") {
                    referralsList.push(
                        //TODO: Post referrals on click
                        <ReferralButton type="button" key={ref.ID} onClick={() => onSubmit(ref.ID)}>{ref.name}</ReferralButton>
                    )
                }
            })
        }
        return referralsList
    }

    function goToNextPane() {
        if (paymentMethod == PaymentMethod.BANK) {
            dispatch(setPaneNumber(PaneNumber.ResultPane))
        }
        else if (paymentMethod == PaymentMethod.VIPPS) {
            dispatch(setPaneNumber(PaneNumber.VippsPane))
        }
        else if (paymentMethod == PaymentMethod.PAYPAL) {
            dispatch(setPaneNumber(PaneNumber.PayPalPane))
        }
    }

    function postExistingReferral(referralID: number) {
        if (donorID) {
            const referralData = {
                referralTypeID: referralID,
                donorID: donorID,
                otherComment: ""
            }
            postReferral(referralData)
            goToNextPane()
        }
    }

    function postOtherReferral() {
        if (donorID) {
            const referralData = {
                referralTypeID: 10,
                donorID: donorID,
                otherComment: watchOtherInput
            }
            postReferral(referralData)
            goToNextPane()
        }
    }

    // This function is called when pressing any of the referral buttons except "Annet", whose ID is 10
    function onSubmit(referralID: number) {
        if (referralID !== 10) {
            postExistingReferral(referralID)
        }
        else if (referralID === 10) {
            setOpenOtherInput(true)
        }
    }

    return (
        <Pane>
            <PaneContainer>
                <DonationInfoBar />
                <PaneTitle>Hvor hørte du om oss?</PaneTitle>
                <form onSubmit={handleSubmit(() => onSubmit(-1))}>
                    <Collapse in={!openOtherInput}>
                        <UnderTitle>Valgfritt</UnderTitle>
                        <ReferralsWrapper>
                            {setupReferrals()}
                        </ReferralsWrapper>
                        <NavigationWrapper>
                            <NextButton isDisabled={false} />
                        </NavigationWrapper>
                    </Collapse>
                    <Collapse in={openOtherInput}>
                        <OtherInputWrapper>
                            <UnderTitle>Fortell gjerne mer</UnderTitle>
                            <OtherInput name="other" placeholder="Skriv her" ref={register} />
                        </OtherInputWrapper>
                        <NavigationWrapper>
                        {openOtherInput && <NavButton onClick={() => setOpenOtherInput(false)} text="Tilbake" />}
                        <VerticalLine />
                        <NavButton onClick={postOtherReferral} text="Fullfør"/>
                    </NavigationWrapper>
                    </Collapse>
                </form>
            </PaneContainer>
        </Pane>
    );
}