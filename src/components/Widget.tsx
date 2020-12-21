import React from "react";
import { useSelector } from "react-redux";
import { DonationPane } from "./panes/DonationPane/DonationPane";
import { DonorPane } from "./panes/DonorPane/DonorPane";
import { MethodPane } from "./panes/MethodPane/MethodPane";
import { PaymentPane } from "./panes/PaymentPane/PaymentPane";
import { ReferralPane } from "./panes/ReferralPane/ReferralPane";
import { State } from "../store/state";
import Carousel from "./Carousel";
import "./Carousel.style.css"

export const Widget: React.FC = () => {
  const currentPane = useSelector((state: State) => state.layout.paneNumber);

  return (
    <div id="app">
      <Carousel>
        <MethodPane />
        <DonorPane />
        <DonationPane />
        <ReferralPane />
        <PaymentPane />
      </Carousel>
    </div>
  );
};
