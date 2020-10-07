import Share from './Share'

export interface Widget {
    state: {
        currentPane: string,
        setCurrentPane: Function,
        donorName: string,
        setDonorName: Function,
        email: string,
        setEmail: Function,
        SSN: string,
        setSSN: Function,
        sum: string,
        setSum: Function,
        method: string,
        setMethod: Function,
        taxDeduction: boolean,
        setTaxDeduction: Function,
        privacyPolicy: boolean,
        setPrivacyPolicy: Function,
        newsletter: boolean,
        setNewsletter: Function,
        recommendedShare: boolean,
        setRecommendedShare: Function,
        recurring: boolean,
        setRecurring: Function,
        shares: Share[],
        setShares: Function,
        error: string,
        setError: Function
      },
      prevPane: Function,
      nextPane: Function,
      prevButton: Function,
      nextButton: Function,
      errorField: Function
}