import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { NextButton } from "../../../shared/Buttons/NavigationButtons.style";
import { OrangeLink } from "../../../Widget.style";
import { Pane, PaneContainer, PaneTitle, UnderTitle } from "../../Panes.style";
import { InfoText } from "../PaymentPane.style";
import { RoundedBorder, TextWrapper, HorizontalLine } from "./ResultPane.style";

export const ResultPane: React.FC = () => {
  const donorEmail = useSelector((state: State) => state.donation.donor?.email);
  const recurring = useSelector((state: State) => state.donation.recurring);
  const kid = useSelector((state: State) => state.donation.kid);

  return (
    <Pane>
      <PaneContainer>
        <PaneTitle>Tusen takk!</PaneTitle>
        <UnderTitle>Du kan nå overføre til oss</UnderTitle>
        <RoundedBorder>
          <TextWrapper>
            <b>Kontonr</b>
            <span>1506 29 95960</span>
          </TextWrapper>
          <HorizontalLine />
          <TextWrapper>
            <b>KID</b>
            <span data-cy="kidNumber">{kid}</span>
          </TextWrapper>
        </RoundedBorder>
        {donorEmail !== "anon@gieffektivt.no" ? (
          <InfoText>{`Vi har også sendt en mail til ${donorEmail} med informasjon om din donasjon. Sjekk søppelpost-mappen om du ikke har mottatt eposten i løpet av noen timer.`}</InfoText>
        ) : (
          <InfoText>
            {`Hvis du ønsker å donere med samme fordeling senere kan du bruke samme KID-nummer igjen. Dersom du har noen spørsmål eller tilbakemeldinger kan du alltid ta kontakt med oss ved å sende en mail til `}
            <OrangeLink href="mailto:donasjon@gieffektivt.no">
              donasjon@gieffektivt.no
            </OrangeLink>
          </InfoText>
        )}
        {recurring === 0 && (
          <InfoText>
            Bruk KIDen til å sette opp en fast betaling i nettbanken din.
            Enkelte banker tillater ikke bruk av KID ved faste overføringer.
            Hvis det gjelder din bank kan du oppgi KIDen som en del av en
            melding, f.eks. &quot;KID: 12345678&quot;.
          </InfoText>
        )}
        <NextButton
          onClick={() => {
            window.location.reload();
          }}
        >
          Tilbake til hovedsiden
        </NextButton>
      </PaneContainer>
    </Pane>
  );
};
