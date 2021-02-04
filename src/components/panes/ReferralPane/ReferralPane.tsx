import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store/state";
import { Pane, PaneContainer, PaneTitle } from "../Panes.style";
import {
  ReferralButton,
  ReferralsWrapper,
  ReferralButtonsWrapper,
  OtherInput,
  OtherLabel,
  OtherInputWrapper,
} from "./ReferralPane.style";
import { submitReferralAction } from "../../../store/referrals/actions";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style";
import { nextPane } from "../../../store/layout/actions";
import { HistoryBar } from "../../shared/HistoryBar/HistoryBar";

export const ReferralPane: React.FC = () => {
  const referrals = useSelector((state: State) => state.referrals.referrals);
  const [otherInputValue, setOtherInputValue] = useState("");
  const dispatch = useDispatch();

  return (
    <Pane>
      <HistoryBar />
      <PaneContainer>
        <ReferralsWrapper>
          <PaneTitle>Hvor hørte du om oss?</PaneTitle>
          <ReferralButtonsWrapper>
            {referrals?.map((ref) => (
              <ReferralButton
                key={ref.id}
                onClick={() => {
                  dispatch(
                    submitReferralAction.started({
                      referralID: ref.id,
                    })
                  );
                }}
              >
                {ref.name}
              </ReferralButton>
            ))}
            <OtherInputWrapper>
              <OtherLabel>Annet</OtherLabel>
              <OtherInput
                value={otherInputValue}
                placeholder="Skriv inn"
                onChange={(e) => setOtherInputValue(e.target.value)}
              />
            </OtherInputWrapper>
          </ReferralButtonsWrapper>
        </ReferralsWrapper>
        {otherInputValue === "" ? (
          <NextButton
            onClick={() => {
              dispatch(nextPane());
            }}
          >
            Hopp over
          </NextButton>
        ) : (
          <NextButton
            onClick={() => {
              dispatch(
                submitReferralAction.started({
                  referralID: 10,
                  comment: otherInputValue,
                })
              );
            }}
          >
            Send inn
          </NextButton>
        )}
      </PaneContainer>
    </Pane>
  );
};
