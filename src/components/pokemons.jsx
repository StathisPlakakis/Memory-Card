import { useEffect, useState } from "react";
import Pokemon from "./pokemon";
import '../styles/pokemons.css'

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);

  const getPokemonsData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
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

  const setRandomPokemons = () => {
    const currentPokemons = pokemons;
    let randomizedPokemonsPosition = [];
    let randomizedPokemons= [];
    while (randomizedPokemonsPosition.length < currentPokemons.length) {
      let randomPokemonPosition = Math.floor(Math.random() * currentPokemons.length)
      while (randomizedPokemonsPosition.includes(randomPokemonPosition)) {
        randomPokemonPosition = Math.floor(Math.random() * currentPokemons.length)
      }
      randomizedPokemonsPosition.push(randomPokemonPosition)
    }
    for (let i = 0; i < randomizedPokemonsPosition.length; i++){
      for (let j = 0; j < randomizedPokemonsPosition.length; j++){
        if (currentPokemons[j].id === randomizedPokemonsPosition[i]){
          randomizedPokemons.push(currentPokemons[j])
        }
      }
    }
    return randomizedPokemons;
  }

  const setPokemonClicked = (id) => {
    const pokemons = setRandomPokemons();
    const pokemonsAfterClick = pokemons.map(pokemon => {
      if (pokemon.id === id) {
        const timesClicked = pokemon.clicked;
        return {...pokemon, clicked: timesClicked + 1};
      }else {
        return pokemon;
      }
    })
    setPokemons(pokemonsAfterClick);
  }

  useEffect(() => {
    const getPokemons = async () => {
      const pokemonsImg = await getPokemonsImg();
      const pokemonsName = await getPokemonsName();
      let pokemonsData = []
      for (let i = 0; i < pokemonsImg.length; i++){
        const pokemonData = {
          name: pokemonsName[i],
          img: pokemonsImg[i],
          id: i,
          clicked: 0,
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
        pokemons.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.img}
            clicked={pokemon.clicked}
            onPokemonRandomization={setRandomPokemons}
            onPokemonClicked={setPokemonClicked}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
