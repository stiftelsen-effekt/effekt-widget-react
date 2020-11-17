import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PaneContainer, PaneTitle, OrangeLink, NavigationWrapper, HorizontalLine } from '../Panes.style'
import { DonorInput } from '../../../store/state'
import { submitDonorInfo } from '../../../store/donation/actions'
import { InputFieldWrapper, TextField, InputLabel, CheckBox } from '../Forms.style'
import { useForm } from "react-hook-form"
import Validate from 'validator'
import { TaxTooltip } from './TaxTooltip'
import { Collapse } from '@material-ui/core'
import ErrorField from '../shared/ErrorField'
import { NextButton, PrevButton, SkipButton } from '../shared/NavigationButtons'

interface DonorFormValues extends DonorInput {
    privacyPolicy: boolean;
}

export default function DonorPane() {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(true)
    const [ nameErrorAnimation, setNameErrorAnimation ] = useState(false)
    const [ emailErrorAnimation, setEmailErrorAnimation ] = useState(false)
    const [ ssnErrorAnimation, setSsnErrorAnimation ] = useState(false)
    const [ privacyPolicyErrorAnimation, setPrivacyPolicyErrorAnimation ] = useState(false)
    const { register, watch, errors, handleSubmit } = useForm<DonorFormValues>({mode: 'all', reValidateMode: 'onBlur'})
    const watchAllFields = watch()

    function updateDonorState(values: any) {
        dispatch(submitDonorInfo(
            values.name ? values.name : "", 
            values.email ? values.email : "", 
            values.taxDeduction ? values.taxDeduction : false,
            values.ssn ? values.snn : "", 
            values.newsletter ? values.newsletter : false
        ))
    }

    function setAnonymousDonor() {
        updateDonorState({
            name: 'Anonym Giver',
            email: 'anon@gieffektivt.no',
            taxDeduction: false,
            ssn: "",
            newsletter: false
            }
        )
    }

    function onSubmit() {
        //TODO: Replace when new carousel
        if (Object.keys(errors).length === 0) {
            document.getElementById("buttonNext")?.click()
        }
        if (watchAllFields.name !== undefined) {
            updateDonorState(watchAllFields)
        }
        else {
            setAnonymousDonor()
        }
    }

    useEffect(() => {
        errors.name ? setNameErrorAnimation(true) : setNameErrorAnimation(false)
        errors.email ? setEmailErrorAnimation(true) : setEmailErrorAnimation(false)
        errors.ssn ? setSsnErrorAnimation(true) : setSsnErrorAnimation(false)
        errors.privacyPolicy ? setPrivacyPolicyErrorAnimation(true) : setPrivacyPolicyErrorAnimation(false)

        if (Object.keys(errors).length === 0) {
            setNextDisabled(false)
        }
        else {
            setNextDisabled(true)
        }
        updateDonorState(watchAllFields)
    }, [watchAllFields])

    return (
        <PaneContainer>
            <PaneTitle>Om deg</PaneTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputFieldWrapper>
                    <Collapse in={nameErrorAnimation}>
                        <ErrorField text="Ugyldig navn"/>
                    </Collapse>
                    <TextField name="name" type="text" placeholder="Navn" ref={register({ required: true, minLength: 3})} />
                    <Collapse in={emailErrorAnimation}>
                        <ErrorField text="Ugyldig epost"/>
                    </Collapse>
                    <TextField name="email" type="text" placeholder="Epost" ref={register({ required: true, validate: val => Validate.isEmail(val)})} />
                </InputFieldWrapper>
                <div>
                    <div>
                        <CheckBox name="taxDeduction" type="checkbox" ref={register} />
                        <InputLabel>Jeg ønsker skattefradrag</InputLabel>
                        <TaxTooltip />
                        <Collapse in={watchAllFields.taxDeduction}>
                            <InputFieldWrapper>
                                <Collapse in={ssnErrorAnimation}>
                                    <ErrorField text="Ugyldig personnummer"/>
                                </Collapse>
                                <TextField name="ssn" type="tel" placeholder="Personnummer" 
                                    ref={register({ validate: val => !watchAllFields.taxDeduction || (Validate.isInt(val) && Validate.isLength(val, {min:11, max: 11}))})} 
                                />
                            </InputFieldWrapper>
                        </Collapse>
                    </div>
                    <div>
                        {privacyPolicyErrorAnimation}
                        <Collapse in={privacyPolicyErrorAnimation}>
                            <ErrorField text="Du må godta personvernerklæringen"/>
                        </Collapse>
                        <CheckBox name="privacyPolicy" type="checkbox" ref={register({ required: true })} />
                        <InputLabel>Jeg godtar </InputLabel>
                        <OrangeLink target="_blank" rel="noopener noreferrer" href="https://gieffektivt.no/samarbeid-drift#personvern">personvernerklæringen</OrangeLink>
                    </div>
                    <div>
                        <CheckBox name="newsletter" type="checkbox" ref={register} /><InputLabel>Jeg ønsker å melde meg på nyhetsbrevet</InputLabel>
                    </div>
                </div>
            <HorizontalLine />
            <NavigationWrapper>
                <PrevButton />
                <SkipButton onClick={setAnonymousDonor} />
                <NextButton isDisabled={nextDisabled} />
            </NavigationWrapper>
            </form>
        </PaneContainer>
    );
}