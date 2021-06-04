/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVippsInitialCharge } from "../../../../store/donation/actions";
import { State } from "../../../../store/state";
import { RecurringDonation } from "../../../../types/Enums";
import { NextButton } from "../../../shared/Buttons/NavigationButtons.style";
import { RichSelect } from "../../../shared/RichSelect/RichSelect";
import { RichSelectOption } from "../../../shared/RichSelect/RichSelectOption";
import { Pane, PaneContainer } from "../../Panes.style";
import { DatePicker } from "./DatePicker/DatePicker";
import { VippsButton, VippsButtonWrapper } from "./VippsPane.style";

export const VippsPane: React.FC = () => {
  const dispatch = useDispatch();
  const donationState = useSelector((state: State) => state.donation);
  const { vippsInitialCharge } = donationState;
  const { paymentProviderURL } = donationState;
  const { recurring } = donationState;

  function openVipps() {
    window.open(paymentProviderURL);
  }

  return (
    <Pane>
      <PaneContainer>
        <RichSelect
          selected={vippsInitialCharge ? 1 : 0}
          onChange={(initialCharge: number) =>
            dispatch(setVippsInitialCharge(initialCharge === 1))
          }
        >
          <RichSelectOption
            label="Begynn i dag"
            sublabel="Du kan endre månedlig trekkdag senere"
            value={recurring === RecurringDonation.NON_RECURRING ? 1 : 0}
          />
          <RichSelectOption
            label="Velg fast trekkdag"
            sublabel="Velg startdato og månedlig trekkdag"
            value={recurring === RecurringDonation.RECURRING ? 1 : 0}
          >
            <DatePicker />
          </RichSelectOption>
        </RichSelect>
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
            window.location.reload();
          }}
        >
          Tilbake til hovedsiden
        </NextButton>
      </PaneContainer>
    </Pane>
  );
};
