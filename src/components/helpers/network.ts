import { setDonorID, setKID, setPaymentProviderURL } from "../../store/donation/actions"
import { setAnsweredReferral } from "../../store/layout/actions"
import { PaymentMethod, paymentMethodStrings } from "../../store/state"
import { DonationData, PostDonationResponse, ReferralData } from "./network.types"

const api_url = "https://dev.data.gieffektivt.no/"

export const getOrganizationsURL = api_url + 'organizations/active'

export async function getOrganizations() {
    const response = await fetch(api_url + 'organizations/active')
    const orgs = await response.json()
  
    return orgs.content
}

export async function getReferrals() {
    const response = await fetch(api_url + 'referrals/types')
    const orgs = await response.json()
  
    return orgs.content
}

// Original code below

export function request(endpoint: string, type: string, data: any, cb: any) {
    var http = new XMLHttpRequest();
    //TODO:      this context is properly binded
    var url = api_url + endpoint;

    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200 ) {
                var response = JSON.parse(this.responseText);

                if (response.status == 200) {
                    return cb(null, response);
                }
                else if (response.status == 400) {
                    return cb(response.content, null);
                }
            } else {
                return cb(this.status, null);
            }
        }
    };

    if (type == "POST") {
        http.open("POST", url, true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("data=" + encodeURIComponent(JSON.stringify(data)));
    } else if (type == "GET") {
        http.open("GET", url, true);
        http.send(data);
    }
    return http
}

export function registerBankPending(postData: {KID: number}) {
    request("donations/bank/pending", "POST", postData, function(err: any, data: any) {
        if (err) console.error("Sending av epost feilet");
        console.log(data)
    });
}

export async function postDonation(postData: DonationData, dispatch: Function) {
    return request("donations/register", "POST", postData, function(err: any, data: PostDonationResponse) {
        if (err == 0 || err) {
            if (err == 0) console.error("Når ikke server. Forsøk igjen senere.");
            else if (err == 500) console.error("Det er noe feil med donasjonen");
        }

        // TODO: Move dispatches to SharesPane instead?
        dispatch(setAnsweredReferral(data.content.hasAnsweredReferral))
        dispatch(setKID(data.content.KID))
        dispatch(setDonorID(data.content.donorID))
        dispatch(setPaymentProviderURL(data.content.paymentProviderUrl))

        if (postData.method === paymentMethodStrings[PaymentMethod.BANK]) {
            registerBankPending({KID: data.content.KID})
        }

        // TODO: Send Google analytics
        // sendAnalytics("register_donation", _self.KID);

        console.log(data)
        return data
    })
}

export function postReferral(referralData: ReferralData) {
    request("referrals/", "POST", referralData, function (err: any, data: any) {
        console.log(data)
    })
}