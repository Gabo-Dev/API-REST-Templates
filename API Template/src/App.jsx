import { useFetch } from "./useFetch";
import "./App.css";

function App() {
  //destructuracion de nuestro fetch
  const { data, loading, error, handleCancelRequest } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div className="App">
      <h1>Fetch Like a PRO</h1>
      <button onClick={handleCancelRequest}>Cancel Request</button>
      <div className="card">
        <ul>
          {error && <h3>Error: {error}</h3>}
          {loading && <li>Loading....</li>}
          {data?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
