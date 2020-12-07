import styled from "styled-components";
import { gray14, gray18, gray20, orange15, orange20 } from "../../../config/colors";

export const Wrapper = styled.div`
  border-bottom: 1px solid ${gray14};

  h2 {
    font-weight: 600;
    font-size: 14px;
    margin: 0;
    margin-bottom: 4px;
  }

  h3 {
    font-size: 11px;
    color: ${gray20};
    font-weight: 300;
    margin: 0;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  padding: 16px 0;
  user-select: none;

  &:active {
    & > div:first-child {
      &::after {
        border: 3px solid ${orange15};
      }
    }
  }
`;

export const HeaderWrapper = styled.div`
  padding-top: 4px;
  margin-left: 10px;
`;

//${(props: RadioBallProps) => props.selected ? '10px' : '22px'};

export const RadioBall = styled.div`
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 50%;
    transition: all 100ms;
    border: ${(props: RadioBallProps) => props.selected ? `7px solid ${orange20}` : `1px solid ${gray18}`};
  }
`;

interface RadioBallProps {
  selected: boolean | undefined
}

export const Content = styled.div`
  height: ${(props: ContentProps) => (props.selected ? 'auto' : '0px')};
  overflow: hidden;
  box-sizing: border-box;
`;

interface ContentProps {
  selected: boolean
}
