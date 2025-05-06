export default function Planet({ planet }) {
    const pop = planet.currentPopulation;
  
    return (
      <div
        style={{
          border: '2px solid white',
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '200px',
          padding: '10px',
          borderRadius: '8px',
          margin: '10px',
        }}
      >
        <b style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{planet.name}</b>
  
        {planet.pictureUrl && (
          <img
            src={planet.pictureUrl}
            alt={planet.name}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
        )}
  
        {pop > 0 && (
          <div style={{ marginTop: '0.5rem' }}>{`🙂 (${pop})`}</div>
        )}
      </div>
    );
  }
  