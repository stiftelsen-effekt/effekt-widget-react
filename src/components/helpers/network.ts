import { setDonorID, setKID } from "../../store/donation/actions"
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

//TODO: Check if postReferrals actually works
export async function postReferrals(data: string) {
    const xhttp = new XMLHttpRequest()
    xhttp.open("POST", api_url + 'referrals/', true)
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhttp.send(`data=${encodeURIComponent('test?')}`)
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
                    cb(null, response);
                }
                else if (response.status == 400) {
                    cb(response.content, null);
                }
            } else {
                cb(this.status, null);
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

export function postDonation(postData: DonationData, dispatch: Function) {
    request("donations/register", "POST", postData, function(err: any, data: any) {
        if (err == 0 || err) {
            if (err == 0) console.error("Når ikke server. Forsøk igjen senere.");
            else if (err == 500) console.error("Det er noe feil med donasjonen");
        }
        console.log(data)
        dispatch(setKID(data.content.KID))
        dispatch(setDonorID(data.content.donorID))

        // sendAnalytics("register_donation", _self.KID);
        // if (_self.method === "BANK") {
        //     _self.registerBankPending();
        // }

        // if (_self.method === "VIPPS") {
        //     _self.getPane(VippsPane).setUrl(data.content.paymentProviderUrl)
        // }

    })
}

export function postReferral(referralData: ReferralData) {
    request("referrals/", "POST", referralData, function (err: any, data: any) {
        console.log(data)
    })
}
