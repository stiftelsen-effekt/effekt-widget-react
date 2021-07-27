import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validator from "validator";
import {
  registerDonationAction,
  setSum,
  setShareType,
} from "../../../store/donation/actions";
import { Pane, PaneContainer } from "../Panes.style";
import { State } from "../../../store/state";
import { ShareType } from "../../../types/Enums";
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
  const donation = useSelector((state: State) => state.donation);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

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
            </SumWrapper>

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
