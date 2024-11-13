function Pokecard({ pokemon }) {
	return (
		<div style={{
			border: "1px solid #ccc",
			borderRadius: "10px",
			padding: "10px",
			width: "150px",
			textAlign: "center",
			boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			backgroundColor: "#f9f9f9",
			margin: "10px"
		}}>
			<h3>{pokemon.name}</h3>
			<img 
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
				alt={pokemon.name}
			/>
			<p>Type: {pokemon.type}</p>
			<p>EXP: {pokemon.base_experience}</p>
		</div>
	);
}
