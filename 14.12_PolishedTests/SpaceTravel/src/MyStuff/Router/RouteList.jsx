

import React from 'react';

const Flights=React.lazy(() => import('../Pages/FlightPaths'));
const Planets=React.lazy(() => import('../Pages/Planets'));

const Ships=React.lazy(() => import('../Pages/ShipSection/Ships'));
const Desc=React.lazy(() => import('../Pages/ShipSection/Desc'));
const List=React.lazy(() => import('../Pages/ShipSection/List'));

const routeList=[
    {path:'/', title:'🏠 Home'},
    {path:'/flights', title:'✈️ Flights', element:()=><Flights/>},
    {path:'/planets', title:'🌎 Planets', element:()=><Planets/>},
    {path:'/ships', title:'🚀 Ships', element:()=><Ships/>, sub:[
        {path:'', element:()=><List/>},
        {path:'create', element:()=><div>Creation</div>},
        {path:'description/:id', element:()=><Desc/>},
    ]},
];

export default routeList;