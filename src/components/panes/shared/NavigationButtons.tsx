import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { setPaneNumber } from '../../../store/layout/actions'
import { State } from '../../../store/state'

const NavigationButton = styled.button`
    background-color: white;
    border: none;
    height: 30px;
    width: 60px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    margin-bottom: 15px;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.5
    }
`

const StyledPrevButton = styled.div`
    background-color: white;
    border: none;
    height: 30px;
    width: 60px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    margin-bottom: 15px;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.5
    }
`

const StyledSkipButton = styled.button`
    background-color: #FFAA2B;
    border: none;
    height: 30px;
    width: 100px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 10px;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }
`

const ButtonText = styled.p`
    color: white;
    font-size: 15px;
    position: relative;
    bottom: 1px;
`

const SmallButtonText = styled.p`
    color: gray;
    font-size: 13px;
`

export function NextButton(props: any) {
    return (
        <NavigationButton type="submit" disabled={props.isDisabled}>
            <SmallButtonText>Neste</SmallButtonText>
        </NavigationButton>
    )
}

export function PrevButton() {
    const currentPaneNumber = useSelector((state: State) => state.layout.paneNumber)
    const isCustomShare = useSelector((state: State) => state.layout.customShare)
    const dispatch = useDispatch()

    function goBack() {
        if (!isCustomShare && currentPaneNumber === 4) {
            dispatch(setPaneNumber(currentPaneNumber - 2))
        } 
        else {
            dispatch(setPaneNumber(currentPaneNumber - 1))
        }
    }

    return (
        <NavigationButton type="button" onClick={goBack}>
            <SmallButtonText>Tilbake</SmallButtonText>
        </NavigationButton>
    )
}

export function SkipButton(props: any) {
    return (    
        <StyledSkipButton type="button" onClick={props.onClick}>
            <ButtonText>Gi anonymt</ButtonText>
        </StyledSkipButton>
    )
}