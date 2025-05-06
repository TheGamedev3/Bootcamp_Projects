

const listeners={}
export function listenFor(signal, func){
    (listeners[signal]??=new Set()).add(func);

    return()=>listeners[signal]?.delete(func);
}

export function fireSignal(signal, ...values){
    listeners[signal]?.forEach(func=>func(...values))
}

import OuterSpace2 from "./OuterSpace2";
export async function readyUp(){
    if(OuterSpace2.ready){return}
    await new Promise(res=>listenFor('ready',res));
    delete listeners['ready'];
    return;
}
