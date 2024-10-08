import { FormEvent } from "react";
import { IPokemon } from "../Interfaces";

interface IProps {
  setPokemon: (value: IPokemon | undefined) => void;
  setIsLoading: (value: boolean) => void;
  setSearchMsg: (value: string) => void;
}

function SearchForm({ setPokemon, setIsLoading, setSearchMsg }: IProps) {
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setSearchMsg("Loading...");
      const form = e.target as HTMLFormElement;
      const searchInput = form.searchInput as HTMLInputElement;

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput.value.toLowerCase()}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setPokemon(undefined);
          throw new Error("Pokémon Not found");
        }
        throw new Error("Something went wrong during search");
      } else {
        const data = await response.json();

        const typesArr: string[] = [];
        data.types.forEach((type: { type: { name: string } }) => {
          typesArr.push(type.type.name);
        });

        const statsArr: { name: string; stat: string }[] = [];
        data.stats.forEach((stat: { stat: { name: string }; base_stat: number }) => {
          statsArr.push({ name: stat.stat.name, stat: stat.base_stat.toString() });
        });

        setPokemon({
          name: data.name,
          id: data.id,
          types: typesArr,
          height: data.height,
          weight: data.weight,
          stats: statsArr,
          img: data.sprites.front_default,
        });
      }
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        setSearchMsg(error.message);
      }

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSearch} className="search-form">
      <label htmlFor="searchInput">
        <h1>Search for a Pokémon:</h1>
      </label>
      <div>
        <input id="searchInput" type="text" placeholder="Name or ID..." required />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
