function Pokegame({teamNames,allPokemon})
{

    // sort teams
    let sets = 2; let teams = [];
    for (let i = 0; i < sets; i++) {
        teams[i] = {name:teamNames[i], totalScore:0, subset:[]}
    }
    let currentTeam = 0;
    function addToTeam(pokemon){
        currentTeam+=1;
        if(currentTeam > sets){currentTeam = 1;}
        let team = teams[currentTeam-1];
        team.subset.push(pokemon);
        team.totalScore += pokemon.base_experience;
    }
    while (allPokemon.length > 0) {
        const randomIndex = Math.floor(Math.random() * allPokemon.length);
        const chosen = allPokemon.splice(randomIndex, 1)[0];
        addToTeam(chosen)
    }

    // find the winner, assume no one ties
    let winner = null;
    for (let i = 0; i < sets; i++) {
        let team = teams[i]; team.won = false;
        if(winner === null){winner = team; continue;}
        if(team.totalScore > winner.totalScore){
            winner = team
        }
    } winner.won = true;

    // create hands
	return (
		<ol>
            <h1>{winner.name} WINS!</h1>
            {
            teams.map((team, index) => {
                return(
                <Pokedex key={"team"+index} team={team}/>
                );
            })
		    }
        </ol>
	);
}
