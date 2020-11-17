import React, { useEffect, useState } from 'react';
import { getOrganizations } from '../../helpers/network'
import { Organization } from './../../interfaces/Organization'
import { useForm } from 'react-hook-form';
import { setShares } from './../../../store/donation/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Share, State } from '../../../store/state';
import { NavigationWrapper, PaneContainer, PaneTitle, VerticalLine } from '../Panes.style';
import { InputLabel } from '../Forms.style';
import { OrganizationName, PercentageText, SharesWrapper, ShareWrapper, SmallTextField } from './SharesPane.style';
import DonorNameBar from '../shared/DonorNameBar';
import { NextButton, PrevButton } from '../shared/NavigationButtons';

export default function SharesPane() {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(false)
    const { register, watch, errors, handleSubmit, setValue } = useForm<Array<Share>>({mode: 'all'})
    const [ organizations, setOrganizations ] = useState<Array<Organization>>()
    const [ sharesList, setSharesList ] = useState<Array<JSX.Element>>([])
    const [ totalPercentage, setTotalPercentage ] = useState(0)
    const shareState = useSelector((state: State) => state.donation.shares)
    const watchAllFields = watch()

    useEffect(() => {
        getOrganizations().then(res => {
            let newShareState = [...sharesList]
            let initalReduxState = {}
            res.forEach((org: Organization) => {
                newShareState.push(
                    <ShareWrapper key={org.id}> 
                        <OrganizationName>{org.name}</OrganizationName>
                        <SmallTextField 
                            type="number" 
                            inputMode="decimal" 
                            placeholder="0"
                            name={org.id.toString()}
                            defaultValue={org.standardShare ? org.standardShare : ""}
                            ref={register} 
                        />
                        <PercentageText>%</PercentageText>
                    </ShareWrapper>
                )
            })
            setSharesList(newShareState)
            console.log(newShareState)
            //dispatch(setShares())
        })
    }, [])


    useEffect(() => {
        console.log(watchAllFields)
        //dispatch(setShares(watchAllFields))
    }, [watchAllFields])

    // function handleShare(e: React.FormEvent<HTMLInputElement>, orgName: string) {
    //     let newShares: Share[] = [...widgetState.shares]

    //     const orgShare: Share | undefined = newShares.find(share => share.full_name === orgName)
        
    //     if (orgShare !== undefined) {
    //         const isChangedOrg = (org: Share) => org === orgShare;
    //         const value = e.currentTarget.value 
    //         newShares[newShares.findIndex(isChangedOrg)].share = parseInt(value)
 
    //         widgetState.setShares(newShares)
    //     }

    //     let newPercentage: number = 0
    //     widgetState.shares.forEach(org => {
    //         newPercentage += (isNaN(org.share) ? 0 : org.share)
    //     })
    //     setTotalPercentage(newPercentage)
    // }

    function PercentageDisplay() {
        return (
        <div>Du har fordelt {totalPercentage} av 100%</div>
        )
    }
    
    return (
        <PaneContainer>
            <DonorNameBar />
            <PaneTitle>Velg fordeling</PaneTitle>
            <form>
                <SharesWrapper>
                    {sharesList.map(share => share)}
                </SharesWrapper>
            </form>
            <PercentageDisplay />
            <NavigationWrapper>
                <PrevButton />
                <VerticalLine />
                <NextButton isDisabled={nextDisabled} />
            </NavigationWrapper>
        </PaneContainer>
    );
}