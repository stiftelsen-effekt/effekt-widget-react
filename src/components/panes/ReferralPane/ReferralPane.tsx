import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setPaneNumber } from '../../../store/layout/actions'
import { State } from '../../../store/state'
import { getReferrals } from '../../helpers/network'
import { HorizontalLine, NavigationWrapper, Pane, PaneContainer, PaneTitle, UnderTitle, VerticalLine } from '../Panes.style'
import DonationInfoBar from '../shared/DonationInfoBar/DonationInfoBar'
import { NextButton, PrevButton } from '../shared/NavigationButtons'
import { ReferralButton, ReferralsWrapper } from './ReferralPane.style'
interface Referral {
    ID: number;
    name: string;
    ordering: number;
}

export default function ReferralPane() {
    const [referrals, setReferrals] = useState<Referral[]>()
    const currentPaneNumber = useSelector((state: State) => state.layout.paneNumber)
    const { handleSubmit } = useForm()
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
            //TODO: Remove BYNN podcast from database?
            if (ref.name !== "BYNN podcast")     
            referralsList.push(
                //TODO: Post referrals on click
                <ReferralButton key={ref.ID} onClick={() => onSubmit(ref.ID)}>{ref.name}</ReferralButton>
                )
            })
        }
        return referralsList
    }

    function onSubmit(referral: number) {
        dispatch(setPaneNumber(currentPaneNumber + 1))
    }

    return (
        <Pane>
            <PaneContainer>
                <DonationInfoBar />
                <PaneTitle>Hvor hørte du om oss?</PaneTitle>
                <UnderTitle>Valgfritt</UnderTitle>
                <form onSubmit={handleSubmit(() => onSubmit(-1))}>
                    <ReferralsWrapper>
                        {setupReferrals()}
                    </ReferralsWrapper>
                    <NavigationWrapper>
                        <PrevButton />
                        <VerticalLine />
                        <NextButton isDisabled={false} />
                    </NavigationWrapper>
                </form>
            </PaneContainer>
        </Pane>
    );
}