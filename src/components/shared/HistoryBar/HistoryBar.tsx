import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { prevPane } from "../../../store/layout/actions";
import { PaneNumber, State } from "../../../store/state";
import { PaymentMethod, RecurringDonation } from "../../../types/Enums";
import { BackArrow } from "./BackArrow";
import {
  HistoryBarWrapper,
  HistoryText,
  ResponsiveText,
  TextWrapper,
} from "./HistoryBar.style";

interface HistoryBarProps {
  paymentMethod?: PaymentMethod;
  donorName?: string;
  donorAmount?: number;
}

export const HistoryBar: React.FC<HistoryBarProps> = () => {
  const paneNumber = useSelector((state: State) => state.layout.paneNumber);
  const isRecurring = useSelector((state: State) => state.donation.recurring);
  const methodEnum = useSelector((state: State) => state.donation.method);
  const donationSum = useSelector((state: State) => state.donation.sum);
  const donorName = useSelector((state: State) => state.donation.donor?.name);
  const dispatch = useDispatch();
  let recurringText = "";
  let donorFirstName = "";
  if (donorName) {
    [donorFirstName] = donorName?.split(" ").slice(0, 1);
  }

  if (isRecurring === RecurringDonation.RECURRING) {
    recurringText = "Månedlig";
  } else {
    recurringText = "Engangs";
  }
  let methodName = "";
  if (methodEnum) {
    methodName = PaymentMethod[methodEnum];
    methodName = methodName.toLowerCase();
    methodName = methodName.charAt(0).toUpperCase() + methodName.slice(1);
  }

  return (
    <HistoryBarWrapper>
      {paneNumber > PaneNumber.MethodPane &&
        paneNumber !== PaneNumber.ResultPane && (
          <BackArrow
            onClick={() => {
              dispatch(prevPane());
            }}
          />
        )}
      {paneNumber > PaneNumber.MethodPane && (
        <TextWrapper>
          <HistoryText>
            {paneNumber > PaneNumber.MethodPane &&
              `${recurringText} / ${methodName} `}
            {paneNumber > PaneNumber.DonorPane &&
              donorFirstName &&
              donorFirstName.length < 18 && (
                <ResponsiveText>{`/ ${donorFirstName}`}</ResponsiveText>
              )}
            {paneNumber > PaneNumber.DonationPane && donationSum
              ? ` / ${donationSum}kr`
              : ""}
          </HistoryText>
        </TextWrapper>
      )}
    </HistoryBarWrapper>
  );
};
