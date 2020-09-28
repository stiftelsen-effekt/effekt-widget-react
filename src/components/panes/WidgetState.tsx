export interface WidgetState {
    state: {
        paneNumber: number,
        setPaneNumber: Function,
        donorName: string,
        setDonorName: Function,
        email: string,
        setEmail: Function,
        SSN: string,
        setSSN: Function,
        method: string,
        setMethod: Function
      },
    nextPane: Function,
    prevPane: Function
}