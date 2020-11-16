import React from 'react'
import styled from 'styled-components'
import { ButtonBack, ButtonNext } from 'pure-react-carousel';

const StyledButton = styled.button`
    border: none;
    background-color: white;
    height: 30px;
    width: 30px;
    padding: 0px;
    margin: 5px;

    &:focus {
        outline: none;
    }

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    & > #buttonNext {
        border: none;
        background-color: white;
        height: 30px;
        width: 30px;
        padding: 0px;
        color: gray
    }
`

const StyledDiv = styled.div`
    border: none;
    background-color: white;
    height: 30px;
    width: 30px;
    padding: 0px;
    margin: 5px;

    &:focus {
        outline: none;
    }

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    & > #buttonBack {
        border: none;
        background-color: white;
        height: 30px;
        width: 30px;
        padding: 0px;
        color: gray;
    }
`

export function NextButton(props: any) {
    return (
        <StyledButton>
            <ButtonNext disabled={props.disabled} id="buttonNext">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </ButtonNext>
        </StyledButton>
    )
}

export function PrevButton() {
    return (
        <StyledDiv>
            <ButtonBack id="buttonBack">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
            </ButtonBack>
        </StyledDiv>
    )
}

export function SkipButton() {
    return (    
        <ButtonNext>
            Gi anonymt
        </ButtonNext>
    )
}