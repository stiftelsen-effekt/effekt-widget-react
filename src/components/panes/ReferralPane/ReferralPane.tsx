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
import { TextInput } from "../../shared/Input/TextInput";
import { LoadingCircle } from "../../shared/LoadingCircle/LoadingCircle";

export const ReferralPane: React.FC = () => {
  const referrals = useSelector((state: State) => state.referrals.referrals);
  const [otherInputValue, setOtherInputValue] = useState("");
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const dispatch = useDispatch();

  return (
    <Pane>
      <PaneContainer>
        {!loadingAnimation && (
          <div>
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
                    {/** TODO: Viktig! Fjern annet fra databasen og legg til en annen referral når vi bytter til den nye widgeten */}
                    {/** TV referer til annet midlertidig for at det skal se penere ut */}
                    {ref.name === "Annet" ? "TV" : ref.name}
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
                  setLoadingAnimation(true);
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
          </div>
        )}
        {loadingAnimation && <LoadingCircle>Hey</LoadingCircle>}
      </PaneContainer>
    </Pane>
  );
};
