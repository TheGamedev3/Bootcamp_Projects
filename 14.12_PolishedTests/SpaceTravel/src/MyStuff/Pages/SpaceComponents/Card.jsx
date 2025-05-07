


export function Header({title, size='1.2'}){
    return(
        <>
            {title && <b style={{ fontSize: `${size}rem`, marginBottom: '0.5rem' }}>{title}</b>}
        </>
    );
}

export function Profile({title, url}){
    return(
        <>
            {url && (
            <img
                src={url}
                alt={title}
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
            )}
        </>
    );
}

export function Subtitle({text, color, size='0.5'}){
    return(
        <>
            {text && <b style={{ fontSize: `${size}rem`, marginBottom: '0.5rem', color }}>{text}</b>}
        </>
    );
}


export function Card({

    bevel=8, size=150,

    colors={back:'black', border:'white', text:'white'},

    style={}, selectedStyle={}, selected=false,

    enabled=true, onClick=()=>{console.log('clicked')},

    children
}){
    const fullStyle={
        borderStyle: 'solid',
        borderWidth: '4px',
        borderColor: colors.border,
        backgroundColor: colors.back,
        color: colors.text,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: `${size}px`,
        padding: '10px',
        borderRadius: `${bevel}px`,
        margin: '10px',
        ...style
    };
    if(selected){Object.assign(fullStyle, selectedStyle)}

    return (
      <button
        style={fullStyle}
        disabled={!enabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
}


export function Row({
    bevel=0,

    colors={back:'black', border:'white', text:'white'},

    style={},

    children
}){
    const fullStyle={
        borderStyle: 'solid',
        borderWidth: '4px',
        borderColor: colors.border,
        backgroundColor: colors.back,
        color: colors.text,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '10px',
        borderRadius: `${bevel}px`,
        margin: '10px',
        ...style
    };

    return (
      <div
        style={fullStyle}
      >
        {children}
      </div>
    );
}