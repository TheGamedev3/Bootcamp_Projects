function Pokedex({team})
{
	return (
		<ol>
			<h2>{team.name}, total score: {team.totalScore}pts.</h2>
		{
			team.won &&
			<p>THIS TEAM WINS!!!</p>
		}
		<ol style={{
			border: "2px solid #333",
			borderRadius: "15px",
			padding: "20px",
			backgroundColor: "#e6e6e6",
			display: "flex",
			flexWrap: "wrap",
			justifyContent: "space-around",
			maxWidth: "800px",
			margin: "20px auto"
		}}>{
			team.subset.map((pokemon, index) => {
				return(
				<Pokecard key={pokemon.id} pokemon={pokemon}/>
				);
			})
		}</ol>
		</ol>
	);
}
