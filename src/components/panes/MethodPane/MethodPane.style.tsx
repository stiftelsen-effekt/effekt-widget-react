import styled from 'styled-components'

export const MethodPaneWrapper = styled.div`
    padding: 10px;
    padding-top: 0px;
`

export const MethodWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
`

export const MethodTitle = styled.p`
    font-size: 25px;
    margin: 0;
`

export const InfoText = styled.p`
    font-size: 11px;
    margin: 0;
`

export const BankButton = styled.button`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/bank.png);
    background-size: 70px auto;
    background-repeat: no-repeat;
    background-position: center -3px;
    width: 100px;
    height: 45px;
    cursor: pointer;
    border: 1px solid gray;
    display: flex;
    align-items: flex-end;
    font-size: 11px;
    justify-content: center;
    margin: 5px;
    box-shadow: 3px 3px 2px LightGrey;

    &:hover {
        opacity: 0.5;
    }
`

export const PayPalButton = styled.button`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/PayPal.png);
    background-size: 80px auto;
    background-repeat: no-repeat;
    background-position: center 5px;
    width: 100px;
    height: 45px;
    cursor: pointer;
    border: 1px solid gray;
    display: flex;
    align-items: flex-end;
    font-size: 11px;
    justify-content: center;
    margin: 6px;
    box-shadow: 3px 3px 2px LightGrey;

    &:hover {
        opacity: 0.5;
    }
`
export const VippsButton = styled.button`
    background-image: url(https://storage.googleapis.com/effekt-widget/assets/logos/vipps.png);
    background-size: 80px auto;
    background-repeat: no-repeat;
    background-position: center 5px;
    width: 100px;
    height: 45px;
    cursor: pointer;
    border: 1px solid gray;
    display: flex;
    align-items: flex-end;
    font-size: 11px;
    justify-content: center;
    margin: 5px;
    box-shadow: 3px 3px 2px LightGrey;

    &:hover {
        opacity: 0.5;
    }
`