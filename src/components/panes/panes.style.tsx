import styled from 'styled-components'

export const Pane = styled.div`
    width: 500px;  
`

export const PaneContainer = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const PaneTitle = styled.p`
    font-size: 25px;
    margin-top: 5px;
    margin-bottom: 10px;
    align-self: center;
`

export const UnderTitle = styled.p`
    font-size: 15px
    align-self: center;
    margin: 5px;
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
    width: 1px;
    height: 30px;
    background-color: #FFAA2B;
    margin-bottom: 5px;
`

export const ErrorMessage = styled.div`
    font-size: 12px;
    color: red;
    padding-left: 2px;
`

export const NavigationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
`
