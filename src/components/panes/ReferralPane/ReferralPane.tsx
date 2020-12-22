import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Collapse } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setPaneNumber } from "../../../store/layout/actions";
import { PaneNumber, State } from "../../../store/state";
import { getReferrals, postReferral } from "../../helpers/network";
import {
  NavigationWrapper,
  Pane,
  PaneContainer,
  PaneTitle,
  UnderTitle,
  VerticalLine,
} from "../Panes.style";

import { NavButton } from "../../shared/Buttons/NavigationButtons";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style"
import {
  OtherInput,
  OtherInputWrapper,
  ReferralButton,
  ReferralsWrapper,
} from "./ReferralPane.style";
import { PaymentMethod } from "../../../types/Enums";

interface Referral {
  ID: number;
  name: string;
  ordering: number;
}

export const ReferralPane: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>();
  const [openOtherInput, setOpenOtherInput] = useState(false);
  const paymentMethod = useSelector((state: State) => state.donation.method);
  const donorID = useSelector((state: State) => state.donation.donor?.donorID);
  const shareType = useSelector((state: State) => state.layout.shareType);
  const { handleSubmit, register, watch } = useForm();
  const watchOtherInput = watch("other", false);
  const dispatch = useDispatch();

  useEffect(() => {
    getReferrals().then((response) => setReferrals(response));
  }, []);

  function goToNextPane() {
    if (paymentMethod === PaymentMethod.BANK) {
      dispatch(setPaneNumber(PaneNumber.ResultPane));
    } else if (paymentMethod === PaymentMethod.VIPPS) {
      dispatch(setPaneNumber(PaneNumber.VippsPane));
    } else if (paymentMethod === PaymentMethod.PAYPAL) {
      dispatch(setPaneNumber(PaneNumber.PayPalPane));
    }
  }

  function postExistingReferral(referralID: number) {
    if (donorID) {
      const referralData = {
        referralTypeID: referralID,
        donorID,
        otherComment: "",
      };
      postReferral(referralData);
      goToNextPane();
    }
  }

  // This function is called when pressing any of the referral buttons except "Annet", whose ID is 10
  function onSubmit(referralID: number) {
    if (referralID !== 10) {
      postExistingReferral(referralID);
    } else if (referralID === 10) {
      setOpenOtherInput(true);
    }
  }

  function setupReferrals() {
    const referralsList: JSX.Element[] = [];

    if (referrals) {
      referrals.forEach((ref) => {
        // TODO: Add input field for "annet" referral
        if (ref.name !== "BYNN podcast") {
          referralsList.push(
            // TODO: Post referrals on click
            <ReferralButton
              type="button"
              key={ref.ID}
              onClick={() => onSubmit(ref.ID)}
            >
              {ref.name}
            </ReferralButton>
          );
        }
      });
    }
    return referralsList;
  }

  function postOtherReferral() {
    if (donorID) {
      const referralData = {
        referralTypeID: 10,
        donorID,
        otherComment: watchOtherInput,
      };
      postReferral(referralData);
      goToNextPane();
    }
  }

  return (
    <Pane>
      <PaneContainer>
          <PaneTitle>Hvor hørte du om oss?</PaneTitle>
          <form onSubmit={handleSubmit(() => onSubmit(-1))}>
            <Collapse in={!openOtherInput}>
              <UnderTitle>Valgfritt</UnderTitle>
              <ReferralsWrapper>{setupReferrals()}</ReferralsWrapper>
              <NavigationWrapper>
                <NextButton disabled={false} >
                  Neste
                </NextButton>
              </NavigationWrapper>
            </Collapse>
            <Collapse in={openOtherInput}>
              <OtherInputWrapper>
                <UnderTitle>Fortell gjerne mer</UnderTitle>
                <OtherInput name="other" placeholder="Skriv her" ref={register} />
              </OtherInputWrapper>
              <NavigationWrapper>
                {openOtherInput && (
                  <NavButton
                    onClick={() => setOpenOtherInput(false)}
                    text="Tilbake"
                  />
                )}
                <VerticalLine />
                <NavButton onClick={postOtherReferral} text="Fullfør" />
              </NavigationWrapper>
            </Collapse>
          </form>
      </PaneContainer>
    </Pane>
  );
};
