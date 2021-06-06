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

export const DonationPane: React.FC = () => {
  const dispatch = useDispatch();
  const shareType = useSelector((state: State) => state.donation.shareType);
  const donationValid = useSelector((state: State) => state.donation.isValid);
  const donationSum = useSelector((state: State) => state.donation.sum);
  const method = useSelector((state: State) => state.donation.method);
  const dueDay = useSelector((state: State) => state.donation.dueDay);
  const recurring = useSelector((state: State) => state.donation.recurring);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  function onSubmit() {
    if (donationSum && donationSum > 0) {
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
                defaultValue={donationSum && donationSum > 1 ? donationSum : ""}
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

              {recurring === RecurringDonation.RECURRING &&
                method === PaymentMethod.BANK && (
                  <TextInput
                    label="Trekkdag"
                    defaultValue={dueDay}
                    name="dueDay"
                    type="tel"
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

            <RichSelect
              selected={shareType}
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
              disabled={!donationValid}
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
