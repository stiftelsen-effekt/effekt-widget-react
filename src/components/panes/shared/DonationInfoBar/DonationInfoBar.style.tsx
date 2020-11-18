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
    margin-left: 5px;
    margin-right: 5px;
    font-weight: bold;
`

export const MethodLogo = styled.div`
    background-size: 40px auto;
    background-repeat: no-repeat;
    background-position: center 5px;
    margin-left: 5px;
    width: 60px;
    height: 30px;
`

export const BankLogo = styled(MethodLogo)`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/bank.png);
    position: relative;
    bottom: -2px;
`

export const PayPalLogo = styled(MethodLogo)`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/PayPal.png);
    background-size: 60px auto;
    position: relative;
    bottom: -4px;
`
export const VippsLogo = styled(MethodLogo)`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/vipps.png);
    background-size: 55px auto;
    position: relative;
    bottom: -5px;
`