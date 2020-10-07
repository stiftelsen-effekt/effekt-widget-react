export async function getOrganizations() {
    const response = await fetch('https://data.gieffektivt.no/organizations/active')
    const orgs = await response.json()
  
    return orgs.content
}

export async function getReferrals() {
    const response = await fetch('https://data.gieffektivt.no/referrals/types')
    const orgs = await response.json()
  
    return orgs.content
}
  