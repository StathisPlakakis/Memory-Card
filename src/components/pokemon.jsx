import '../styles/pokemon.css';

export default function Pokemon({name, img, onPokemonRandomization}) {
  return(
    <div 
      className="pokemon"
      onClick={onPokemonRandomization}>
      <img src={img} alt={name + "'s image"} />
      <h3>{name}</h3>
    </div>
  )
}