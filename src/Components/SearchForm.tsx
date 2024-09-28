import { FormEvent } from "react";
import { IPokemon } from "../Interfaces";

interface IProps {
  setPokemon: (value: IPokemon) => void;
  setIsLoading: (value: boolean) => void;
}

function SearchForm({ setPokemon, setIsLoading }: IProps) {
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const form = e.target as HTMLFormElement;
      const searchInput = form.searchInput.value as HTMLInputElement;

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
      const data = await response.json();
      console.log(data);

      const typesArr: string[] = [];
      data.types.forEach((type: { type: { name: string } }) => {
        typesArr.push(type.type.name);
      });

      const statsArr: { name: string; stat: string }[] = [];
      data.stats.forEach((stat: { stat: { name: string }; base_stat: number }) => {
        statsArr.push({ name: stat.stat.name, stat: stat.base_stat.toString() });
      });
      console.log(statsArr);

      setPokemon({
        name: data.name,
        id: data.id,
        types: typesArr,
        height: data.height,
        weight: data.weight,
        stats: statsArr,
        img: data.sprites.front_default,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="searchInput">Search for a pokémon</label>
      <input id="searchInput" type="text" placeholder="Name or ID..." />
      <button>Search</button>
    </form>
  );
}

export default SearchForm;
