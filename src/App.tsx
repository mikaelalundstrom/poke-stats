import { useState } from "react";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import { IPokemon } from "./Interfaces";
import Table from "./Components/Table";

function App() {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main>
      <SearchForm setPokemon={setPokemon} setIsLoading={setIsLoading} />
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
                "ID",
                pokemon.types.length > 1 ? "Types" : "Type",
                "Height",
                "Weight",
              ]}
              data={[
                pokemon.name,
                pokemon.id,
                pokemon.types.join(", "),
                pokemon.height,
                pokemon.weight,
              ]}
            />
          </div>
          <h2>Base Stats</h2>
          <table>
            <thead>
              <tr>
                <th>HP</th>
                <th>Attack</th>
                <th>Defense</th>
                <th>Sp. Atk</th>
                <th>Sp. Def</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HP</td>
                <td>Attack</td>
                <td>Defense</td>
                <td>Sp. Atk</td>
                <td>Sp. Def</td>
                <td>Speed</td>
              </tr>
            </tbody>
          </table>
        </article>
      ) : null}
    </main>
  );
}

export default App;
