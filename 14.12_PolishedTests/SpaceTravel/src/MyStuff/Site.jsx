

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import FlightPaths from "./Pages/FlightPaths";
import OuterSpace2 from "./API/OuterSpace2";
import FreezeWrapper from "./Router/FreezeWrapper";

import SiteRoutes from "./Router/Routes";

export default function Site(){

    /*
    const planets = OuterSpace2.usePlanets();
    const str = JSON.stringify(planets, null, 2);
    // <div style={{whiteSpace:'pre-wrap'}}>{str}</div>

    const loadState = OuterSpace2.useLoadings();

    OuterSpace2.useOnce(async()=>{
        await OuterSpace2.readyUp();
        const pris = OuterSpace2.getCraftByName('prispax');
        const planet = OuterSpace2.getPlanetByName('neptune');
        await pris.sendTo(planet);

        await new Promise(res=>setTimeout(res,1000))
        await OuterSpace2.createCraft({
            name:'The HMS kipper',
            description:'nothing here',
            capacity:500
        });
    });
    */

    return (
        <SiteRoutes/>
    );
}
