import { all, takeLatest } from "redux-saga/effects";
import { registerDonationAction } from "./donation/actions";
import { registerDonation } from "./donation/saga";
import { fetchOrganizationsAction } from "./layout/actions";
import { fetchOrganizations } from "./layout/saga";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchAll() {
  yield all([
    takeLatest(fetchOrganizationsAction.started.type, fetchOrganizations),
    takeLatest(registerDonationAction.started.type, registerDonation),
  ]);
}

export default watchAll;