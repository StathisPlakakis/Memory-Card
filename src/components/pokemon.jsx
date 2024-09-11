import '../styles/pokemon.css';

export default function Pokemon({name, img, id, onPokemonClicked}) {

  const handleClick = () => {
    onPokemonClicked(id);
  }
  return(
    <div 
      className="pokemon"
      onClick={handleClick}>
      <img src={img} alt={name + "'s image"} />
      <h3>{name}</h3>
    </div>
  )
}