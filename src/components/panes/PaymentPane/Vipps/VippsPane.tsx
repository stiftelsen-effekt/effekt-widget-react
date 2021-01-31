import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { Pane, PaneContainer } from "../../Panes.style";
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
      <PaneContainer>
        <VippsButton onClick={openVipps} />
      </PaneContainer>
    </Pane>
  );
};
