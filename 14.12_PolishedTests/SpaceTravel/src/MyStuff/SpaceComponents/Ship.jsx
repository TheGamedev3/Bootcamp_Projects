export default function Ship({ ship, independent=false }) {

    const myPfp = ship.pictureUrl || 'https://th.bing.com/th/id/OIP.K15zdMQUpDP92j5PUnm2NAHaEK?cb=iwp1&rs=1&pid=ImgDetMain'
    return (
      <div
        style={{
          border: '2px solid white',
          backgroundColor: '#C6C8CA',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '200px',
          padding: '10px',
          borderRadius: '8px',
          margin: '10px',
        }}
      >
        <b style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{`🚀 ${ship.name}`}</b>
        {independent && <div style={{color:'orangered'}}>{`@${ship.getMyPlanet().name}`}</div>}
  
        {myPfp && (
          <img
            src={myPfp}
            alt={ship.name}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
        )}
  
      </div>
    );
  }
  