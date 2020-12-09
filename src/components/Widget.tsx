import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { DonationPane } from "./panes/DonationPane/DonationPane";
import { DonorPane } from "./panes/DonorPane/DonorPane";
import { MethodPane } from "./panes/MethodPane/MethodPane";
import { PaymentPane } from "./panes/PaymentPane/PaymentPane";
import { ReferralPane } from "./panes/ReferralPane/ReferralPane";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { State } from "../store/state";

export const Widget: React.FC = () => {
  const currentPane = useSelector((state: State) => state.layout.paneNumber);

  return (
    <div style={{ display: "block", maxWidth: "100vw", margin: "0 auto" }}>
      <Carousel
        dynamicHeight
        selectedItem={currentPane}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        transitionTime={200}
        onChange={() => {}}
      >
        <MethodPane />
        <DonorPane />
        <DonationPane />
        <ReferralPane />
        <PaymentPane />
      </Carousel>
    </div>
  );
};
