
// (old reused code)

export default function HeaderScroller({
    headerStyle = {},
    header = null,
    leftHeader = null,
    rightHeader = null,

    contents = null,
  }) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        minHeight: 0,
      }}>
        
        {/* Header row */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: '1rem',
            padding: '16px 0px',
            boxSizing: 'border-box',
            ...headerStyle
        }}>
            {/* Left */}
            <div style={{ justifySelf: 'start' }}>
                {leftHeader}
            </div>
            
            {/* Center */}
            <div style={{ justifySelf: 'center' }}>
                {header}
            </div>
            
            {/* Right */}
            <div style={{ justifySelf: 'end' }}>
                {rightHeader}
            </div>
        </div>
  
        {/* Scrollable content */}
        <div
          style={{
            WebkitOverflowScrolling: 'touch',
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'block',
          }}
        >{contents}</div>
      </div>
    );
  }