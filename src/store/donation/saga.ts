import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { API_URL } from "../../config/api";
import { PaymentMethod, ShareType } from "../../types/Enums";
import { IServerResponse } from "../../types/Temp";
import { nextPane, setAnsweredReferral, setLoading } from "../layout/actions";
import { Donation, RegisterDonationObject, State } from "../state";
import {
  registerBankPendingAction,
  registerDonationAction,
  RegisterDonationResponse,
  setPaymentProviderURL,
} from "./actions";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* registerBankPending() {
  try {
    const KID: number = yield select((state: State) => state.donation.kid);

    const request = yield call(fetch, `${API_URL}/donations/bank/pending`, {
      method: "POST",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data={"KID":${KID}}`,
    });

    const result: IServerResponse<never> = yield call(
      request.json.bind(request)
    );

    if (result.status !== 200) throw new Error(result.content as string);
  } catch (ex) {
    console.error(ex);
  }
}

export function* registerDonation(
  action: Action<undefined>
): SagaIterator<void> {
  yield put(setLoading(true));
  try {
    const donation: Donation = yield select((state: State) => state.donation);

    const data: RegisterDonationObject = {
      donor: {
        name: donation.donor?.name,
        email: donation.donor?.email,
        ssn: donation.donor?.ssn,
      },
      method: donation.method ? donation.method : PaymentMethod.BANK,
      amount: donation.sum ? donation.sum : 0,
      recurring: donation.recurring,
    };

    if (donation.shareType === ShareType.CUSTOM) {
      data.organizations = donation.shares;
    }

    const request = yield call(fetch, `${API_URL}/donations/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: IServerResponse<RegisterDonationResponse> = yield call(
      request.json.bind(request)
    );
    if (result.status !== 200) throw new Error(result.content as string);

    yield put(
      setAnsweredReferral(
        data.donor?.email === "anon@gieffektivt.no"
          ? false
          : (result.content as RegisterDonationResponse).hasAnsweredReferral
      )
    );

    yield put(
      setPaymentProviderURL(
        (result.content as RegisterDonationResponse).paymentProviderUrl
      )
    );

    yield put(
      registerDonationAction.done({
        params: action.payload,
        result: result.content as RegisterDonationResponse,
      })
    );

    if (donation.method === PaymentMethod.BANK) {
      yield put(registerBankPendingAction.started(undefined));
    }

    yield put(setLoading(false));
    yield put(nextPane());
  } catch (ex) {
    yield put(
      registerDonationAction.failed({ params: action.payload, error: ex })
    );
  }
}
