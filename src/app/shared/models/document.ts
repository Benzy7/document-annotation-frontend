import { Annotation } from "./annotation";

export interface Document {
    id?: number,
    title: string,
    content: string;
    annotations: Annotation[];
}
