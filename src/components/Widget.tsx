import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DonationPane } from "./panes/DonationPane/DonationPane";
import { DonorPane } from "./panes/DonorPane/DonorPane";
import { MethodPane } from "./panes/MethodPane/MethodPane";
import { PaymentPane } from "./panes/PaymentPane/PaymentPane";
import { ReferralPane } from "./panes/ReferralPane/ReferralPane";
import { Carousel } from "./Carousel";
import "./Carousel.style.css";
import { fetchOrganizationsAction } from "../store/layout/actions";

export const Widget: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrganizationsAction.started(undefined));
  }, []);

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
