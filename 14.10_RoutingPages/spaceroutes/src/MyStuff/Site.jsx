

import { useNavigate } from 'react-router-dom';
import HeaderScroller from './HeaderScroller';
import navOptions from './NavOptions';
import RouteSelector from './RouteSelector';

import { getPrevious } from './History';

export default function Site(){
    const navigate = useNavigate();

    return (
        <div style={{ marginTop: "0px", height: '100%', whiteSpace: 'pre-line', backgroundColor:'#09054a' }}>
            <HeaderScroller
                header={
                    <div style={{ flexDirection: 'column', display: 'flex', gap: 10, marginBottom: 0 }}>
                        <h2>SPACE EXPLORER! 🔭</h2>
                        <div style={{ flexDirection: 'row', display: 'flex', gap: 10, marginBottom: 0 }}>
                            <button onClick={() => {
                                const previousPage = getPrevious()
                                if(previousPage){navigate(previousPage)}
                            }}>⏮️</button>
                            {navOptions
                            .map((opt) => (
                                <button key={opt.path} onClick={() => navigate(opt.path)}>
                                {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                }
                contents={<RouteSelector/>}
            />
        </div>
    );
}
