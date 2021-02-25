import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { Pane, PaneContainer, PaneTitle, UnderTitle } from "../../Panes.style";
import { InfoText } from "../PaymentPane.style";
import { VippsButton, VippsButtonWrapper } from "./VippsPane.style";

export const VippsPane: React.FC = () => {
  const vippsPaymentURL = useSelector(
    (state: State) => state.donation.paymentProviderURL
  );

  function openVipps() {
    window.open(vippsPaymentURL);
  }

  return (
    <Pane>
      <PaneContainer>
        <PaneTitle>Tusen takk!</PaneTitle>
        <UnderTitle>Du kan nå overføre til oss</UnderTitle>
        <VippsButtonWrapper>
          <VippsButton
            tabIndex={0}
            onClick={() => {
              openVipps();
              (document.activeElement as HTMLElement).blur();
            }}
          />
        </VippsButtonWrapper>
        <InfoText>
          Om du er usikker på hvordan du vil fordele dine donasjoner blant våre
          anbefalte organisasjoner, så er vår anbefaling å gi til GiveWell sitt
          tildelingsfond, som betyr at GiveWell fordeler pengene til de
          organisasjonene der de til enhver tid ser størst behov. Dette er vår
          standardfordeling. Uansett hvilken fordeling du velger, så vil pengene
          gå til noen av verdens mest effektive hjelpeorganisasjoner.
        </InfoText>
      </PaneContainer>
    </Pane>
  );
};
