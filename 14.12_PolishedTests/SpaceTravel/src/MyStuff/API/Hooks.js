
import { useEffect, useRef, useState } from "react";

import OuterSpace2 from "./OuterSpace2";
import { listenFor, readyUp } from "./Events";
import { loadState as currentLoadState } from "./Loading";

export function useLoadings(){
    const[loadState, setLoadState]=useState(currentLoadState);

    useEffect(()=>{
        return listenFor('loading',(newState)=>{setLoadState(newState)});
    },[]);

    return loadState;
}


export function useReady(){
    const{loading, reason} = useLoadings();
    return(!loading || reason !== 'fetching starter data...')
}


export function usePlanets(){
    const[planets, setPlanets]=useState(OuterSpace2.planets);

    useEffect(()=>{
        if(planets === null){
            (async()=>{
                await readyUp();
                setPlanets(OuterSpace2.planets);
            })();
        }
        return listenFor('planets', () => setPlanets(OuterSpace2.planets));
    },[]);

    return planets;
}


export function useSpacecrafts() {
    const [spacecraft, setCrafts] = useState(OuterSpace2.spacecrafts);

    useEffect(() => {
        let alreadyOff = false;
        let unlisten = () => {alreadyOff = true};

        (async () => {
            if (spacecraft === null) {
                await readyUp();
                setCrafts(OuterSpace2.spacecrafts);
            }

            unlisten = listenFor('crafts', (crafts) => setCrafts(crafts));
            if(alreadyOff){unlisten()}
        })();

        return () => {
            unlisten(); // Clean up listener on unmount
        };
    }, []);

    return spacecraft;
}



export function useCraftsAtPlanet(planet){
    const[myCrafts, setMyCrafts]=useState([]);

    const spacecraft = useSpacecrafts();
    useEffect(()=>{
        if(spacecraft !== null){
            setMyCrafts(
                spacecraft.filter(craft=>craft.isAtPlanet(planet))
            );
        }
    }, [spacecraft]);

    return myCrafts;
}

export function useOnce(func){
    const ref = useRef(null);

    useEffect(()=>{
        if(ref.current === null){
            ref.current = true;
            func();
        }
    }, []);
}


import { createContext, useContext } from 'react';

export const ObjectContext = createContext();

export function useMyself(){
    return useContext(ObjectContext);
}

import { selected, selectObject, resetSelection } from "./Selector";

// used in FullPlanet.jsx to control moving the ships around
export function useMoveTargets(object){

    const targetMe = ()=>selectObject(object);
    const evaluate=()=>{
        if(object.type==='spacecraft'){
            return selected.ship === object.id;
        }else if(object.type==='planet'){
            return selected.planet === object.id;
        }
    }
    const[isTargeted, setTargetState]=useState(evaluate());

    useEffect(() => {
        return listenFor(
            'moveTargetsChanged',
            () => setTargetState(evaluate())
        );
    }, []);

    return[isTargeted, targetMe];
}

export function useFlightPage(){
    useEffect(() => {
        return ()=>resetSelection();
    }, []);
}