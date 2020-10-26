import React from 'react';
import { useDispatch } from 'react-redux';
import { DonationForm, FormInputs } from './DonationForm'
import { setSum, setRecurring } from '../../../store/donation/actions'
import { selectCustomShare } from '../../../store/layout/actions'

export default function DonationPane() {
    const dispatch = useDispatch()

    function submitDonation(values: FormInputs) {
        dispatch(setSum(values.sum))
        dispatch(setRecurring(values.recurring === "true"))
        dispatch(selectCustomShare(values.customShare === "true"))
    }
    
    return (
        <div>
            <h1>Om donasjonen</h1>
            <DonationForm onSubmit={submitDonation}/>
        </div>
    );
}