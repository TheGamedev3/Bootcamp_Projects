
import { spaceString } from "./API_Bridge";
import { createCraft, getPlanetByName, getCraftByName } from "./Methods";
import * as Hooks from './Hooks';
import { readyUp } from "./Events";

const OuterSpace2={
    ready:false,

    spaceString,
    createCraft,
    getPlanetByName, getCraftByName,
    readyUp,

    ...Hooks,

    planets:null, spacecrafts:null
}

import { ProcessData } from "./API_Bridge";
import { fireSignal } from "./Events";
async function startup(){
    const data = await ProcessData();
    Object.assign(OuterSpace2, data);
    data.ready = true;
    fireSignal('ready');
}
startup();

export default OuterSpace2;