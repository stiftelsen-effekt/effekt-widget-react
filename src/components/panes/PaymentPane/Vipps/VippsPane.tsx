/* eslint-disable react/jsx-curly-newline */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  draftAgreementAction,
  setVippsAgreement,
} from "../../../../store/donation/actions";
import { State } from "../../../../store/state";
import { RecurringDonation } from "../../../../types/Enums";
import { LoadingCircle } from "../../../shared/LoadingCircle/LoadingCircle";
import { RichSelect } from "../../../shared/RichSelect/RichSelect";
import { RichSelectOption } from "../../../shared/RichSelect/RichSelectOption";
import { Pane, PaneContainer } from "../../Panes.style";
import { DatePicker } from "./DatePicker/DatePicker";
import { VippsButton, VippsButtonWrapper } from "./VippsPane.style";

export const VippsPane: React.FC = () => {
  const dispatch = useDispatch();
  const donationState = useSelector((state: State) => state.donation);
  const { paymentProviderURL, vippsAgreement, recurring } = donationState;
  const [loading, setLoading] = useState(false);

  return (
    <Pane>
      <PaneContainer>
        {loading && <LoadingCircle />}
        {!loading && (
          <div>
            <RichSelect
              selected={vippsAgreement?.initialCharge ? 0 : 1}
              onChange={(value: number) => {
                if (vippsAgreement)
                  dispatch(
                    setVippsAgreement({
                      ...vippsAgreement,
                      initialCharge: value === 0,
                    })
                  );
              }}
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
                onClick={async () => {
                  setLoading(true);
                  if (recurring === RecurringDonation.RECURRING) {
                    dispatch(draftAgreementAction.started(undefined));
                  }
                  if (recurring === RecurringDonation.NON_RECURRING) {
                    window.open(paymentProviderURL);
                  }
                  (document.activeElement as HTMLElement).blur();
                }}
              />
            </VippsButtonWrapper>
          </div>
        )}
      </PaneContainer>
    </Pane>
  );
};
