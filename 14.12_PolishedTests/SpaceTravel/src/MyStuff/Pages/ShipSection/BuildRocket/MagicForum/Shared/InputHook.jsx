import { useEffect, useState } from "react";


import { useFourm } from "./FourmContext.js";

export default function useInputs({
    id, defaultVal
}){
    
    const obj = useFourm().obj.current;

    const[val, setVal]=useState(
        obj[id] === undefined
        ? defaultVal : obj[id]
    );

    const update=(val)=>{
        setVal((pre)=>{
            val = typeof val === 'function'
            ? val(pre) : val;
            return val;
        });
    }

    useEffect(()=>{
        obj.setters[id] = setVal;
        obj.defaults[id] =defaultVal;
        return()=>{
            delete obj.setters[id];
            delete obj.defaults[id];
        };
    },[]);

    useEffect(()=>{
        obj[id] = val;
        obj.changedId(id);
    }, [val]);

    return[val, update];
}