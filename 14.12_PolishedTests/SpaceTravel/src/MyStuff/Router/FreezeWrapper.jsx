
import OuterSpace2 from "../API/OuterSpace2";
export default function FreezeWrapper({children}){

    const{loading, reason} = OuterSpace2.useLoadings();
    return(
        <div style={{width:'100%', height:'100%'}}>
            {children}

            {/* Input-blocking overlay */}
            {loading && (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    cursor: 'not-allowed',
                }}
            />
            )}
    
            {/* Bottom-left loading indicator */}
            {loading && reason && (
                <div
                style={{
                    position: 'absolute',
                    bottom: '0px',
                    left: '10px',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '1.5rem',
                    fontFamily: 'sans-serif',
                    pointerEvents: 'none'
                }}
                >
                {reason}
                </div>
            )}
        </div>
    );
}