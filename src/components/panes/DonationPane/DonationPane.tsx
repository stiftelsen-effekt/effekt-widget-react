import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validator from "validator";
import {
  registerDonationAction,
  setSum,
  setShareType,
  setDueDay,
} from "../../../store/donation/actions";
import { Pane, PaneContainer } from "../Panes.style";
import { State } from "../../../store/state";
import {
  PaymentMethod,
  RecurringDonation,
  ShareType,
} from "../../../types/Enums";
import { RichSelectOption } from "../../shared/RichSelect/RichSelectOption";
import { RichSelect } from "../../shared/RichSelect/RichSelect";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style";
import { SharesSelection } from "./ShareSelection";
import { TextInput } from "../../shared/Input/TextInput";
import { SumWrapper } from "./DonationPane.style";
import { SharesSum } from "./SharesSum";
import { LoadingCircle } from "../../shared/LoadingCircle/LoadingCircle";
import { InfoBox } from "../../shared/Layout/Layout.style";
import { displayClaimWarning } from "./_util";

export const DonationPane: React.FC = () => {
  const dispatch = useDispatch();
  const donation = useSelector((state: State) => state.donation);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  const claimWarning = displayClaimWarning(donation);

  function onSubmit() {
    if (donation.isValid) {
      setLoadingAnimation(true);
      dispatch(registerDonationAction.started(undefined));
    } else {
      dispatch(setSum(-1));
    }
  }

  return (
    <Pane>
      <PaneContainer>
        {!loadingAnimation && (
          <form>
            <SumWrapper>
              <TextInput
                label="Sum"
                denomination="kr"
                name="sum"
                type="tel"
                placeholder="0"
                defaultValue={
                  donation.sum && donation.sum > 1 ? donation.sum : ""
                }
                clustered
                selectOnClick
                autoComplete="off"
                onChange={(e) => {
                  if (
                    Validator.isInt(e.target.value) === true &&
                    parseInt(e.target.value) > 0
                  ) {
                    dispatch(setSum(parseInt(e.target.value)));
                  } else {
                    dispatch(setSum(-1));
                  }
                }}
              />

              {donation.recurring === RecurringDonation.RECURRING &&
                donation.method === PaymentMethod.BANK && (
                  <TextInput
                    label="Trekkdag"
                    defaultValue={donation.dueDay}
                    name="dueDay"
                    type="tel"
                    clustered
                    denomination="."
                    selectOnClick
                    autoComplete="off"
                    tooltipText="Vi belaster din konto én gang i måneden på valgte dato."
                    onChange={(e) => {
                      if (
                        Validator.isInt(e.target.value) === true &&
                        parseInt(e.target.value) < 29 &&
                        parseInt(e.target.value) > 0
                      ) {
                        dispatch(setDueDay(parseInt(e.target.value)));
                      } else {
                        dispatch(setDueDay(-1));
                      }
                    }}
                  />
                )}
            </SumWrapper>

            {donation.dueDay &&
              (donation.dueDay > 28 || donation.dueDay < 1) && (
                <InfoBox>
                  Trekkdato må være mellom den 1. og 28. i en måned.
                </InfoBox>
              )}

            {claimWarning && (
              <InfoBox>
                Om trekkdatoen settes til under fem dager frem i tid vil vi ikke
                trekke deg før en måned senere grunnet bankens regler for
                varslingstid.
              </InfoBox>
            )}

            <RichSelect
              selected={donation.shareType}
              onChange={(type: ShareType) => dispatch(setShareType(type))}
            >
              <RichSelectOption
                label="Bruk vår anbefalte fordeling"
                sublabel="La midlene dine bli brukt der GiveWell mener det trengs"
                value={ShareType.STANDARD}
              />
              <RichSelectOption
                label="Jeg vil velge fordeling selv"
                sublabel="Velg blant våre anbefalte organisasjoner"
                value={ShareType.CUSTOM}
              >
                <SharesSelection />
                <SharesSum />
              </RichSelectOption>
            </RichSelect>
            <NextButton
              type="button"
              onClick={() => onSubmit()}
              disabled={!donation.isValid}
            >
              Neste
            </NextButton>
          </form>
        )}
        {loadingAnimation && <LoadingCircle />}
      </PaneContainer>
    </Pane>
  );
};
