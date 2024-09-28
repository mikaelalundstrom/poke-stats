export interface IPokemon {
  name: string;
  id: string;
  types: string[];
  height: string;
  weight: string;
  stats: {
    name: string;
    stat: string;
  }[];
  img: string;
}
