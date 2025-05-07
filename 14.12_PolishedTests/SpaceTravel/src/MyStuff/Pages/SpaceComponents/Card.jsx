


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
        position: 'relative', 
        margin:0,
        ...style
    };
    if(selected){Object.assign(fullStyle, selectedStyle)}

    return (
      <button
        style={fullStyle}
        disabled={!enabled}
        onClick={onClick}
        className="hover-wrapper"
      >
        {children}
      </button>
    );
}

import { useState } from 'react';

export function HoverWrapper({ children, hoverButton }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', padding:'0px 0px', margin:0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    <div
        style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        opacity: hovered ? 1 : 0,
        pointerEvents: hovered ? 'auto' : 'none',
        transition: 'opacity 0.2s ease',
        padding: '0px',
        cursor: 'pointer',
        zIndex: 10
        }}
        onClick={(e) => {
        e.stopPropagation();
        hoverButton?.onClick?.();
        }}
    >
        {hoverButton?.content || '❌'}
    </div>
      {children}
    </div>
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


export function ButtonRow({style, children}){
    return(
        <Row style={{
            backgroundColor:'black',
            color: 'white',
            fontSize: '2rem',
            padding:'10px 10px',
            justifyContent: 'center',
            ...style
        }}>
            <nav style={{
                    display: 'flex', justifyContent: 'center', gap: '40px'
                }}>
                {children}
            </nav>
        </Row>
    );
}