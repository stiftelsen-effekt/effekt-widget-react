import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Validator from "validator";
import {
  registerDonationAction,
  setSum,
  setShareType,
  setDonationValid,
} from "../../../store/donation/actions";
import { Pane, PaneContainer } from "../Panes.style";
import { State } from "../../../store/state";
import { PaymentMethod, ShareType } from "../../../types/Enums";
import { RichSelectOption } from "../../shared/RichSelect/RichSelectOption";
import { RichSelect } from "../../shared/RichSelect/RichSelect";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style";
import { SharesSelection } from "./ShareSelection";
import { TextInput } from "../../shared/Input/TextInput";
import { SumWrapper } from "./DonationPane.style";
import { SharesSum } from "./SharesSum";
import { LoadingCircle } from "../../shared/LoadingCircle/LoadingCircle";

interface DonationFormValues {
  recurring: string;
  customShare: string;
  sum: string;
}

export const DonationPane: React.FC = () => {
  const dispatch = useDispatch();
  const shareType = useSelector((state: State) => state.donation.shareType);
  const donationMethod = useSelector((state: State) => state.donation.method);
  const donationValid = useSelector((state: State) => state.donation.isValid);
  const donationSum = useSelector((state: State) => state.donation.sum);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  const {
    register,
    watch,
    errors,
    handleSubmit,
  } = useForm<DonationFormValues>();
  const watchAllFields = watch();

  useEffect(() => {
    /**
     * TODO:
     * Handle errors, set donation valid
     */

    // eslint-disable-next-line no-console
    const values = watchAllFields;
    if (values.sum) {
      dispatch(setSum(Validator.isInt(values.sum) ? parseInt(values.sum) : 0));
    }
  }, [dispatch, errors, watchAllFields]);

  function onSubmit() {
    setLoadingAnimation(true);
    dispatch(registerDonationAction.started(undefined));
  }

  return (
    <Pane>
      <PaneContainer>
        {!loadingAnimation && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {(donationMethod === PaymentMethod.VIPPS ||
              donationMethod === PaymentMethod.PAYPAL) && (
              <SumWrapper>
                <TextInput
                  label="Sum"
                  denomination="kr"
                  name="sum"
                  type="tel"
                  placeholder="0"
                  defaultValue={donationSum}
                  innerRef={register({
                    required: true,
                    validate: (val) => Validator.isInt(val) && val > 0,
                  })}
                  onChange={(e) => {
                    if (Validator.isInt(e.target.value) === true) {
                      dispatch(setDonationValid(true));
                    }
                    if (Validator.isInt(e.target.value) === false) {
                      dispatch(setDonationValid(false));
                    }
                  }}
                />
              </SumWrapper>
            )}

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
                sublabel="Valgt blant våre anbefalte organisasjoner"
                value={ShareType.CUSTOM}
              >
                <SharesSelection />
                <SharesSum />
              </RichSelectOption>
            </RichSelect>
            <NextButton type="submit" disabled={!donationValid}>
              Neste
            </NextButton>
          </form>
        )}
        {loadingAnimation && <LoadingCircle>Hey</LoadingCircle>}
      </PaneContainer>
    </Pane>
  );
};
