import "./App.css";

function App() {
  return (
    <main>
      <form>
        <label htmlFor="">Search for a pokémon</label>
        <input type="text" placeholder="Name or ID..." />
        <button>Search</button>
      </form>
      <article className="result">
        <h2>General Info</h2>
        <h2>Stats</h2>
      </article>
    </main>
  );
}

export default App;
