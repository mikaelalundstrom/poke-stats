import { useEffect, useState } from "react";
import SearchForm from "./Components/SearchForm";
import { IPokemon } from "./Interfaces";
import Table from "./Components/Table";
import ImgPlaceholder from "./Components/ImgPlaceholder";

function App() {
  const [pokemon, setPokemon] = useState<IPokemon | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [searchMsg, setSearchMsg] = useState<string>("");

  const handleOnLoad = () => {
    setImgLoaded(true);
  };

  useEffect(() => {
    setImgLoaded(false);
  }, [pokemon]);

  return (
    <main>
      <SearchForm setPokemon={setPokemon} setIsLoading={setIsLoading} setSearchMsg={setSearchMsg} />
      {!isLoading && pokemon ? (
        <article className="result">
          <h2>General Info</h2>
          <div>
            <figure>
              {!imgLoaded && <ImgPlaceholder />}

              <img
                src={pokemon.img}
                alt={pokemon.name}
                onLoad={handleOnLoad}
                className={!imgLoaded ? "d-none" : ""}
              />
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
                `${pokemon.height / 10}m`,
                `${pokemon.weight / 10}kg`,
              ]}
              className="general"
            />
          </div>
          <h2>Base Stats</h2>
          <Table
            headings={pokemon.stats.map((stat) => stat.name.replace("special-", "Sp. "))}
            data={pokemon.stats.map((stat) => stat.stat)}
            className="stats"
          />
        </article>
      ) : (
        <h2 className="search-message">{searchMsg}</h2>
      )}
    </main>
  );
}

export default App;
