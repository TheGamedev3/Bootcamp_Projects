

import navOptions from './NavOptions';

import { NavLink } from 'react-router-dom';

import { getPrevious } from './History';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Site(){
    const navigate = useNavigate();
    return (
        <div style={{
            marginTop: "0px",
            minWidth: '100vw', minHeight: '100vh',
            whiteSpace: 'pre-line',
            backgroundColor:'black',
            display: 'flex', flexDirection: 'column',
        }}>
            <header style={{ flexDirection: 'column', display: 'flex', gap: 10, marginBottom: 0, backgroundColor:'#09054a' }}>
                <h2>SPACE EXPLORER! 🔭</h2>
                <div style={{ flexDirection: 'row', display: 'flex', gap: 10, marginBottom: 0 }}>
                    <NavLink to={'pre'} onClick={(e) => {
                        e.preventDefault();
                        navigate(getPrevious());
                    }}>⏮️</NavLink>
                    {navOptions
                    .map((opt) => (
                        <NavLink
                            key={opt.path}
                            to={opt.path}>
                            {opt.label}
                        </NavLink>
                    ))}
                </div>
            </header>
            <Outlet/>
        </div>
    );
}
