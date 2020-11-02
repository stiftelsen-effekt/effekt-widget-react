import React, { useState } from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { DonorInput } from '../../../store/state'
import { Form } from '../panes.style'

const DonorFormComponent: React.FC<InjectedFormProps<DonorInput>> = (props) => {
    const [showSSN, setShowSSN] = useState(false)

    const {pristine, submitting, handleSubmit } = props;
    return (
        <Form onSubmit={handleSubmit}>
            <Field name="name" component="input" type="text" placeholder="Navn" />
            <Field name="email" component="input" type="email" placeholder="Epost" />
            <div>
                <Field name="taxDeduction" component="input" type="checkbox" onClick={() => setShowSSN(!showSSN)} />Jeg ønsker skattefradrag
                {showSSN &&
                    <Field name="ssn" component="input" type="text" placeholder="Personnummer" />
                }
            </div>
            <div>
                <Field name="privacyPolicy" component="input" type="checkbox" />Jeg godtar <a href="https://gieffektivt.no/samarbeid-drift#personvern">personvernerklæringen</a>*
            </div>
            <div>
                <Field name="newsletter" component="input" type="checkbox" />Jeg ønsker å melde meg på nyhetsbrevet
            </div>
            <button type="submit" disabled={pristine || submitting} >Submit</button>
        </Form>
    )
}

export let DonorForm = reduxForm<DonorInput>({
    form: 'donorForm',
})(DonorFormComponent);