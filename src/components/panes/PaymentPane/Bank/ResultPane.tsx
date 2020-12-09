import React from 'react';
import { useSelector } from 'react-redux';
import { PaymentMethod, State } from '../../../../store/state';
import { Pane, PaneContainer, PaneTitle } from '../../Panes.style';
import { BlackContainer, BoldWhiteText, Heart, ResultWrapper, WhiteText, TextWrapper, InfoText } from './ResultPane.style';

export const ResultPane = () => {
    const currentMethod = useSelector((state: State) => state.donation.method)
    const donorEmail = useSelector((state: State) => state.donation.donor?.email)
    const kid = useSelector((state: State) => state.donation.kid)

    return (
        <Pane>
            <PaneContainer>
                {(currentMethod === PaymentMethod.BANK) && 
                    <ResultWrapper>
                        <PaneTitle>Takk!</PaneTitle>
                        <Heart src="https://storage.googleapis.com/effekt-widget/assets/heart.svg" alt="Takk for din donasjon" />
                        <p>Du kan nå overføre til oss</p>
                        <BlackContainer>
                            <TextWrapper>
                                <BoldWhiteText>Kontonr</BoldWhiteText><WhiteText>1506 29 95960</WhiteText>
                            </TextWrapper>
                            <TextWrapper>
                            <BoldWhiteText>KID</BoldWhiteText><WhiteText>{kid}</WhiteText>
                            </TextWrapper>
                        </BlackContainer>
                        {donorEmail !== "anon@gieffektivt.no" && 
                        <InfoText>Vi har også sendt en mail til {donorEmail} med informasjon om din donasjon. Sjekk søppelpost-mappen om du ikke har motatt eposten i løpet av noen timer.</InfoText>
                        }       
                    </ResultWrapper>
                }
                {(currentMethod === PaymentMethod.PAYPAL) && 
                    <ResultWrapper>
                        <PaneTitle>Takk!</PaneTitle>
                        <Heart src="https://storage.googleapis.com/effekt-widget/assets/heart.svg" alt="Takk for din donasjon" />
                        <InfoText>Vi har nå mottatt din donasjon!</InfoText>
                        {(donorEmail !== "anon@gieffektivt.no") &&
                            <InfoText>Vi har også sendt en kvittering til {donorEmail} med mer informasjon. Sjekk søppelpost-mappen om du ikke har mottatt eposten i løpet av noen timer.</InfoText>
                        }
                    </ResultWrapper>
                }
                {(currentMethod === PaymentMethod.VIPPS) &&
                     <ResultWrapper>
                        <PaneTitle>Takk!</PaneTitle>
                        <Heart src="https://storage.googleapis.com/effekt-widget/assets/heart.svg" alt="Takk for din donasjon" />
                        <InfoText>Vi håper å straks motta din donasjon via Vipps!</InfoText>
                    </ResultWrapper>
                }
            </PaneContainer>
        </Pane>
    );
}