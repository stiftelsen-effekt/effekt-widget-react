import styled from 'styled-components'

export const PaneContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const PaneTitle = styled.p`
    font-size: 25px;
    margin: 10px;
    align-self: center;
`

export const OrangeLink = styled.a`
    color: #FFAA2B;
    display: inline;
    text-decoration-color: #FFAA2B;
    font-size: 12px;
    position: relative;
    bottom: 2px;
`

export const HorizontalLine = styled.div`
    height: 1px;
    background-color: #FFAA2B;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
`

export const VerticalLine = styled.div`
    width: 3px;
    height: 30px;
    background-color: #FFAA2B;
`

export const ErrorMessage = styled.div`
    font-size: 12px;
    color: red;
`

export const NavigationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
