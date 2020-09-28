export interface PaneProps {
    name: string,
    title: string,
    content: JSX.Element,
    forwardButton: boolean,
    backwardButton: boolean,
    nextPane: Function,
    previousPane: Function
}