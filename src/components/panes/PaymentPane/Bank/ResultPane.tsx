import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { Pane, PaneContainer } from "../../Panes.style";
import {
  InfoText,
  RoundedBorder,
  TextWrapper,
  HorizontalLine,
  PaymentTitle,
  UnderTitle,
} from "./ResultPane.style";

export const ResultPane: React.FC = () => {
  const donorEmail = useSelector((state: State) => state.donation.donor?.email);
  const kid = useSelector((state: State) => state.donation.kid);

  return (
    <Pane>
      <PaneContainer>
        <PaymentTitle>Tusen takk!</PaymentTitle>
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
        <InfoText>{`Vi har også sendt en mail til ${donorEmail} med informasjon om din donasjon. Sjekk søppelpost-mappen om du ikke har motatt eposten i løpet av noen timer.`}</InfoText>
      </PaneContainer>
    </Pane>
  );
};
