
import { spaceString } from "./API_Bridge";
import { readyUp } from "./Events";

import * as Hooks from './Hooks';
import * as Functions from './Functions';


const OuterSpace2={
    ready:false,

    spaceString,
    
    readyUp,

    ...Functions, ...Hooks,

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