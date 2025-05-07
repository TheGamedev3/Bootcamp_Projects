import {
    BrowserRouter,
    Routes, Route, Link,
    useNavigate, useLocation
} from 'react-router-dom';

import FreezeWrapper from "./FreezeWrapper";
import FlightPaths from '../Pages/FlightPaths';
import OuterSpace2 from "../API/OuterSpace2";

import { Row } from '../Pages/SpaceComponents/Card';
import React, { Suspense } from 'react';

import routeList from './RouteList';

function Router(){
    const{loading} = OuterSpace2.useLoadings();
    const navigate = useNavigate();

    return(
        <div style={{
            textAlign: 'center', gap: '0px',
            width:'100%', height:'100%',
            display: 'flex', flexDirection:'column',
            overflow:'hidden',
            filter: loading ? 'blur(4px)' : 'none',
            transition: 'filter 0.3s ease',
        }}>

            <Row style={{
                backgroundColor:'black',
                color: 'white',
                fontSize: '2rem',
                padding:'10px 10px',
                justifyContent: 'center'
            }}>
                <nav style={{
                    display: 'flex', justifyContent: 'center', gap: '40px'
                }}>
                    <Link to="/back" onClick={(e)=>{
                        e.preventDefault();
                        navigate(-1);
                    }}>🔙</Link>

                    {routeList.map(({path, title},i)=>(
                        <Link to={path} key={i}>{title}</Link>
                    ))}
                </nav>
            </Row>
            
            <main style={{ position: 'relative', maxWidth: '100%', height: '100%', overflow: 'hidden', padding:'0px 40px' }}>
                {/* Scrollable content */}
                <div
                    style={{
                        overflowY: 'auto',
                        maxWidth: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        padding: '1rem',
                    }}
                    >
                    <Suspense fallback={<div></div>}>
                        <Routes>
                        {routeList.map(({ path, title, element, sub }, i) => (
                            <Route path={path} key={i} element={element?.() || <div>{`@${title}`}</div>}>
                            {sub?.map(({ path: subPath, element: subElement }, j) => (
                                <Route path={subPath} key={j} element={subElement()} />
                            ))}
                            </Route>
                        ))}
                        </Routes>
                    </Suspense>
                </div>
            </main>
        </div>
    );
}

export default function SiteRoutes(){
    return(
        <FreezeWrapper>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </FreezeWrapper>
    );
}

