import { Widget } from './Widget'

export interface PaneProps {
    widget: Widget,
    prevPane: string
    nextPane: string
}