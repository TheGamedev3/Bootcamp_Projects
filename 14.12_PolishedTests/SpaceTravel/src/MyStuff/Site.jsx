

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import OuterSpace2 from "./API/OuterSpace2";

function Craft({craft}){
    return(
        <div>{'🚀'+craft.name}</div>
    )
}
function Planet({planet}){
    const crafts = OuterSpace2.useCraftsAtPlanet(planet);
    return(
        <div>
            <div>{planet.name}</div>
            {crafts.map((craft, i)=><Craft craft={craft} key={i}/>)}
        </div>
    )
}

export default function Site(){

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
    return(
        <div>
            {loadState.loading && loadState.reason}
            {planets && planets.map((planet, i)=><Planet planet={planet} key={i}/>)}
        </div>
    );

}
