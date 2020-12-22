import { IView } from './i-view';

export interface Parentable<T> {
    children: T[];
    parent: T;
}
export interface Iconable {
    id: string;
}
export interface Closable {
    close(): void;
}
export interface Draggable {
    getSource(): string;
}
export interface IPersistance<T> {
    loadData(): T;
    saveData(data: T): void;
    getKey(): string;
}
export interface Resizeable {
    flexBasis: string;
}

export interface IDivider {
    axis: string;
    handleDragging(grandChild: IPanel, axis: string, offset: number, buble: boolean): void;
}

export interface IPanel extends Parentable<IPanel>, Closable, Iconable, Resizeable {
    transition: string;
    id: string;
    class?: any;
    views: IView[];
    name: string;
    flexBasis: string;
    divider?: IDivider;
    binding: { closed: boolean, overlay: boolean };
    getOffsetWidth(): number;
    getOffsetHeight(): number;
    getScrollWidth(): number;
    getScrollHeight(): number;
    getOffsetTop(): number;
    getOffsetLeft(): number;
}
