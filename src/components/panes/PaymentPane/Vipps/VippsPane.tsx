import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { NextButton } from "../../../shared/Buttons/NavigationButtons.style";
import { Pane, PaneContainer, PaneTitle, UnderTitle } from "../../Panes.style";
import { VippsButton, VippsButtonWrapper } from "./VippsPane.style";

export const VippsPane: React.FC = () => {
  const vippsPaymentURL = useSelector(
    (state: State) => state.donation.paymentProviderURL
  );

  useEffect(() => {
    window.open(vippsPaymentURL, "_blank");
  }, []);

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
        <NextButton
          onClick={() => {
            window.location.href = "https://gieffektivt.no/";
          }}
        >
          Tilbake til hovedsiden
        </NextButton>
      </PaneContainer>
    </Pane>
  );
};
