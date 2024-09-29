import { useState } from "react";
import SearchForm from "./Components/SearchForm";
import { IPokemon } from "./Interfaces";
import Table from "./Components/Table";

function App() {
  const [pokemon, setPokemon] = useState<IPokemon | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchMsg, setSearchMsg] = useState<string>("");

  return (
    <main>
      <SearchForm setPokemon={setPokemon} setIsLoading={setIsLoading} setSearchMsg={setSearchMsg} />
      {!isLoading && pokemon ? (
        <article className="result">
          <h2>General Info</h2>
          <div>
            <figure>
              <img src={pokemon.img} alt="Name" />
            </figure>
            <Table
              headings={[
                "Name",
                "Pokédex ID",
                pokemon.types.length > 1 ? "Types" : "Type",
                "Height",
                "Weight",
              ]}
              data={[
                pokemon.name,
                pokemon.id,
                pokemon.types.join(", "),
                `${pokemon.height * 0.1}m`,
                `${pokemon.weight}kg`,
              ]}
            />
          </div>
          <h2>Base Stats</h2>
          <Table
            headings={pokemon.stats.map((stat) => stat.name.replace("-", " "))}
            data={pokemon.stats.map((stat) => stat.stat)}
          />
        </article>
      ) : (
        <h2>{searchMsg}</h2>
      )}
    </main>
  );
}

export default App;
