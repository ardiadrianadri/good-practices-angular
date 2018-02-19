import { Hero } from './hero';
import { MarvelElements } from './marvel-elements';

export interface MarvelAnswer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  result: Hero[] | MarvelElements[]
};
