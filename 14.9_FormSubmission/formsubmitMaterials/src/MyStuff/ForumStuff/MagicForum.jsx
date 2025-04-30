

import { useEffect, useRef, useState } from "react";
import MagicInput from "./MagicInput";
import InputTypes from "./InputTypes";

export default function ForumList({ AddMaterial, forumAsks }){
    const forumAsking = useRef(null);
    const [, rerender2] = useState(0);
    const rerender=()=>rerender2((pre)=>pre+1);

    const submitCycle=(e)=>{
        if(e){e.preventDefault()}

        const forum = forumAsking.current;
        if(!forum){return}

        let errorLess = true;
        forum.forEach(datum=>{
            const checker = datum.isValid || InputTypes[datum.type].isValid;
            if(!checker){return}
            const result = checker(datum.value);
            if(result === true){
                delete datum.hasError;
            }else{
                errorLess = false;
                datum.hasError = result;
            }
        });
        if(errorLess){
            // export the completed object
            const exportedObject = Object.fromEntries(
                forum.map(datum=>[datum.index, datum.value])
            );
            console.log('once')
            AddMaterial(exportedObject);
            forum.forEach(datum=>datum.Reset());
        }
        rerender();
    }
    useEffect(()=>{
        forumAsks.forEach(datum=>{
            datum.reset=()=>{
                let val = datum.defaultValue !== undefined
                    ? datum.defaultValue
                    : InputTypes[datum.type].defaultValue;
                if(typeof val === 'function'){val=val(datum)}
                datum.value = val;
                delete datum.errors;
                return val;
            }
        });
        forumAsking.current = forumAsks;
        rerender();
    },[]);
    if(!forumAsking.current){return<div>loading...</div>}
    return(
        <form
            onSubmit={submitCycle}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            {forumAsking.current.map((datum, i) => (
                <MagicInput datum={datum} key={i} />
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

