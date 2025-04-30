
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export var history=[];

export function useRouteListener(){
    const location = useLocation();
    useEffect(() => {
        const atPage = location.pathname;
        if(goneBack === atPage){
            goneBack = null;
            if(history.length === 1){console.log("[AT START]")}
            console.log("<<", atPage);
            return;
        }
        if((history.length !== 0 && history[history.length-1] === atPage)){return}
        if(history.length === 0){console.log("[START]")}
        history.push(atPage); console.log(atPage)
    }, [location.pathname]);
}

var goneBack = null;
export function getPrevious(){
    if(history.length===0){return'info'}
    if(history.length<2){return history[0]}
    history.pop();
    goneBack = history[history.length-1];
    return goneBack;
}
