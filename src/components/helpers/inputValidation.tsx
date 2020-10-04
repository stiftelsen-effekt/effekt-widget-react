import EmailValidator from 'email-validator'

const letters = /^[A-Za-z]+$/;
const numbers = /^[0-9]+$/;

export default function validateInputs(currentPane: string, donorName: string, email: string, SSN: string, taxDeduction: boolean, privacyPolicy: boolean) {
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
        else if (taxDeduction) {
        if (!SSN.match(numbers) || SSN.length !== 11) {
            return "Ikke et gyldig fødselsnummer"
        }
        }
        else if (!privacyPolicy) { 
        return "Du må godkjenne personvernerklæringen"
        }
    }
    return ""
}