import { setDonorID, setKID } from "../../store/donation/actions"
import { setAnsweredReferral } from "../../store/layout/actions"
import { PaymentMethod } from "../../store/state"
import { DonationData, ReferralData } from "./network.types"

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
}

export async function registerBankPending(postData: {KID: number}) {
    request("donations/bank/pending", "POST", postData, function(err: any, data: any) {
        if (err) console.error("Sending av epost feilet");
        console.log(data)
    });
}

export async function postDonation(postData: DonationData, dispatch: Function) {
    request("donations/register", "POST", postData, function(err: any, data: any) {
        if (err == 0 || err) {
            if (err == 0) console.error("Når ikke server. Forsøk igjen senere.");
            else if (err == 500) console.error("Det er noe feil med donasjonen");
        }

        // TODO: Move dispatches to SharesPane instead?
        console.log(data.content.hasAnsweredReferral)
        dispatch(setAnsweredReferral(data.content.hasAnsweredReferral))
        dispatch(setKID(data.content.KID))
        dispatch(setDonorID(data.content.donorID))

        if (postData.method === PaymentMethod.BANK) {
            registerBankPending({KID: data.content.KID})
        }

        // sendAnalytics("register_donation", _self.KID);

        // if (_self.method === "BANK") {
        //     _self.registerBankPending();
        // }

        // if (_self.method === "VIPPS") {
        //     _self.getPane(VippsPane).setUrl(data.content.paymentProviderUrl)
        // }
        console.log(data)
    })
}

export function postReferral(referralData: ReferralData) {
    request("referrals/", "POST", referralData, function (err: any, data: any) {
        console.log(data)
    })
}
