export interface IPokemon {
  name: string;
  id: string;
  types: string[];
  height: number;
  weight: number;
  stats: {
    name: string;
    stat: string;
  }[];
  img: string;
}
