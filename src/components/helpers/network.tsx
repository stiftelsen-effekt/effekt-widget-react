const api_url = "https://dev.data.gieffektivt.no/"

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