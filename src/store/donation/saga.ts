import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { API_URL } from "../../config/api";
import { IServerResponse } from "../../types/Temp";
import { nextPane, setAnsweredReferral, setLoading } from "../layout/actions";
import { Donation, State } from "../state";
import { registerDonationAction, RegisterDonationResponse } from "./actions";

export function* registerDonation(
  action: Action<undefined>
): SagaIterator<void> {
  yield put(setLoading(true));
  try {
    const donation: Donation = yield select((state: State) => state.donation);
    const request = yield call(fetch, `${API_URL}/donations/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donation),
    });
    const result: IServerResponse<RegisterDonationResponse> = yield call(
      request.json.bind(request)
    );
    if (result.status !== 200) throw new Error(result.content as string);

    yield put(
      setAnsweredReferral(
        (result.content as RegisterDonationResponse).hasAnsweredReferral
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
}
