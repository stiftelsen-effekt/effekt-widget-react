import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gray20 } from "../../../config/colors";
import { prevPane } from "../../../store/layout/actions";
import { PaneNumber, State } from "../../../store/state";
import { PaymentMethod, RecurringDonation } from "../../../types/Enums";
import {
  BackArrowSVG,
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
      {paneNumber > PaneNumber.MethodPane && (
        <BackArrowSVG
          stroke={gray20}
          fill={gray20}
          strokeWidth="0"
          version="1.1"
          viewBox="0 0 16 16"
          height="1.6em"
          width="1.6em"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            dispatch(prevPane());
          }}
        >
          <path d="M6.293 13.707l-5-5c-0.391-0.39-0.391-1.024 0-1.414l5-5c0.391-0.391 1.024-0.391 1.414 0s0.391 1.024 0 1.414l-3.293 3.293h9.586c0.552 0 1 0.448 1 1s-0.448 1-1 1h-9.586l3.293 3.293c0.195 0.195 0.293 0.451 0.293 0.707s-0.098 0.512-0.293 0.707c-0.391 0.391-1.024 0.391-1.414 0z" />
        </BackArrowSVG>
      )}
      {paneNumber > PaneNumber.MethodPane && (
        <TextWrapper>
          <HistoryText>
            {paneNumber > PaneNumber.MethodPane &&
              `${recurringText} / ${methodName}`}
            {paneNumber > PaneNumber.DonorPane && (
              <ResponsiveText>{`/ ${donorName}`}</ResponsiveText>
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
