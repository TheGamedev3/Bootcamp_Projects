


import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRouteListener } from './History';
import navOptions from './NavOptions';

export default function RouteSelector(){
    useRouteListener();
    return(
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {[...navOptions].map(({ path, component }, i) => (
            <Route key={path || i} path={path} element={component()} />
          ))}
        </Routes>
      </Suspense>
    );
}
