import styled from 'styled-components'
import { gray20 } from '../../../config/colors'

export const MethodPaneWrapper = styled.div`
`

export const MethodWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`
export const TextWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
`

export const MethodTitle = styled.p`
    font-size: 25px;
    margin: 0;
`

export const InfoText = styled.p`
    font-size: 12px;
    line-height: 150%;
    color: ${gray20};
    margin: 0;
`

export const MethodButton = styled.div`
    padding: 16px;
    height: 80px;
    box-sizing: border-box;
    box-shadow: 0px 3px 6px 0 rgba(0,0,0,.15);
    margin-bottom: 15px;
    width: 100%;
    transition: all 90ms;
    user-select: none;
    cursor: pointer;

    &:active {
        box-shadow: 0px 1px 2px 0 rgba(0,0,0,.30);
    }
`;