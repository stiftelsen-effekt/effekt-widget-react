import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { State } from '../../../store/state'

export const FooterWrapper = styled.div`
    background-color: #FFAA2B;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FooterText = styled.p`
    font-size: 14px;
    color: white;
    display: inline;
    position: relative;
    margin-left: 5px;
    font-weight: bold;
`

export default function DonorNameBar() {
    const donorName = useSelector((state: State) => state.donation.donor?.name)

    return (
        <FooterWrapper>
            <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
            <FooterText>{donorName}</FooterText>
        </FooterWrapper>
    )
}
