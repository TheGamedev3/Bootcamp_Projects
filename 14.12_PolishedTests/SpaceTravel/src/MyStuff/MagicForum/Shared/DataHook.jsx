import { useEffect, useState } from "react";


import { useFourm } from "./FourmContext.js";

export default function useInputs(...ids){
    
    const obj = useFourm().obj.current;
    const getValues=()=>{
        return(ids.map(id=>obj[id]));
    }
    const[vals, setVal]=useState(getValues());
    const update=()=>{
        setVal(getValues());
    }

    useEffect(()=>{
        ids.forEach((id)=>
            obj.changed(id, update));
        return()=>{
            ids.forEach((id)=>
                obj.unchanged(id, update));
        };
    },[]);

    return[...vals];
}
