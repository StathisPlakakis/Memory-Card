import { useEffect, useState } from "react";
import Pokemon from "./pokemon";
import '../styles/pokemons.css'

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);

  const getPokemonsData = async () => {
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

  const getPokemonsUrl = async () => {
    const pokemonsData = await getPokemonsData();
    const pokemonsUrl = pokemonsData.map(pokemonData => pokemonData.url)
    return pokemonsUrl;
  }

  const getPokemonsName = async () => {
    const pokemonsData = await getPokemonsData();
    const pokemonsName = pokemonsData.map(pokemonData => {
      const  word = pokemonData.name
      const capitalized =
      word.charAt(0).toUpperCase()
      + word.slice(1);
      return capitalized;
    })
    return pokemonsName;
  }

  const getPokemonsImg = async () => {
    const pokemonsUrl = await getPokemonsUrl();
    const pokemonsImgPromises = pokemonsUrl.map(async (pokemonUrl) => {
      try {
        const response = await fetch(pokemonUrl,
          {
            mode: "cors",
          }
        );
        if (response.ok) {
          const pokemonData = await response.json();
          const images = await pokemonData.sprites.other.dream_world.front_default;
          return images;
        }else {
          throw new Error(
          `A ${response.status}, error was thrown, in pokeAPI call!`
          )
        }
      } catch(error) {
        console.error(error);
      }
    })

    const pokemonsImg = await Promise.all(pokemonsImgPromises);
    return pokemonsImg;
  }

  useEffect(() => {
    const getPokemons = async () => {
      const pokemonsImg = await getPokemonsImg();
      const pokemonsName = await getPokemonsName();
      let pokemonsData = []
      for (let i = 0; i < pokemonsImg.length; i++){
        const pokemonData = {
          name: pokemonsName[i],
          img: pokemonsImg[i]
        }
        pokemonsData.push(pokemonData)
      }
      setPokemons(pokemonsData);
    };

    getPokemons();
  }, []);

  return (
    <div className="pokemons">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon, index) => (
          <Pokemon
            key={index}
            name={pokemon.name}
            img={pokemon.img}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
