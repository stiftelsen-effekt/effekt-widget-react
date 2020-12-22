import React, { useEffect, useState } from 'react'
import { getOrganizationsURL } from '../../helpers/network'
import { Organization } from '../../../types/Organization'
import { useForm } from 'react-hook-form'
import { setShares } from './../../../store/donation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../../store/state'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Collapse } from '@material-ui/core'
import { ToolTip } from '../../shared/ToolTip/ToolTip'
import { postDonation } from './../../helpers/network'
import { DonationData, OrganizationSplit } from './../../helpers/network.types'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import { FloatRightDiv, OrganizationName, PercentageText, ShareInput, ShareInputContainer } from './ShareSelection.style'

const tooltipLink = "https://gieffektivt.no/organisasjoner"

// TODO: Loading animation after submitting

export default function SharesPane() {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(false)
    const [ submitLoading, setSubmitLoading ] = useState(false)
    const currentPaneNumber = useSelector((state: State) => state.layout.paneNumber)
    const donorName = useSelector((state: State) => state.donation.donor?.name)
    const donorEmail = useSelector((state: State) => state.donation.donor?.email)
    const donorSSN = useSelector((state: State) => state.donation.donor?.ssn)
    const donorNewsletter = useSelector((state: State) => state.donation.donor?.newsletter)
    const donationSum = useSelector((state: State) => state.donation.sum)
    const donationMethod = useSelector((state: State) => state.donation.method)
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
            <ShareInputContainer key={org.id}>
                <ToolTip text={org.shortDesc} link={tooltipLink} />
                <OrganizationName>{org.name}</OrganizationName>
                <FloatRightDiv>
                    <ShareInput 
                        type="number" 
                        inputMode="decimal" 
                        placeholder="0"
                        name={org.id.toString()}
                        defaultValue={org.standardShare ? org.standardShare : 0}
                        ref={register} 
                    />
                    <PercentageText>%</PercentageText>
                </FloatRightDiv>
            </ShareInputContainer>
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
        dispatch(setShares(watchAllFields))
        if (getTotalPercentage().totalPercentage === 100) {
            setSubmitLoading(true)
            if (donorName && donorEmail && donationMethod && donorNewsletter !== undefined) {
                
                let orgSplits: Array<OrganizationSplit> = []
                
                for (const property in watchAllFields) {
                    const split = watchAllFields[property]
                    if (split > 0) {
                        let orgSplit: OrganizationSplit = {id: 0, split: 0, name: ""}
                        orgSplit.id = parseInt(property)
                        orgSplit.split = parseInt(watchAllFields[property])
                        data?.data.content.forEach((org: Organization) => {
                            if (orgSplit.id === org.id) {
                                orgSplit.name = org.name
                            }
                        })
                        orgSplits.push(orgSplit)
                    }
                }

                const postData: DonationData  = {
                    donor: {
                        name: donorName,
                        email: donorEmail,
                        newsletter: donorNewsletter
                    },
                    //TODO: Send payment method as string (not number)
                    method: "",
                    organizations: orgSplits
                }
                if (donationSum) postData.amount = donationSum
                if (donorSSN) postData.donor.ssn = donorSSN.toString()

                // TODO: Move dispatches from network.ts to here
                postDonation(postData, dispatch).then((result) => {
                    console.log(result) // undefined, figure out how to use result data and move dispatches from network.ts
                    setSubmitLoading(false)
                })
            }
        }
    }
    
    return (
        <div>
            <h1>Velg fordeling</h1>
            {!submitLoading ? 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {isLoading && <p>Laster inn...</p>}
                        {error && <p>Noe gikk galt</p>}
                        {data?.data.content.map((org: any) => setupOrganizationInput(org))}
                    </div>
                    <Collapse in={percentageErrorAnimation}>
                        <p>Du har fordelt {getTotalPercentage().totalPercentage} / 100%</p>
                    </Collapse>
                    <NextButton disabled={nextDisabled}>
                        Neste
                    </NextButton>
                </form>
                :  
                <p>Laster...</p> // TODO: Add animation here
            }
        </div>
    );
}