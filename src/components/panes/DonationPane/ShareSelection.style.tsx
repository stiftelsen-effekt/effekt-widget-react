import styled from 'styled-components'

export const ShareInputContainer = styled.div`
    border: 1px solid gray;
    border-radius: 8px;
    margin: 5px;
`

export const OrganizationName = styled.p`
    margin-left: 5px;
    display: inline-block;
    font-size: 20px;

`

export const PercentageText = styled.p`
    margin-left: 5px;
    margin-right: 5px;
    display: inline-block;
    color: gray;
`

export const FloatRightDiv = styled.div`
    float: right;
`

export const ShareInput = styled.input`
    height: 100%;
    width: 5vw;
    border: none;
    font-size: 20px;

    &&:hover {
        border: 2px solid gray;
        border-radius: 5px;
    }
`