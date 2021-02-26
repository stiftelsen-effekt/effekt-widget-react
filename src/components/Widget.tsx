import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DonationPane } from "./panes/DonationPane/DonationPane";
import { DonorPane } from "./panes/DonorPane/DonorPane";
import { MethodPane } from "./panes/MethodPane/MethodPane";
import { PaymentPane } from "./panes/PaymentPane/PaymentPane";
import { ReferralPane } from "./panes/ReferralPane/ReferralPane";
import { Carousel } from "./Carousel";
import "./Carousel.style.css";
import { fetchOrganizationsAction } from "../store/layout/actions";
import { State } from "../store/state";
import { fetchReferralsAction } from "../store/referrals/actions";
import { HistoryBar } from "./shared/HistoryBar/HistoryBar";
import { ProgressBar } from "./shared/ProgressBar/ProgressBar";
import { EmailLink, Paragraph } from "./Widget.style";

export const Widget: React.FC = () => {
  const dispatch = useDispatch();
  const answeredReferral = useSelector(
    (state: State) => state.layout.answeredReferral
  );

  useEffect(() => {
    dispatch(fetchOrganizationsAction.started(undefined));
    dispatch(fetchReferralsAction.started(undefined));
  }, []);

  return (
    <div id="center-widget">
      <div id="widget">
        <HistoryBar />
        <Carousel>
          <MethodPane />
          <DonorPane />
          <DonationPane />
          {answeredReferral !== true && <ReferralPane />}
          <PaymentPane />
        </Carousel>
        <ProgressBar />
      </div>
      <Paragraph>
        Om du er usikker på hvordan du vil fordele dine donasjoner blant våre
        anbefalte organisasjoner, så er vår anbefaling å gi til GiveWell sitt
        tildelingsfond, som betyr at GiveWell fordeler pengene til de
        organisasjonene der de til enhver tid ser størst behov. Dette er vår
        standardfordeling. Uansett hvilken fordeling du velger, så vil pengene
        gå til noen av verdens mest effektive hjelpeorganisasjoner.
        <br />
        Om du har spørsmål kan du sende oss en e-post til
        <EmailLink href="mailto:mailto:donasjon@gieffektivt.no">
          {` donasjon@gieffektivt.no`}
        </EmailLink>
        .
      </Paragraph>
    </div>
  );
};
