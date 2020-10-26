import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Form } from '../panes.style'

export interface IDonor {
    name: string;
    email: string;
    taxDeduction: boolean;
    privacyPolicy: boolean;
    newsletter: boolean;
}
  
  class DonorFormComponent extends React.Component<InjectedFormProps<IDonor>> {
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

export const DonorForm = reduxForm<IDonor>({
    form: 'donorForm',
  })(DonorFormComponent);