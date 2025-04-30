


import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRouteListener } from './History';
import navOptions from './NavOptions';

import Site from './Site2';

export default function RouteSelector(){
    useRouteListener();
    return(
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<Site />}>
                {[...navOptions].map(({ path, component }, i) => (
                    <Route key={path || i} path={path} element={component()} />
                ))}
                <Route path='pre' element={null}/>
            </Route>
        </Routes>
      </Suspense>
    );
}
