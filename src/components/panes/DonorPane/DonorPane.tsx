import React from 'react';
import { PaneContainer } from '../panes.style'
import { DonorForm, IDonor} from './DonorForm'

export default function DonorPane() {

    const submitDonor = (values: IDonor) => {
        console.log(values)
    }

    return (
        <PaneContainer>
            <h1>Om deg</h1>
            <DonorForm onSubmit={submitDonor}/>
        </PaneContainer>
    );
}