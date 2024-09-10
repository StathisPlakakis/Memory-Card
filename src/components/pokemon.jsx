import '../styles/pokemon.css';

export default function Pokemon({name, img}) {
  return(
    <div className="pokemon">
      <img src={img} alt={name + "'s image"} />
      <h3>{name}</h3>
    </div>
  )
}