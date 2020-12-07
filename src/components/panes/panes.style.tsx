import styled from 'styled-components'

export const Pane = styled.div`
    padding: 0px 20px;
    box-sizing: border-box; 
`

export const PaneContainer = styled.div`
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
    font-size: 15px;
    align-self: center;
    margin: 5px;
    text-align: center;
    color: gray;
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

export const LoadingIcon = styled.img`
    width: 80px;
    height: 80px;
    -webkit-animation:spin 1.5s linear infinite;
    -moz-animation:spin 1.5s linear infinite;
    animation:spin 1.5s linear infinite;

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`
