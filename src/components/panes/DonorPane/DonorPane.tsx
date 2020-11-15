import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PaneContainer, PaneTitle, OrangeLink } from '../Panes.style'
import { DonorInput } from '../../../store/state'
import { submitDonorInfo } from '../../../store/donation/actions'
import { TextFieldWrapper, TextField, CheckBoxFont, CheckBox } from '../Forms.style'
import { useForm } from "react-hook-form"
import Validate from 'validator'
import { TaxTooltip } from './TaxTooltip'
import { Collapse } from '@material-ui/core'
import ErrorField from '../shared/ErrorField'

interface DonorFormValues extends DonorInput {
    privacyPolicy: boolean;
}

export default function DonorPane() {
    const dispatch = useDispatch()
    const { register, watch, errors, handleSubmit } = useForm<DonorFormValues>()
    const watchAllFields = watch()

    function updateDonorValues(values: any) {
        dispatch(submitDonorInfo(
            values.name ? values.name : "", 
            values.email ? values.email : "", 
            values.taxDeduction ? values.taxDeduction : false,
            values.ssn ? values.snn : "", 
            values.newsletter ? values.newsletter : false
        ))

    }

    useEffect(() => {
        console.log(errors)
        updateDonorValues(watchAllFields)
    }, [watchAllFields])

    const onSubmit = (data: any) => console.log(data)

    return (
        <PaneContainer>
            <PaneTitle>Om deg</PaneTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextFieldWrapper>
                    <TextField name="name" type="text" placeholder="Navn" ref={register({ required: true, minLength: 3})} />
                    {errors.name && <ErrorField text="Ugyldig navn"/>}
                    <TextField name="email" type="text" placeholder="Epost" ref={register({ required: true, validate: val => Validate.isEmail(val)})} />
                    {errors.email && <ErrorField text="Ugyldig epost" />}
                </TextFieldWrapper>
                <div>
                    <CheckBox name="taxDeduction" type="checkbox" ref={register} />
                    <CheckBoxFont>Jeg ønsker skattefradrag</CheckBoxFont>
                    <TaxTooltip />
                    <Collapse in={watchAllFields.taxDeduction}>
                        <TextFieldWrapper>
                            <TextField name="ssn" type="text" placeholder="Personnummer" ref={register({ required: true, maxLength: 11, minLength: 11})} />
                            {errors.ssn && <ErrorField text="Ugyldig personnummer"/>}
                        </TextFieldWrapper>
                    </Collapse>
                </div>
                <div>
                    <CheckBox name="privacyPolicy" type="checkbox" ref={register({ required: true, validate: val => val})} />
                    <CheckBoxFont>Jeg godtar </CheckBoxFont>
                    <OrangeLink target="_blank" rel="noopener noreferrer" href="https://gieffektivt.no/samarbeid-drift#personvern">personvernerklæringen</OrangeLink>
                    {errors.privacyPolicy && <ErrorField text='Du må godta personvernerklæringen'/>}
                </div>
                <div>
                    <CheckBox name="newsletter" type="checkbox" ref={register} /><CheckBoxFont>Jeg ønsker å melde meg på nyhetsbrevet</CheckBoxFont>
                </div>
                <button type="submit">Submit</button>
            </form>
            
        </PaneContainer>
    );
}