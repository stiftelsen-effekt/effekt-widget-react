import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { API_URL } from "../../config/api";
import { ShareType } from "../../types/Enums";
import { IServerResponse } from "../../types/Temp";
import { nextPane, setAnsweredReferral, setLoading } from "../layout/actions";
import { Donation, State } from "../state";
import {
  registerBankPendingAction,
  registerDonationAction,
  RegisterDonationResponse,
  setPaymentProviderURL,
} from "./actions";

export function* registerBankPending(
  action: Action<undefined>
): SagaIterator<void> {
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
    const result: IServerResponse<RegisterDonationResponse> = yield call(
      request.json.bind(request)
    );
    if (result.status !== 200) throw new Error(result.content as string);

    yield put(
      registerDonationAction.done({
        params: action.payload,
        result: result.content as RegisterDonationResponse,
      })
    );
  } catch (ex) {
    // HEY
  }
}

export function* registerDonation(
  action: Action<undefined>
): SagaIterator<void> {
  yield put(setLoading(true));
  try {
    const donation: Donation = yield select((state: State) => state.donation);

    /**
     * TODO: Ugly solution, in need of refactor
     */
    const paymentMethod = donation.method;
    let data;
    if (donation.shareType === ShareType.STANDARD) {
      data = {
        donor: {
          name: donation.donor?.name,
          email: donation.donor?.email,
          ssn: donation.donor?.ssn,
        },
        method: paymentMethod,
        recurring: donation.recurring,
        amount: donation.sum,
      };
    } else {
      data = {
        donor: {
          name: donation.donor?.name,
          email: donation.donor?.email,
          ssn: donation.donor?.ssn,
        },
        method: paymentMethod,
        recurring: donation.recurring,
        amount: donation.sum,
        shares: donation.shares,
      };
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
  } catch (ex) {
    yield put(
      registerDonationAction.failed({ params: action.payload, error: ex })
    );
  }
  yield put(setLoading(false));
  yield put(nextPane());
  yield put(registerBankPendingAction.started(undefined));
}
