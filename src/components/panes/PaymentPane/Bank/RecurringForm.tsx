import React from "react";
import { Donation } from "../../../../store/state";
import { RoundedBorder } from "./ResultPane.style";
import AvtaleGiroLogo from "../../../../assets/avtalegiro.jpeg";
import { AvtaleGiroButton } from "./RecurringForm.style";

export const RecurringBankDonationForm: React.FC<{
  donation: Donation;
}> = ({ donation }) => {
  return (
    <RoundedBorder style={{ marginBottom: 10 }}>
      <form
        action="https://pvu.nets.no/ecsa/start"
        method="post"
        target="_blank"
      >
        <input
          type="hidden"
          name="companyName"
          id="companyName"
          value="Effektiv Altruisme Norge"
        />
        <input
          type="hidden"
          name="companyAccountNo"
          id="companyAccountNo"
          value="15062995960"
        />
        <input type="hidden" name="kid" id="kid" value={donation.kid} />
        <input
          type="hidden"
          name="amountLimit"
          id="amountLimit"
          value={donation.sum || 1000}
        />
        <input
          type="hidden"
          name="returnUrl"
          id="returnUrl"
          value="https://gieffektivt.no/donation-recieved"
        />
        <input
          type="hidden"
          name="notificationDisabled"
          id="notificationDisabled"
          value="false"
        />
        <AvtaleGiroButton type="submit">
          Opprett avtale
          <img src={AvtaleGiroLogo} alt="AvtaleGiro logo" height={20} />
        </AvtaleGiroButton>
      </form>
    </RoundedBorder>
  );
};
