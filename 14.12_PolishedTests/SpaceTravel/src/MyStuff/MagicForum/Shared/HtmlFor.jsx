
export default function HtmlFor({style, id, leftText, rightText, children}){
    return(
        <div style={{
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left', // ← this is what you're missing
        gap: '0.4rem',
        width: '100%',
        ...style
        }}>
            {leftText && <label htmlFor={id}><b>{leftText}</b></label>}
                {children}
            {rightText && <label htmlFor={id}><b>{rightText}</b></label>}
        </div>
    );
}
