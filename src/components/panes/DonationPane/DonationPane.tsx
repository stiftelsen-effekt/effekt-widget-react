/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Validator from "validator";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { setSum } from "../../../store/donation/actions";
import { nextPane, setShareType } from "../../../store/layout/actions";
import { Pane, PaneContainer } from "../Panes.style";
import { State } from "../../../store/state";
import { TextField } from "../Forms.style";
import ErrorField from "../../shared/Error/ErrorField";
import { getOrganizationsURL, postDonation } from "../../helpers/network";
import { DonationData } from "../../helpers/network.types";
import { PaymentMethod, ShareType } from "../../../types/Enums";
import { RichSelectOption } from "../../shared/RichSelect/RichSelectOption";
import { RichSelect } from "../../shared/RichSelect/RichSelect";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style";
import { SharesSelection } from "./ShareSelection";
import { Organization } from "../../../types/Organization";
import { IServerResponse } from "../../../types/Temp";

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
  const donationSum = useSelector((state: State) => state.donation.sum);
  const currentPaymentMethod = useSelector(
    (state: State) => state.donation.method
  );
  const { isLoading, error, data } = useQuery<
    AxiosResponse<IServerResponse<[Organization]>>
  >("getOrganizations", () => axios(getOrganizationsURL));

  /*
  const answeredReferral = useSelector(
    (state: State) => state.layout.answeredReferral
  );
  */
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

  // This hook waits for the response from the POST donation request sent when submittig
  // It then uses the response data to determine how many panes to skip
  /*
  useEffect(() => {
    dispatch(nextPane());
  }, [answeredReferral, dispatch]);
  */

  function onSubmit() {
    if (Object.keys(errors).length === 0) {
      if (donor) {
        if (shareType === ShareType.STANDARD) {
          if (
            donor.name &&
            donor.email &&
            donor.newsletter !== undefined &&
            currentPaymentMethod
          ) {
            // TODO: Move this to network.ts
            const postData: DonationData = {
              donor: {
                name: donor.name,
                email: donor.email,
                ssn: donor.ssn ? donor.ssn.toString() : "",
                newsletter: donor.newsletter,
              },
              // Needs to b a proper payment method
              method: "UNDEFINED",
            };
            if (
              donationSum &&
              currentPaymentMethod !== PaymentMethod.BANK &&
              currentPaymentMethod !== PaymentMethod.BANK_UKID
            ) {
              postData.amount = donationSum;
            }
            postDonation(postData, dispatch);
          }
        }
      }
      dispatch(nextPane());
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
              {shareType === ShareType.CUSTOM && data?.data && (
                <SharesSelection
                  prefetchData={{ error, isLoading, data: data?.data }}
                />
              )}
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
