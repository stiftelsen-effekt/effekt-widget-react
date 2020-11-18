import styled from "styled-components"

export const InfoBarWrapper = styled.div`
    background-color: white;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
`

export const InfoItemWrapper = styled.div`
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`

export const InfoBarText = styled.p`
    font-size: 14px;
    color: #FFAA2B;
    display: inline;
    margin: 0;
    font-weight: bold;
    white-space: nowrap;
`

export const MethodLogo = styled.div`
    background-size: 60px auto;
    background-repeat: no-repeat;
    background-position: center 5px;
    margin-left: 5px;
    width: 80px;
    height: 30px;
`

export const BankLogo = styled(MethodLogo)`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/bank.png);
    position: relative;
    bottom: 4px;
`

export const PayPalLogo = styled(MethodLogo)`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/PayPal.png);
    background-size: 80px auto;
    position: relative;
    top: 4px;
    overflow: visible;
`
export const VippsLogo = styled(MethodLogo)`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/vipps.png);
    background-size: 80px auto;
    position: relative;
    top: 5px;
`