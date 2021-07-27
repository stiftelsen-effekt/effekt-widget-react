import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { RecurringDonation } from "../../../../types/Enums";
import { OrangeLink } from "../../../Widget.style";
import { Pane, PaneContainer, PaneTitle, UnderTitle } from "../../Panes.style";
import { InfoText } from "../PaymentPane.style";
import {
  PayPalButton,
  PayPalForm,
  PayPalFormWrapper,
} from "./PayPalPane.style";

export const PaypalPane: React.FC = () => {
  const recurring = useSelector((state: State) => state.donation.recurring);
  const donationAmount = useSelector((state: State) => state.donation.sum);
  const donationKID = useSelector((state: State) => state.donation.kid);

  useEffect(() => {
    if (recurring === RecurringDonation.RECURRING) {
      document.getElementById("recurring-paypal-submit")?.click();
      (document.activeElement as HTMLElement).blur();
    } else {
      document.getElementById("single-paypal-submit")?.click();
      (document.activeElement as HTMLElement).blur();
    }
  }, []);

  const singleForm = (
    <PayPalFormWrapper>
      <PayPalForm
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_blank"
      >
        <input type="hidden" name="cmd" value="_donations" />
        <input type="hidden" name="charset" value="UTF-8" />
        <input type="hidden" name="currency_code" value="NOK" />
        <input type="hidden" name="amount" value={donationAmount} />
        <input type="hidden" name="business" value="donasjon@gieffektivt.no" />
        <input type="hidden" name="item_name" value="Donasjon" />
        <input
          type="hidden"
          name="notify_url"
          value="https://data.gieffektivt.no/paypal/ipn"
        />
        <input type="hidden" name="custom" value={`${donationKID}`} />
        <input
          type="submit"
          id="single-paypal-submit"
          style={{ display: "none" }}
        />

        <PayPalButton
          type="button"
          onClick={() => {
            document.getElementById("single-paypal-submit")?.click();
            (document.activeElement as HTMLElement).blur();
          }}
        />
      </PayPalForm>
    </PayPalFormWrapper>
  );

  const recurringForm = (
    <PayPalFormWrapper>
      <PayPalForm
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_blank"
      >
        <input type="hidden" name="cmd" value="_xclick-subscriptions" />
        <input type="hidden" name="charset" value="UTF-8" />
        <input type="hidden" name="currency_code" value="NOK" />
        <input type="hidden" name="business" value="donasjon@gieffektivt.no" />
        <input
          type="hidden"
          name="item_name"
          value="Månedlig donasjon til Stiftelsen Effekt"
        />
        <input
          type="hidden"
          name="notify_url"
          value="https://data.gieffektivt.no/paypal/ipn"
        />
        <input type="hidden" name="custom" value={`${donationKID}`} />
        <input type="hidden" name="a3" value={donationAmount} />
        <input type="hidden" name="p3" value="1" />
        <input type="hidden" name="t3" value="M" />
        <input type="hidden" name="src" value="1" />
        <input type="hidden" name="srt" value="24" />
        <input type="hidden" name="no_note" value="1" />
        <input
          type="submit"
          id="recurring-paypal-submit"
          style={{ display: "none" }}
        />
        <PayPalButton
          type="button"
          onClick={() => {
            document.getElementById("recurring-paypal-submit")?.click();
            (document.activeElement as HTMLElement).blur();
          }}
        />
      </PayPalForm>
    </PayPalFormWrapper>
  );

  return (
    <Pane>
      <PaneContainer>
        <PaneTitle>Tusen takk!</PaneTitle>
        <UnderTitle>Du kan nå overføre til oss</UnderTitle>
        {recurring === RecurringDonation.RECURRING ? recurringForm : singleForm}
        <InfoText>
          {`Ønsker du å se hele donasjonshistorikken din? Gå til `}
          <OrangeLink href="https://gieffektivt.no/historikk" target="_blank">
            https://gieffektivt.no/historikk
          </OrangeLink>
          {` og tast inn eposten din, så mottar du straks en oversikt over alle dine donasjoner.`}
        </InfoText>
      </PaneContainer>
    </Pane>
  );
};
