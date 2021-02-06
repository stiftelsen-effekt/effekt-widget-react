import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { BoldTitle, Pane, PaneContainer, UnderTitle } from "../../Panes.style";
import { VippsButton } from "./VippsPane.style";

export const VippsPane: React.FC = () => {
  const vippsPaymentURL = useSelector(
    (state: State) => state.donation.paymentProviderURL
  );

  function openVipps() {
    window.open(vippsPaymentURL);
  }

  return (
    <Pane>
      <BoldTitle>Tusen takk!</BoldTitle>
      <UnderTitle>Donasjonen din er klar for betaling</UnderTitle>
      <PaneContainer>
        <VippsButton onClick={openVipps} />
      </PaneContainer>
    </Pane>
  );
};
