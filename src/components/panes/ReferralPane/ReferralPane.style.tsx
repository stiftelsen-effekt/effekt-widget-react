import styled from 'styled-components'

export const ReferralsWrapper = styled.div`
    width: 240px;
    white-space: normal;
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    width: 240px;
    flex-wrap: wrap;
`

export const ReferralButton = styled.button`
    width: 110px;
    padding: 5px;
    margin: 5px;
    background: #f8f1e5;
    border: 1px solid #dfd2c5;
    
    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`