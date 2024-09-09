import { useEffect, useState } from "react";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async function () {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
        {
          mode: "cors",
        }
      );

      if (response.ok) {
        const data = await response.json();
        const pokemonsData = data.results;
        return pokemonsData;
      } else {
        throw new Error(
          `A ${response.status}, error was thrown, in pokeAPI call!`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getPokemons = async () => {
      const pokemonsData = await fetchPokemons();
      setPokemons(pokemonsData);
    };

    getPokemons();
  }, []);

  return (
    <div>
      {pokemons.length > 0 ? (
        pokemons.map((pokemon, index) => <h1 key={index}>{pokemon.name}</h1>)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
