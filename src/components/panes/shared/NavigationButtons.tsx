import React from 'react'
import styled from 'styled-components'
import { ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Button } from '@material-ui/core';

const ButtonWrapper = styled.div`
    border: none;
    background-color: white;
    height: 40px;
    width: 40px;
    padding: 0px;
    margin: 5px;
`

const InvisibleSubmit = styled.button`
    border: none;
    height: 40px;
    width: 40px;
    position: absolute;
    opacity: 0;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
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

    &:disabled {
        opacity: 0.5
    }
`

const StyledSkipButton = styled(ButtonNext)`
    background-color: #FFAA2B;
    border: none;
    height: 30px;
    width: 90px;
    color: white;
    font-weight: bold;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }
`

export function NextButton(props: any) {
    return (
        <ButtonWrapper>
            <StyledButtonNext disabled={props.isDisabled} id="buttonNext"> 
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H20V18H18zM4 13L12.586 13 8.293 17.293 9.707 18.707 16.414 12 9.707 5.293 8.293 6.707 12.586 11 4 11z"></path></svg>
            </StyledButtonNext>
            <InvisibleSubmit type="submit"/>
        </ButtonWrapper>
    )
}

export function PrevButton() {
    return (
        <ButtonWrapper>
            <StyledButtonBack id="buttonBack">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H6V18H4zM14.293 5.293L7.586 12 14.293 18.707 15.707 17.293 11.414 13 20 13 20 11 11.414 11 15.707 6.707z"></path></svg>
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