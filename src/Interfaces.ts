export interface IPokemon {
  name: string;
  id: number;
  types: string[];
  height: number;
  weight: number;
  stats: {
    name: string;
    stat: number;
  }[];
  img: string;
}
