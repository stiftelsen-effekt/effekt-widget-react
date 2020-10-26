import EmailValidator from 'email-validator'

const letters = /^[a-zA-Z\s]*$/; // Also includes whitespace
const numbers = /^[0-9]+$/;

export default function validateInputs(currentPane: string, method: string, donorName: string, email: string, SSN: string, taxDeduction: boolean, privacyPolicy: boolean, sum: string) {
    if (currentPane === "DonorPane") {
        if (!donorName.match(letters)) { 
            return "Ikke et gyldig navn"
        }
        else if (donorName.length < 3 || donorName.length > 32) { 
            return "Ikke et gyldig navn"
        }
        else if (!EmailValidator.validate(email)) { 
            return "Ikke en gyldig email"
        }
        else if (taxDeduction && (!SSN.match(numbers) || SSN.length !== 11)) {
            return "Ikke et gyldig fødselsnummer"
        }
        else if (!privacyPolicy) { 
            return "Du må godkjenne personvernerklæringen"
        }
    }
    else if (currentPane === "DonationPane" && (method === "Vipps" || method === "PayPal")) {
        if(!sum.match(numbers) || sum.length === 0) {
             return "Ikke en gyldig sum"
        }
    }
    else if (currentPane === "SharesPane") {

    }
    return ""
}