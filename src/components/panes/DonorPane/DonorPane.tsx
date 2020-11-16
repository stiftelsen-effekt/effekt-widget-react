import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PaneContainer, PaneTitle, OrangeLink, NavigationWrapper } from '../Panes.style'
import { DonorInput } from '../../../store/state'
import { submitDonorInfo } from '../../../store/donation/actions'
import { TextFieldWrapper, TextField, CheckBoxFont, CheckBox } from '../Forms.style'
import { useForm } from "react-hook-form"
import Validate from 'validator'
import { TaxTooltip } from './TaxTooltip'
import { Collapse } from '@material-ui/core'
import ErrorField from '../shared/ErrorField'
import { NextButton, PrevButton, SkipButton } from '../shared/NavigationButtons'
import { ButtonBack } from 'pure-react-carousel'
import { on } from 'cluster'

interface DonorFormValues extends DonorInput {
    privacyPolicy: boolean;
}

export default function DonorPane() {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(true)
    const { register, watch, errors, handleSubmit } = useForm<DonorFormValues>({mode: 'onBlur', reValidateMode: 'onChange'})
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
        if (Object.keys(errors).length === 0) {
            setNextDisabled(false)
        }
        else {
            setNextDisabled(true)
        }
        updateDonorValues(watchAllFields)
    }, [watchAllFields])


    return (
        <PaneContainer>
            <PaneTitle>Om deg</PaneTitle>
                <TextFieldWrapper>
                    {errors.name && <ErrorField text="Ugyldig navn"/>}
                    <TextField name="name" type="text" placeholder="Navn" ref={register({ required: true, minLength: 3})} />
                    {errors.email && <ErrorField text="Ugyldig epost" />}
                    <TextField name="email" type="text" placeholder="Epost" ref={register({ required: true, validate: val => Validate.isEmail(val)})} />
                </TextFieldWrapper>
                <div>
                    <div>
                        <CheckBox name="taxDeduction" type="checkbox" ref={register} />
                        <CheckBoxFont>Jeg ønsker skattefradrag</CheckBoxFont>
                        <TaxTooltip />
                        <Collapse in={watchAllFields.taxDeduction}>
                            <TextFieldWrapper>
                                {errors.ssn && <ErrorField text="Ugyldig personnummer"/>}
                                <TextField name="ssn" type="tel" placeholder="Personnummer" ref={register({ required: true, maxLength: 11, minLength: 11, pattern: /[0-9]/})} />
                            </TextFieldWrapper>
                        </Collapse>
                    </div>
                    <div>
                        {errors.privacyPolicy && <ErrorField text='Du må godta personvernerklæringen'/>}
                        <CheckBox name="privacyPolicy" type="checkbox" ref={register({ required: true, validate: val => val})} />
                        <CheckBoxFont>Jeg godtar </CheckBoxFont>
                        <OrangeLink target="_blank" rel="noopener noreferrer" href="https://gieffektivt.no/samarbeid-drift#personvern">personvernerklæringen</OrangeLink>
                    </div>
                    <div>
                        <CheckBox name="newsletter" type="checkbox" ref={register} /><CheckBoxFont>Jeg ønsker å melde meg på nyhetsbrevet</CheckBoxFont>
                    </div>
                </div>
                <NavigationWrapper>
                    <PrevButton />
                    <NextButton disabled={nextDisabled} />
                </NavigationWrapper>
                <SkipButton />
        </PaneContainer>
    );
}