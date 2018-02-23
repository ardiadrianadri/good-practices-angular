import { BaseElement } from './base-element';

export interface Hero extends BaseElement {
  name: string;
  description: string;
  image: string;
}
