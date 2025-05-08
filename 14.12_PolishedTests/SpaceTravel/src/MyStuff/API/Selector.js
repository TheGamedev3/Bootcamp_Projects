
export const selected = {ship: null, planet: null}

import { fireSignal } from "./Events";
import OuterSpace2 from "./OuterSpace2";

export function selectObject(object){

    const{ship, planet} = selected;
    if(ship && planet){return}

    const shipObject = OuterSpace2.getCraftById(ship);
    if(ship && (object === shipObject?.getMyPlanet())){return}
    if(ship && (!shipObject || shipObject?.deleted)){selected.ship = null}

    if(object.type === 'spacecraft' && ship !== object){
        selected.ship = object.id;
    }else if(object.type === 'planet' && ship !== null && planet === null){
        selected.planet = object.id;
    }else{return}

    fireSignal('moveTargetsChanged', selected);

    if(shipObject && selected.planet !== null){
        (async()=>{
            const planetObj = OuterSpace2.getPlanetById(selected.planet);
            await shipObject.sendTo(planetObj);
            resetSelection();
        })()
    }
}

export function resetSelection(){
    selected.ship = null; selected.planet = null;
    fireSignal('moveTargetsChanged', selected);
}