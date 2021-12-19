import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../store/state";
import { PaymentMethod } from "../../../types/Enums";
import { OrangeLine } from "./ProgressBar.style";

export const ProgressBar: React.FC = () => {
  const paneNumber = useSelector((state: State) => state.layout.paneNumber);
  const hasAnswerredReferral = useSelector(
    (state: State) => state.layout.answeredReferral
  );
  const method = useSelector((state: State) => state.donation.method);

  let progressPercentage = paneNumber * 25 + (hasAnswerredReferral ? 25 : 0);
  if (method === PaymentMethod.BITCOIN && paneNumber > 0) {
    progressPercentage = 100;
  }

  return <OrangeLine style={{ width: `${progressPercentage}%` }} />;
};
