import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store/state";
import { Pane, PaneContainer, PaneTitle } from "../Panes.style";
import {
  ReferralButton,
  ReferralsWrapper,
  ReferralButtonsWrapper,
} from "./ReferralPane.style";
import { submitReferralAction } from "../../../store/referrals/actions";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style";
import { nextPane } from "../../../store/layout/actions";
import { HistoryBar } from "../../shared/HistoryBar/HistoryBar";
import { TextInput } from "../../shared/Input/TextInput";

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
          {/* TODO: Handle other input */}
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
          </ReferralButtonsWrapper>
          <TextInput
            label="Annet"
            value={otherInputValue}
            type="text"
            placeholder="Skriv inn"
            onChange={(e) => setOtherInputValue(e.target.value)}
          />
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
