import { Widget } from '../interfaces/Widget'

export interface PaneProps {
    widget: Widget,
    prevPane: string
    nextPane: string
}