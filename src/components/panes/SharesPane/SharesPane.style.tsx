import styled from 'styled-components'

export const SharesWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const ShareWrapper = styled.div`
    text-align: right;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 40px;
    position: relative;

`

export const SmallTextField = styled.input`
    width: 30px;
    padding: 8px;
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 14px;
    background: #eee;
    border: none;
    text-align: center;

    &:focus::-webkit-input-placeholder {
        color: transparent;
    }
`

export const OrganizationName = styled.p`
    width: 120px;
    font-size: 12px;
    display: inline-block;
    margin-right: 5px;
`

export const PercentageText = styled.p`
    margin: 0;
    margin-top: 3px;
    color: gray;
    font-size: 12px;
    text-align: center;
`