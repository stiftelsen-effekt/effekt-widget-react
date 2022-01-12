import { Middleware } from "redux";
import { all, takeLatest } from "redux-saga/effects";
import {
  draftAgreementAction,
  draftAvtaleGiroAction,
  registerBankPendingAction,
  registerDonationAction,
} from "./donation/actions";
import {
  draftAvtaleGiro,
  draftVippsAgreement,
  registerBankPending,
  registerDonation,
} from "./donation/saga";
import { fetchOrganizationsAction } from "./layout/actions";
import { fetchOrganizations } from "./layout/saga";
import {
  fetchReferralsAction,
  submitReferralAction,
} from "./referrals/actions";
import { fetchReferrals, submitReferral } from "./referrals/saga";

export const postMessageMiddleware: Middleware = ({ getState }) => (next) => (
  action
) => {
  if (action.type === "REGISTER_DONATION_DONE") {
    const { donation } = getState();
    const eventData = {
      action: "Donation registered",
      category: "Donation",
      label: donation.recurring,
      value: donation.sum,
    };
    window.parent.postMessage(eventData, "https://gieffektivt.no/");
  }

  return next(action);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* watchAll() {
  yield all([
    takeLatest(fetchOrganizationsAction.started.type, fetchOrganizations),
    takeLatest(fetchReferralsAction.started.type, fetchReferrals),
    takeLatest(registerDonationAction.started.type, registerDonation),
    takeLatest(submitReferralAction.started.type, submitReferral),
    takeLatest(registerBankPendingAction.started.type, registerBankPending),
    takeLatest(draftAgreementAction.started.type, draftVippsAgreement),
    takeLatest(draftAvtaleGiroAction.started.type, draftAvtaleGiro),
  ]);
}
