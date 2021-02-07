import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { BoldTitle, Pane, PaneContainer, UnderTitle } from "../../Panes.style";
import { InfoText } from "../PaymentPane.style";
import { RoundedBorder, TextWrapper, HorizontalLine } from "./ResultPane.style";

export const ResultPane: React.FC = () => {
  const donorEmail = useSelector((state: State) => state.donation.donor?.email);
  const kid = useSelector((state: State) => state.donation.kid);

  return (
    <Pane>
      <PaneContainer>
        <BoldTitle>Tusen takk!</BoldTitle>
        <UnderTitle>Du kan nå overføre til oss</UnderTitle>
        <RoundedBorder>
          <TextWrapper>
            <b>Kontonr</b>
            <span>1506 29 95960</span>
          </TextWrapper>
          <HorizontalLine />
          <TextWrapper>
            <b>KID</b>
            <span>{kid}</span>
          </TextWrapper>
        </RoundedBorder>
        {donorEmail !== "anon@gieffektivt.no" ? (
          <InfoText>{`Vi har også sendt en mail til ${donorEmail} med informasjon om din donasjon. Sjekk søppelpost-mappen om du ikke har motatt eposten i løpet av noen timer.`}</InfoText>
        ) : (
          <InfoText>
            {`Hvis du ønsker å donere med samme fordeling senere kan du bruke samme KID-nummer igjen. Dersom du har noen spørsmål eller tilbakemeldinger kan du alltid ta kontakt med oss ved å sende en mail til `}
            <a href="mailto:donasjon@gieffektivt.no">donasjon@gieffektivt.no</a>
          </InfoText>
        )}
      </PaneContainer>
    </Pane>
  );
};
