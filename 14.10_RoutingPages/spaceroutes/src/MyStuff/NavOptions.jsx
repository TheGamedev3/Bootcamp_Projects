
import React, { lazy } from 'react';

const Encycle = lazy(() => import('./Pages/Encycle'));
const Earth = lazy(() => import('./Pages/Earth'));
const Mars = lazy(() => import('./Pages/Mars'));
const Jupiter = lazy(() => import('./Pages/Jupiter'));

const navOptions = [
    {label: '🏠', path: 'info', component:()=><Encycle/>},
    {
        label: 'Earth', path: 'earth', component:()=><Earth/>,
        moons:1,
        order:3,
        atmosphere:'normal',
        size:"biggest of the terrestrial planets"
    },
    {
        label: 'Mars', path: 'mars', component:()=><Mars/>,
        moons:2,
        order:4,
        atmosphere:'weak',
        size:"smaller than earth..."
    },
    {
        label: 'Jupiter', path: 'jupiter', component:()=><Jupiter/>,
        moons:97,
        order:5,
        atmosphere:'HEAVY',
        size:"ENORMOUS!!!"
    }
];

export default navOptions;