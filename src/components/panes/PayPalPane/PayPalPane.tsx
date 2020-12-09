import { Collapse } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaneNumber } from '../../../store/layout/actions';
import { PaneNumber, PaymentMethod, State } from '../../../store/state';
import { InputFieldWrapper } from '../Forms.style';
import { LoadingIcon, NavigationWrapper, Pane, PaneContainer, PaneTitle, UnderTitle } from '../Panes.style';
import DonationInfoBar from '../shared/DonationInfoBar/DonationInfoBar';
import { PayPalFormWrapper, OrangeSubmit } from './PayPalPane.style';

//TODO: Recurring donation does not return message after paying and subscribing in PayPal (does not work in production with the old widget either)

export default function ReferralPane() {
    const isRecurring = useSelector((state: State) => state.donation.recurring)
    const donationAmount = useSelector((state: State) => state.donation.sum)
    const donationKID = useSelector((state: State) => state.donation.kid)
    const [payPalLoading, setPayPalLoading ] = useState(false)
    const [payPalError, setPayPalError ] = useState(false)
    const [webSocketID, setWebSocketID ] = useState()
    const dispatch = useDispatch()

    // Opens up a WebSocket that listens for a response from PayPal with status of payment
    useEffect(() => {
        const socket = new WebSocket("wss://api.gieffektivt.no")
        socket.onmessage = function (event) {
            setWebSocketID(event.data)
            if (event.data === "PAYPAL_VERIFIED") {
                dispatch(setPaneNumber(PaneNumber.ResultPane))
            }
            else if (event.data === "PAYPAL_ERROR") {
                setPayPalError(true)
            }
        }
    }, [])
    
    return (
        <Pane>
            <PaneContainer>
                <DonationInfoBar />
                <PaneTitle>Gå til PayPal</PaneTitle>
                {(!isRecurring && !payPalLoading) &&
                    <PayPalFormWrapper>
                        <UnderTitle>Engangsdonasjon</UnderTitle>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                            <input type="hidden" name="cmd" value="_donations" />
                            <input type="hidden" name="charset" value="UTF-8" />
                            <input type="hidden" name="currency_code" value="NOK" />
                            <input type="hidden" name="amount" value={donationAmount} />
                            <input type="hidden" name="business" value="donasjon@gieffektivt.no" />
                            <input type="hidden" name="item_name" value="Donasjon" />
                            <input type="hidden" name="notify_url" value="https://api.gieffektivt.no/paypal/ipn" />
                            <input type="hidden" name="custom" value={donationKID + "|" + webSocketID} />
                            <input type="submit" id="single-paypal-submit" style={{display: "none"}} />

                            <OrangeSubmit type="button" value="Betal nå" onClick={() => {
                                document.getElementById("single-paypal-submit")?.click()
                                setPayPalLoading(true)
                            }} />
                        </form>
                    </PayPalFormWrapper>
                }
                {(isRecurring && !payPalLoading) &&
                    <PayPalFormWrapper>
                        <UnderTitle>Månedlig donasjon</UnderTitle>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                            <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                            <input type="hidden" name="charset" value="UTF-8" />
                            <input type="hidden" name="currency_code" value="NOK" />
                            <input type="hidden" name="business" value="donasjon@gieffektivt.no" />
                            <input type="hidden" name="item_name" value="Månedlig donasjon til Stiftelsen Effekt" />
                            <input type="hidden" name="notify_url" value="https://api.gieffektivt.no/paypal/ipn" />
                            <input type="hidden" name="custom" value={donationKID + "|" + webSocketID} />
                            <input type="hidden" name="a3" value={donationAmount} />
                            <input type="hidden" name="p3" value="1" />
                            <input type="hidden" name="t3" value="M" />
                            <input type="hidden" name="src" value="1" />
                            <input type="hidden" name="srt" value="24" />
                            <input type="hidden" name="no_note" value="1" />
                            <input type="submit" id="recurring-paypal-submit" style={{display: "none"}} />
                            
                            <OrangeSubmit type="button" value="Abonner nå" onClick={() => {
                                document.getElementById("recurring-paypal-submit")?.click()
                                setPayPalLoading(true)
                            }} />
                        </form>
                    </PayPalFormWrapper>
                }
                {payPalLoading &&
                    <PayPalFormWrapper>
                        <LoadingIcon src="https://storage.googleapis.com/effekt-widget/assets/loading.svg" />
                        <p>Venter på bekreftelse på innbetaling fra paypal</p>
                    </PayPalFormWrapper>
                }
                <Collapse in={payPalError}>
                    <strong>Det skjedde en feil i PayPal</strong>
                </Collapse>
            </PaneContainer>
        </Pane>
    )
}