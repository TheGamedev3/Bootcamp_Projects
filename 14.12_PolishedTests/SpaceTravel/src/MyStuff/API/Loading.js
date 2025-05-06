

const queue=[];

export function Loading(name){
    const myInst = {name};
    queue.push(myInst);
    updLoadState();

    // done loading
    return()=>{
        const i = queue.indexOf(myInst);
        if(i !== -1){
            queue.splice(i,1);
            updLoadState();
        }
    }
}

import { fireSignal } from "./Events";
export var loadState={loading:false, reason:''};
function updLoadState() {
    if (queue.length === 0) {
        loadState = { loading: false, reason: '' };
    } else {
        loadState = { loading: true, reason: queue[0].name };
    }

    fireSignal('loading', loadState);
}
