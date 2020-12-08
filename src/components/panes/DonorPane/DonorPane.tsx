import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { OrangeLink, Pane } from '../Panes.style'
import { DonorInput } from '../../../store/state'
import { submitDonorInfo } from '../../../store/donation/actions'
import { InputFieldWrapper, TextField, InputLabel, CheckBox } from '../Forms.style'
import { useForm } from "react-hook-form"
import Validate from 'validator'
import { Collapse } from '@material-ui/core'
import ErrorField from '../../shared/Error/ErrorField'
import { nextPane } from '../../../store/layout/actions'

import { ToolTip } from '../../shared/ToolTip/ToolTip'
import { DonorForm } from './DonorPane.style'
import { RichSelect } from '../../shared/RichSelect/RichSelect'
import { DonorType } from '../../../types/Temp'
import { RichSelectOption } from '../../shared/RichSelect/RichSelectOption'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'

interface DonorFormValues extends DonorInput {
    privacyPolicy: boolean;
}

const tooltipText = "Vi trenger ditt fødselsnummer for å rapportere skattefradrag til Skatteetaten for at du skal få skattefradrag for donasjonen din."
const tooltipLink = "https://gieffektivt.no/skattefradrag"
const anonymousDonorObject: DonorFormValues = {
    name: 'Anonym Giver',
    email: 'anon@gieffektivt.no',
    taxDeduction: false,
    ssn: 12345678910,
    newsletter: false,
    privacyPolicy: true
}

export const DonorPane: React.FC = () => {
    const dispatch = useDispatch()
    const [ nextDisabled, setNextDisabled ] = useState(true)
    const [ nameErrorAnimation, setNameErrorAnimation ] = useState(false)
    const [ emailErrorAnimation, setEmailErrorAnimation ] = useState(false)
    const [ ssnErrorAnimation, setSsnErrorAnimation ] = useState(false)
    const [ donorType, setDonorType ] = useState(DonorType.DONOR)
    const [ privacyPolicyErrorAnimation, setPrivacyPolicyErrorAnimation ] = useState(false)
    const { register, watch, errors, handleSubmit } = useForm<DonorFormValues>()
    const watchAllFields = watch()

    useEffect(() => {
        errors.name ? setNameErrorAnimation(true) : setNameErrorAnimation(false)
        errors.email ? setEmailErrorAnimation(true) : setEmailErrorAnimation(false)
        errors.ssn ? setSsnErrorAnimation(true) : setSsnErrorAnimation(false)
        errors.privacyPolicy ? setPrivacyPolicyErrorAnimation(true) : setPrivacyPolicyErrorAnimation(false)

        if (Object.keys(errors).length === 0) {
            setNextDisabled(false)
        }
        else if (Object.keys(errors).length === 1) {
            if (errors.ssn && watchAllFields.taxDeduction === true) {
                setNextDisabled(true)
            }
            else if (errors.ssn && watchAllFields.taxDeduction === false) {
                setNextDisabled(false)
            }
        }
        else {
            setNextDisabled(true)
        }

        let values = donorType ? anonymousDonorObject : watchAllFields;
        dispatch(submitDonorInfo(
            values.name ? values.name : "", 
            values.email ? values.email : "", 
            values.taxDeduction ? values.taxDeduction : false,
            values.ssn ? values.ssn : 1, 
            values.newsletter ? values.newsletter : false
        ))
    }, [donorType, dispatch, errors, watchAllFields])

    function paneSubmitted(e: FormEvent) {
        e.preventDefault();

        if (donorType === DonorType.ANONYMOUS) {
            dispatch(nextPane())
        } else {
            handleSubmit(() => {
                if (!nextDisabled) {
                    dispatch(nextPane())
                }
            })
        }
    }

    return (
        <Pane>
            <DonorForm onSubmit={paneSubmitted}>
                <RichSelect selected={donorType} onChange={(type: DonorType) => setDonorType(type)}>
                    <RichSelectOption
                        label={"Info om deg"}
                        value={DonorType.DONOR}>
                        
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
                                <ToolTip text={tooltipText} link={tooltipLink} />
                                <Collapse in={watchAllFields.taxDeduction}>
                                    <InputFieldWrapper>
                                        <Collapse in={ssnErrorAnimation}>
                                            <ErrorField text="Ugyldig personnummer"/>
                                        </Collapse>
                                        <TextField name="ssn" type="tel" placeholder="Personnummer" 
                                            ref={register({ required: false, validate: val => watchAllFields.taxDeduction === false || (Validate.isInt(val) && Validate.isLength(val, {min:9, max: 11}))})} 
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
                    </RichSelectOption>
                    
                    <RichSelectOption
                        label={"Doner anonymt"}
                        value={DonorType.ANONYMOUS}></RichSelectOption>
                </RichSelect>
                <NextButton type={"submit"}>Neste</NextButton>
            </DonorForm>
        </Pane>
    );
}
