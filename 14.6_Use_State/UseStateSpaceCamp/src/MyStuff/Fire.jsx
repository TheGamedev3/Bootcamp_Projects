
export default function Fire({styling, color, text, onClick, enabled}){
    return(
          <button
          onClick={onClick}
          disabled={!enabled}
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: color,
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            flexDirection: 'column',
            ...styling
          }}>
            {text}
          </button>
    );
}