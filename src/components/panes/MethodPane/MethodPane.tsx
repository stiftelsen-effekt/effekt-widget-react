/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPaymentMethod,
  setRecurring,
} from "../../../store/donation/actions";
import { State } from "../../../store/state";
import { nextPane } from "../../../store/layout/actions";
import { Pane } from "../Panes.style";
import {
  MethodWrapper,
  InfoText,
  RecurringSelectWrapper,
  VippsComingSoon,
} from "./MethodPane.style";
import { RichSelect } from "../../shared/RichSelect/RichSelect";
import { RichSelectOption } from "../../shared/RichSelect/RichSelectOption";
import { PaymentMethod, RecurringDonation } from "../../../types/Enums";
import { MethodButton } from "./MethodButton";

export const MethodPane: React.FC = () => {
  const dispatch = useDispatch();
  const recurring = useSelector((state: State) => state.donation.recurring);

  const selectMethod = (method: PaymentMethod) => {
    dispatch(selectPaymentMethod(method));
    dispatch(nextPane());
  };

  return (
    <Pane>
      <InfoText>Alle transaksjonskostnader dekkes av oss (se under)</InfoText>
      <RecurringSelectWrapper>
        <RichSelect
          selected={recurring}
          onChange={(value: RecurringDonation) => {
            dispatch(setRecurring(value));
          }}
        >
          <RichSelectOption
            label="Gi en fast månedlig sum"
            sublabel="Du vil bli varslet ved trekk og kan avslutte når som helst"
            value={RecurringDonation.RECURRING}
          />
          <RichSelectOption
            label="Gi et engangsbeløp"
            value={RecurringDonation.NON_RECURRING}
          />
        </RichSelect>
      </RecurringSelectWrapper>
      <MethodWrapper>
        <MethodButton
          className="bank"
          onKeyDown={() => selectMethod(PaymentMethod.BANK)}
          onClick={() => selectMethod(PaymentMethod.BANK)}
        />
        {recurring === RecurringDonation.RECURRING && (
          <VippsComingSoon>Kun engangsdonasjoner</VippsComingSoon>
        )}
        <MethodButton
          className="vipps"
          disabled={recurring === RecurringDonation.RECURRING}
          onKeyDown={() =>
            recurring === RecurringDonation.NON_RECURRING &&
            selectMethod(PaymentMethod.VIPPS)
          }
          onClick={() =>
            recurring === RecurringDonation.NON_RECURRING &&
            selectMethod(PaymentMethod.VIPPS)
          }
        >
          2,99%
        </MethodButton>
        <MethodButton
          className="paypal"
          onKeyDown={() => selectMethod(PaymentMethod.PAYPAL)}
          onClick={() => selectMethod(PaymentMethod.PAYPAL)}
        >
          1,90%
        </MethodButton>
      </MethodWrapper>
    </Pane>
  );
};
