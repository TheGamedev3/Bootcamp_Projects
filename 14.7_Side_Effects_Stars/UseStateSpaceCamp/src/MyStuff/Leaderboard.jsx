export default function Leaderboard({ stats }){

    let lead = 'error data missing'
    const good = stats.goodGuyHealth;
    const bad = stats.badGuyHealth;
    if(good > bad){lead = 'The Good Guys'}
    else if(good < bad){lead = 'The Bad Guys'}
    else if(good === bad){lead = "It's a tie!"}
    
    const text = 
        stats.began ? 'Round 1 🚩' :
        (stats.roundOver 
        ? `${lead} are the winner! 🥳`
        : `${lead} are in the lead! 🏁`)

    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '80px', // taller bar
        backgroundColor: 'black',
        color: stats.roundOver ? 'magenta' : 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',

      }}>{text}</div>
    );
}
  