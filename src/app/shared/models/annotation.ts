import { Tag } from "./tag";

export interface Annotation {
  id?: number,
  start: number;
  end: number;
  label: Tag | number;
  annotated_text: string;
  document?: number
}

