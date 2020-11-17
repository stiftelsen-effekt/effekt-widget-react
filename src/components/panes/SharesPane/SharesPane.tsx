import React, { useEffect, useState } from 'react'
import { getOrganizationsURL } from '../../helpers/network'
import { Organization } from './../../interfaces/Organization'
import { useForm } from 'react-hook-form'
import { setShares } from './../../../store/donation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../../store/state'
import { HorizontalLine, NavigationWrapper, PaneContainer, PaneTitle, VerticalLine } from '../Panes.style'
import { OrganizationName, PercentageText, SharesWrapper, ShareWrapper, SmallTextField } from './SharesPane.style'
import DonorNameBar from '../shared/DonorNameBar'
import { NextButton, PrevButton } from '../shared/NavigationButtons'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Collapse } from '@material-ui/core'
import ErrorField from '../shared/ErrorField'

interface PercentageState {
    isVisible: boolean;
    totalPercentage: number;
}

export default function SharesPane() {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(false)
    const [ totalPercentageState, setTotalPercentageState ] = useState<PercentageState>({isVisible: false, totalPercentage: 100})
    const [ percentageErrorAnimation, setPercentageErrorAnimation ] = useState(false)
    const shareState = useSelector((state: State) => state.donation.shares)
    const { register, watch, handleSubmit, setValue } = useForm({mode: 'all'})
    const watchAllFields = watch()
    const {isLoading, error, data } = useQuery("getOrganizations", () => 
        axios(getOrganizationsURL)
    )

    function getTotalPercentage() {
        let totalPercentage: number = 0
        for (const property in watchAllFields) {
            const share = watchAllFields[property]

            if (share !== "") {
                totalPercentage += parseInt(watchAllFields[property])
            }

            // Replaces zero string with placeholder zero
            if (share === "0") {
                setValue(property, "")
            } 
        }
        return totalPercentage
    }

    function setupOrganizationInput(org: Organization) {
        return (
            <ShareWrapper key={org.id}> 
                <OrganizationName>{org.name}</OrganizationName>
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
        //TODO: Fix percentage state
        const total = getTotalPercentage()
        if (total === 100) {
            //setTotalPercentageState({isVisible: true, totalPercentage: 100})
            setNextDisabled(false)
            setPercentageErrorAnimation(false)
        } 
        else if (data) {
             //setTotalPercentageState({isVisible: false, totalPercentage: total})
             setNextDisabled(true)
             setPercentageErrorAnimation(true)
         }
        //dispatch(setShares(watchAllFields))
    }, [watchAllFields])

    function onSubmit() {
        //TODO: Remove when new carousel
        document.getElementById("buttonNext")?.click()
        dispatch(setShares(watchAllFields))
    }
    
    return (
        <PaneContainer>
            <DonorNameBar />
            <PaneTitle>Velg fordeling</PaneTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SharesWrapper>
                    {isLoading && <p>Laster inn...</p>}
                    {error && <p>Noe gikk galt</p>}
                    {data?.data.content.map((org: any) => setupOrganizationInput(org))}
                </SharesWrapper>
                <HorizontalLine />
                <NavigationWrapper>
                    <PrevButton />
                    <VerticalLine />
                    <NextButton isDisabled={nextDisabled} />
                </NavigationWrapper>
            </form>
            <Collapse in={percentageErrorAnimation}>
                <ErrorField text="Ugyldig fordeling"/>
            </Collapse>
            <p>{totalPercentageState.totalPercentage}</p>
        </PaneContainer>
    );
}