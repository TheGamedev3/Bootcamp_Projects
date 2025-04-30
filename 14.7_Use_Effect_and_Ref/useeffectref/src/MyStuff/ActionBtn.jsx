
export function darkenColor(color, factor = 0.7) {
  // Create a temporary element to resolve any CSS color to RGB
  const temp = document.createElement("div");
  temp.style.color = color;
  document.body.appendChild(temp);
  const rgb = getComputedStyle(temp).color;
  document.body.removeChild(temp);

  // Parse the RGB values
  const [r, g, b] = rgb.match(/\d+/g).map(Number);

  // Apply darkening factor
  const toHex = n => Math.max(0, Math.min(255, Math.round(n * factor)))
    .toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function ActionBtn({styling, color, text, onClick, enabled=true}){
    return(
          <button
          onClick={onClick}
          disabled={!enabled}
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: enabled ? color : darkenColor(color),
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