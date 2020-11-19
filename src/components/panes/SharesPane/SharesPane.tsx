import React, { useEffect, useState } from 'react'
import { getOrganizationsURL } from '../../helpers/network'
import { Organization } from './../../interfaces/Organization'
import { useForm } from 'react-hook-form'
import { setShares } from './../../../store/donation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../../store/state'
import { HorizontalLine, NavigationWrapper, PaneContainer, PaneTitle, VerticalLine } from '../Panes.style'
import { OrganizationName, PercentageText, SharesWrapper, ShareWrapper, SmallTextField } from './SharesPane.style'
import DonationInfoBar from '../shared/DonationInfoBar/DonationInfoBar'
import { NextButton, PrevButton } from '../shared/NavigationButtons'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Collapse } from '@material-ui/core'
import { setPaneNumber } from '../../../store/layout/actions'
import { ToolTip } from '../shared/ToolTip'
import { postDonation } from './../../helpers/network'
import { DonationData, OrganizationSplit } from './../../helpers/network.types'

const tooltipLink = "https://gieffektivt.no/organisasjoner"

export default function SharesPane() {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(false)
    const currentPaneNumber = useSelector((state: State) => state.layout.paneNumber)
    const donorName = useSelector((state: State) => state.donation.donor?.name)
    const donorEmail = useSelector((state: State) => state.donation.donor?.email)
    const donorSSN = useSelector((state: State) => state.donation.donor?.ssn)
    const donorNewsletter = useSelector((state: State) => state.donation.donor?.newsletter)
    const donationSum = useSelector((state: State) => state.donation.sum)
    const [ percentageErrorAnimation, setPercentageErrorAnimation ] = useState(false)
    const { register, watch, handleSubmit, setValue } = useForm({mode: 'all'})
    const watchAllFields = watch()
    const {isLoading, error, data } = useQuery("getOrganizations", () => 
        axios(getOrganizationsURL)
    )

    function getTotalPercentage() {
        let totalPercentage: number = 0
        let detectedNegativeShare: boolean = false
        for (const property in watchAllFields) {
            const share = watchAllFields[property]

            if (share !== "") totalPercentage += parseInt(watchAllFields[property])
            if (share === "0") setValue(property, "")
            if (parseInt(watchAllFields[property]) < 0) detectedNegativeShare = true
        }
        return {totalPercentage: totalPercentage, detectedNegativeShare: detectedNegativeShare}
    }

    function setupOrganizationInput(org: Organization) {
        return (
            <ShareWrapper key={org.id}> 
                <OrganizationName>{org.name}</OrganizationName>
                <ToolTip text={org.shortDesc} link={tooltipLink} />
                <SmallTextField 
                    type="number" 
                    inputMode="decimal" 
                    placeholder="0"
                    name={org.id.toString()}
                    defaultValue={org.standardShare ? org.standardShare : 0}
                    ref={register} 
                />
                <PercentageText>%</PercentageText>
            </ShareWrapper>
        )
    }

    useEffect(() => {
        const total = getTotalPercentage().totalPercentage
        const negative = getTotalPercentage().detectedNegativeShare
        if (total === 100) {
            setNextDisabled(false)
            setPercentageErrorAnimation(false)
        } 
        else if (data) {
            setNextDisabled(true)
            setPercentageErrorAnimation(true)
         }
        if (negative) {
            setNextDisabled(true)
            setPercentageErrorAnimation(true)
        }
    }, [watchAllFields])

    function onSubmit() {
        if (getTotalPercentage().totalPercentage === 100) {
            dispatch(setPaneNumber(currentPaneNumber + 1))
            if (donorName && donorEmail && donorNewsletter !== undefined && donationSum ) {
                
                let organizations: Array<OrganizationSplit> = []

                const postData: DonationData  = {
                        donor: {
                            name: donorName,
                            email: donorEmail,
                            ssn: donorSSN ? donorSSN.toString() : "",
                            newsletter: donorNewsletter
                        },
                    amount: donationSum,
                    // TODO: Make organizations dynamic
                    organizations: [{
                        id: 1,
                        split: 100,
                        name: "Against Malaria Foundation"
                    }]
                }
            postDonation(postData, dispatch)
            }
        }
        dispatch(setShares(watchAllFields))
    }
    
    return (
        <PaneContainer>
            <DonationInfoBar />
            <PaneTitle>Velg fordeling</PaneTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SharesWrapper>
                    {isLoading && <p>Laster inn...</p>}
                    {error && <p>Noe gikk galt</p>}
                    {data?.data.content.map((org: any) => setupOrganizationInput(org))}
                </SharesWrapper>
                <Collapse in={percentageErrorAnimation}>
                    <PercentageText>Du har fordelt {getTotalPercentage().totalPercentage} / 100%</PercentageText>
                </Collapse>
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