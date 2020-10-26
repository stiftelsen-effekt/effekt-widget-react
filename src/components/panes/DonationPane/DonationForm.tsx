import React from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { State, PaymentMethod } from '../../../store/state'
import { Form } from '../panes.style'

export interface FormInputs {
    recurring: string;
    customShare: string;
    sum: number;
}
  
const DonationFormComponent: React.FC<InjectedFormProps<FormInputs>> = (props) => {
    const { handleSubmit } = props;
    const currentPaymentMethod = useSelector((state: State) => state.donation.method)

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {(currentPaymentMethod === PaymentMethod.PAYPAL || currentPaymentMethod === PaymentMethod.VIPPS) && 
                    <Field name="sum" component="input" type="tel" placeholder="0" />
                }
                {currentPaymentMethod === PaymentMethod.PAYPAL &&
                    <div>
                        <div>
                            <Field name="recurring" component="input" type="radio" value="true" />Jeg vil gi en månedlig donasjon
                        </div>
                        <div>
                            <Field name="recurring" component="input" type="radio" value="false" />Jeg vil gi en engangsdonasjon
                        </div>
                        <br />
                    </div>
                }
                <div>
                    <Field name="customShare" component="input" type="radio" value="false" />Bruk vår anbefalte fordeling
                </div>
                <div>
                    <Field name="customShare" component="input" type="radio" value="true" />Jeg vil velge fordeling selv
                </div>
                <button type="submit" >Submit</button>
            </Form>
        </div>
    )
}

export const DonationForm = reduxForm<FormInputs>({
    form: 'donationForm',
  })(DonationFormComponent);