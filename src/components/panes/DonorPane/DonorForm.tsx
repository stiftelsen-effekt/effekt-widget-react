import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { DonorInput } from '../../../store/state'
import { Form } from '../panes.style'
  
class DonorFormComponent extends React.Component<InjectedFormProps<DonorInput>> {
    render() {
        const { pristine, submitting, handleSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Field name="donorName" component="input" type="text" placeholder="Navn" />
                <Field name="email" component="input" type="email" placeholder="Epost" />
                <div>
                    <Field name="tax-deduction" component="input" type="checkbox" />Jeg ønsker skattefradrag
                </div>
                <div>
                    <Field name="privacy-policy" component="input" type="checkbox" />Jeg godtar <a href="https://gieffektivt.no/samarbeid-drift#personvern">personvernerklæringen</a>*
                </div>
                <div>
                    <Field name="newsletter" component="input" type="checkbox" />Jeg ønsker å melde meg på nyhetsbrevet
                </div>
                <button type="submit" disabled={pristine || submitting} >Submit</button>
            </Form>
        )
    }
}

export const DonorForm = reduxForm<DonorInput>({
    form: 'donorForm',
  })(DonorFormComponent);