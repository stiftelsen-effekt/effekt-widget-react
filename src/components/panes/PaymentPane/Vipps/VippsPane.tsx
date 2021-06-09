/* eslint-disable react/jsx-curly-newline */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  draftAgreementAction,
  setVippsAgreement,
} from "../../../../store/donation/actions";
import { setLoading } from "../../../../store/layout/actions";
import { State } from "../../../../store/state";
import { RecurringDonation } from "../../../../types/Enums";
import { ErrorField } from "../../../shared/Error/ErrorField";
import { LoadingCircle } from "../../../shared/LoadingCircle/LoadingCircle";
import { RichSelect } from "../../../shared/RichSelect/RichSelect";
import { RichSelectOption } from "../../../shared/RichSelect/RichSelectOption";
import { OrangeLink } from "../../../Widget.style";
import { Pane, PaneContainer, PaneTitle, UnderTitle } from "../../Panes.style";
import { InfoText } from "../PaymentPane.style";
import { DatePicker } from "./DatePicker/DatePicker";
import { VippsButton, VippsButtonWrapper } from "./VippsPane.style";

export const VippsPane: React.FC = () => {
  const dispatch = useDispatch();
  const donationState = useSelector((state: State) => state.donation);
  const isLoading = useSelector((state: State) => state.layout.loading);
  const { paymentProviderURL, vippsAgreement, recurring } = donationState;
  const [draftError, setDraftError] = useState(false);

  return (
    <Pane>
      <PaneContainer>
        <PaneTitle>Tusen takk!</PaneTitle>
        <UnderTitle>Du kan nå overføre til oss</UnderTitle>
        {isLoading && <LoadingCircle />}
        {!isLoading && recurring === RecurringDonation.RECURRING && (
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
                value={0}
              />
              <RichSelectOption
                label="Velg annen trekkdag"
                sublabel="Velg startdato og månedlig trekkdag"
                value={0}
              >
                <DatePicker />
              </RichSelectOption>
            </RichSelect>
            {draftError && (
              <ErrorField text="Det har skjedd en feil, vennligst prøv på nytt" />
            )}
          </div>
        )}
        <VippsButtonWrapper>
          <VippsButton
            tabIndex={0}
            onClick={async () => {
              setLoading(true);
              if (recurring === RecurringDonation.RECURRING) {
                dispatch(draftAgreementAction.started(undefined));
                setDraftError(true);
              }
              if (recurring === RecurringDonation.NON_RECURRING) {
                window.open(paymentProviderURL);
              }
              (document.activeElement as HTMLElement).blur();
            }}
          />
        </VippsButtonWrapper>
        {!isLoading && recurring === RecurringDonation.NON_RECURRING && (
          <InfoText>
            {`Ønsker du å se hele donasjonshistorikken din? Gå til `}
            <OrangeLink href="https://gieffektivt.no/historikk" target="_blank">
              https://gieffektivt.no/historikk
            </OrangeLink>
            {` og tast inn eposten din, så mottar du straks en oversikt over alle dine donasjoner.`}
          </InfoText>
        )}
      </PaneContainer>
    </Pane>
  );
};
