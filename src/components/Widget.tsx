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
import { PaneNumber, State } from "../store/state";
import { fetchReferralsAction } from "../store/referrals/actions";
import { HistoryBar } from "./shared/HistoryBar/HistoryBar";
import { ProgressBar } from "./shared/ProgressBar/ProgressBar";
import { OrangeLink, Paragraph } from "./Widget.style";
import { PaymentMethod, ShareType } from "../types/Enums";
import { BitCoinPane } from "./panes/PaymentPane/BitCoin/BitCoinPane";

export const Widget: React.FC = () => {
  const dispatch = useDispatch();
  const answeredReferral = useSelector(
    (state: State) => state.layout.answeredReferral
  );
  const pane = useSelector((state: State) => state.layout.paneNumber);
  const shareType = useSelector((state: State) => state.donation.shareType);
  const method = useSelector((state: State) => state.donation.method);

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
          {method === PaymentMethod.BITCOIN && <BitCoinPane />}
          <DonorPane />
          <DonationPane />
          {answeredReferral !== true && <ReferralPane />}
          <PaymentPane />
        </Carousel>
        <ProgressBar />
      </div>
      {/** Always show paragraph unless on DonationPane with ShareType.CUSTOM */}
      {!(
        pane === PaneNumber.DonationPane && shareType !== ShareType.STANDARD
      ) && (
        <Paragraph>
          Om du er usikker på hvordan du vil fordele dine donasjoner blant våre
          anbefalte organisasjoner, så er vår anbefaling å gi til
          <OrangeLink
            href="https://www.givewell.org/maximum-impact-fund"
            target="_blank"
          >
            {` GiveWell sitt tildelingsfond`}
          </OrangeLink>
          , som betyr at GiveWell fordeler pengene til de organisasjonene der de
          til enhver tid ser størst behov. Dette er vår standardfordeling.
          Uansett hvilken fordeling du velger, så vil pengene gå til noen av
          verdens mest effektive hjelpeorganisasjoner.
          <br />
          <br />
          Eventuelle transaksjonskostnader tilknyttet din donasjon dekkes av oss
          så 100% av din donasjon kommer frem. Les
          <OrangeLink href="https://gieffektivt.no/gi#transaksjonskostnader">
            {` her `}
          </OrangeLink>
          for mer om transaksjonskostnader ved de ulike betalingsmåtene. Om du
          har spørsmål kan du sende oss en e-post til
          <OrangeLink href="mailto:mailto:donasjon@gieffektivt.no">
            {` donasjon@gieffektivt.no`}
          </OrangeLink>
          .
        </Paragraph>
      )}
    </div>
  );
};
