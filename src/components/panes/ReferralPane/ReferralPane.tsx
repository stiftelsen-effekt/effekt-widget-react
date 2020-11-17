import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getReferrals } from '../../helpers/network'
import { HorizontalLine, NavigationWrapper, PaneContainer, PaneTitle, UnderTitle, VerticalLine } from '../Panes.style'
import DonationInfoBar from '../shared/DonationInfoBar'
import { NextButton, PrevButton } from '../shared/NavigationButtons'
import { ReferralButton, ReferralsWrapper } from './ReferralPane.style'

interface Referral {
    ID: number;
    name: string;
    ordering: number;
}

//TODO: Refactor by using react-query and axios
export default function ReferralPane() {
    const [referrals, setReferrals] = useState<Referral[]>()
    const { handleSubmit } = useForm()

    useEffect(() => {
        getReferrals()
          .then(response => setReferrals(response))
          .catch((error) => console.log(error.message))
      }, [])

    function setupReferrals() {
        let referralsList: JSX.Element[] = []

        if (referrals) {
            referrals.forEach(ref => {
            if (ref.name !== "BYNN podcast")     
            referralsList.push(
                //TODO: Post referrals on click
                <ReferralButton key={ref.ID} onClick={() => {}}>{ref.name}</ReferralButton>
                )
            })
        }
        return referralsList
    }
    function onSubmit() {
        document.getElementById("buttonNext")?.click()
    }

    return (
        <PaneContainer>
            <DonationInfoBar />
            <PaneTitle>Hvor hørte du om oss?</PaneTitle>
            <UnderTitle>Valgfritt</UnderTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ReferralsWrapper>
                    {setupReferrals()}
                </ReferralsWrapper>
                <HorizontalLine />
                <NavigationWrapper>
                    <PrevButton />
                    <VerticalLine />
                    <NextButton isDisabled={false} />
                </NavigationWrapper>
            </form>
        </PaneContainer>
    );
}