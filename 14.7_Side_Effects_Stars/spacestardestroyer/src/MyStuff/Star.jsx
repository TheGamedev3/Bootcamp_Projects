
export default function Star({ data, onHover, offHover, onClick, isSelected }) {
  
    const [x, y] = data.pos;
  
    return (
      <button
        onMouseEnter={onHover}
        onMouseLeave={offHover}
        onClick={onClick}
        style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%, -50%)',
          
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
          
            display: 'flex',                // ✅ perfect centering
            justifyContent: 'center',
            alignItems: 'center',
          
            fontSize: '24px',
            color: 'gold',
            textShadow: isSelected
              ? '0 0 10px #fff, 0 0 20px #fff, 0 0 30px gold'
              : 'none',
            transition: 'text-shadow 0.2s ease'
          }
        }

      >⭐</button>
    );
}

  