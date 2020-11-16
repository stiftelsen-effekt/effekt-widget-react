import React from 'react'
import styled from 'styled-components'
import { ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Button } from '@material-ui/core';

const ButtonWrapper = styled.div`
    border: none;
    background-color: white;
    height: 30px;
    width: 30px;
    padding: 0px;
    margin: 5px;
`

const InvisibleSubmit = styled.button`
    border: none;
    border-radius: 15px;
    height: 30px;
    width: 30px;
    position: absolute;
    opacity: 0;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`

const StyledButtonNext = styled(ButtonNext)`
    border: none;
    background-color: white;
    height: 30px;
    width: 30px;
    padding: 0px;
    color: gray;
    position: absolute;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.5
    }
`

const StyledButtonBack = styled(ButtonBack)`
    border: none;
    background-color: white;
    height: 30px;
    width: 30px;
    padding: 0px;
    color: gray;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        opacity: 0.5
    }
`

const StyledSkipButton = styled(ButtonNext)`
    background-color: white;
    border: 2px solid gray;
    border-radius: 10px;
    height: 30px;
    color: gray;
    font-weight: bold;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`

export function NextButton(props: any) {
    return (
        <ButtonWrapper>
            <StyledButtonNext disabled={props.isDisabled} id="buttonNext"> 
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </StyledButtonNext>
            <InvisibleSubmit type="submit"/>
        </ButtonWrapper>
    )
}

export function PrevButton() {
    return (
        <ButtonWrapper>
            <StyledButtonBack id="buttonBack">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
            </StyledButtonBack>
        </ButtonWrapper>
    )
}

export function SkipButton(props: any) {
    return (    
        <StyledSkipButton onClick={props.onClick}>
            Gi anonymt
        </StyledSkipButton>
    )
}