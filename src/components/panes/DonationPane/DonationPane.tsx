/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Validator from "validator";
import {
  registerDonationAction,
  setSum,
} from "../../../store/donation/actions";
import { setShareType } from "../../../store/layout/actions";
import { Pane, PaneContainer } from "../Panes.style";
import { State } from "../../../store/state";
import { TextField } from "../Forms.style";
import ErrorField from "../../shared/Error/ErrorField";
import { PaymentMethod, ShareType } from "../../../types/Enums";
import { RichSelectOption } from "../../shared/RichSelect/RichSelectOption";
import { RichSelect } from "../../shared/RichSelect/RichSelect";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style";
import { SharesSelection } from "./ShareSelection";

interface DonationFormValues {
  recurring: string;
  customShare: string;
  sum: string;
}

// TODO: Add loading animation after submitting

export const DonationPane: React.FC = () => {
  const dispatch = useDispatch();
  const [nextDisabled, setNextDisabled] = useState(false);
  const [sumErrorAnimation, setSumErrorAnimation] = useState(false);
  const shareType = useSelector((state: State) => state.layout.shareType);
  const donationMethod = useSelector((state: State) => state.donation.method);
  const donor = useSelector((state: State) => state.donation.donor);
  const currentPaymentMethod = useSelector(
    (state: State) => state.donation.method
  );

  const {
    register,
    watch,
    errors,
    handleSubmit,
  } = useForm<DonationFormValues>();
  const watchAllFields = watch();

  useEffect(() => {
    errors.sum ? setSumErrorAnimation(true) : setSumErrorAnimation(false);

    if (Object.keys(errors).length === 0) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }

    const values = watchAllFields;
    if (values.sum)
      dispatch(setSum(Validator.isInt(values.sum) ? parseInt(values.sum) : 0));
  }, [dispatch, errors, watchAllFields]);

  function onSubmit() {
    if (Object.keys(errors).length === 0) {
      if (donor) {
        if (
          donor.name &&
          donor.email &&
          donor.newsletter !== undefined &&
          currentPaymentMethod
        ) {
          dispatch(registerDonationAction.started(undefined));
        }
      }
    }
  }

  let sumField = null;
  if (
    donationMethod === PaymentMethod.PAYPAL ||
    donationMethod === PaymentMethod.VIPPS
  ) {
    sumField = (
      <TextField
        name="sum"
        maxLength={10}
        type="tel"
        placeholder="0"
        ref={register({
          required: true,
          validate: (val) => Validator.isInt(val) && val > 0,
        })}
      />
    );
  }

  return (
    <Pane>
      <PaneContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          {sumErrorAnimation && <ErrorField text="Ugyldig sum" />}
          {sumField}

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
            </RichSelectOption>
          </RichSelect>
          <NextButton type="submit" disabled={nextDisabled}>
            Neste
          </NextButton>
        </form>
      </PaneContainer>
    </Pane>
  );
};
