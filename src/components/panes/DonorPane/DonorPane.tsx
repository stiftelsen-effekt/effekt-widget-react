import React from 'react'
import { useDispatch } from 'react-redux'
import { PaneContainer } from '../panes.style'
import { DonorForm } from './DonorForm'
import { DonorInput } from '../../../store/state'
import { submitDonorInfo } from '../../../store/donation/actions'

export default function DonorPane() {
    const dispatch = useDispatch()

    //Todo: store form data in state
    const submitDonor = (values: DonorInput) => {
        //submitDonorInfo()
    }

    return (
        <PaneContainer>
            <h1>Om deg</h1>
            <DonorForm onSubmit={submitDonor}/>
        </PaneContainer>
    );
}