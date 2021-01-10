import React from "react";
import { DonationPane } from "./panes/DonationPane/DonationPane";
import { DonorPane } from "./panes/DonorPane/DonorPane";
import { MethodPane } from "./panes/MethodPane/MethodPane";
import { PaymentPane } from "./panes/PaymentPane/PaymentPane";
import { ReferralPane } from "./panes/ReferralPane/ReferralPane";
import { Carousel } from "./Carousel";
import "./Carousel.style.css";

export const Widget: React.FC = () => {
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
