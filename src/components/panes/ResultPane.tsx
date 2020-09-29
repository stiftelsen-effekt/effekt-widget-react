import React from 'react';
import { PaneProps } from './PaneProps';
import './Pane.css'

export default function ReferralPane(props: PaneProps) {

    const widgetState = props.widget.state

    function showResult() {
        switch (widgetState.method) {
            case "Bank":
                return (
                    <div>
                        <h1>Takk!</h1>
                        <img src="https://storage.googleapis.com/effekt-widget/assets/heart.svg" alt="Thank you heart <3"></img>
                        <p>Du kan nå overføre til oss</p>
                    </div>
                )
            case "PayPal":
                return (
                    <div>
                        <h1>Takk!</h1>
                        <img src="https://storage.googleapis.com/effekt-widget/assets/heart.svg" alt="Thank you heart <3"></img>
                        <p>Vi har nå mottatt din donasjon! Vi har også sendt en kvittering til philip@testeffekt.no med mer informasjon. Sjekk søppelpost-mappen om du ikke har mottatt eposten i løpet av noen timer.</p>
                    </div>
                )

            case "Vipps":
                return (
                    <h1>Betal nå med Vipps</h1>
                )
        }
    }

    return (
        <div className="pane">
            {showResult()}
        </div>
    );
}