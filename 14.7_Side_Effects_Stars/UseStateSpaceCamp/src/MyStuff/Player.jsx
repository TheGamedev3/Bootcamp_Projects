
export default function Player({ name, health, color = 'gray', styling = {} }) {

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...styling }}>
        {/* Small name title */}
        <div style={{
          color: 'white',
          fontSize: '0.8rem',
          marginBottom: '0.5rem'
        }}>
          {name}
        </div>
  
        {/* Health square */}
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: health>0 ? color : 'gray',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          {health}
        </div>
      </div>
    );
  }

  