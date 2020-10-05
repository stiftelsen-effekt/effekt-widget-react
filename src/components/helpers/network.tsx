
const organizations = [
    {ID: 1, full_name: "Against malaria foundation", short_desc: "Against Malaria Foundation driver preventivt arbeid gjennom distribusjon av impregnerte malarianett. Studier viser at for 8kr beskyttes én person i minst ett år."},
    {ID: 2, full_name: "GiveWell", short_desc: "GiveWell gjør en kontinuerlig vurdering av saksområder for å finne de mest trengende sakene, pengene utdeles så kvartalsvis til de mest effektive organisasjonene."},
    {ID: 3, full_name: "Malaria Consortium", short_desc: "Malaria Consortium utfører seasonal malaria chemoprevention (SMC) som forhindrer smitte  i Afrika, studier viser at denne metoden er svært kostnadseffektiv."},
    {ID: 4, full_name: "GiveDirectly", short_desc: "GiveDirectly utfører kontantoverføringer til ekstremt fattige i Kenya og Uganda, slik at mottakerne kan selv velge hvor de vil investere pengene sine."}
]

const referrals = [
    {ID: 1, name: "Anbefaling av en bekjent"},
    {ID: 2, name: "Twitter"},
    {ID: 3, name: "Facebook"}
]

export function getOrganizations() {
    return organizations
}

export function getReferrals() {
    return referrals
}