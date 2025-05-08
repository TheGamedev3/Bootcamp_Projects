

import useInputs from "../Shared/InputHook";
import toSafeId from "../Shared/SafeId";

export default function Collapser({
    text='collapse', defaultVal=false,
    style={}, children
}){
    const[val, update]=useInputs({id: text, defaultVal});

    return(
        <div>
            <button
                id={toSafeId(text)+'-col'}
                style={{
                    padding:'0px 5px',
                    ...style}}
                onClick={()=>update((pre)=>!pre)}
            >{val ? '⬇️' : '➡️'}{text}</button>
            {val && children}
        </div>
    );
}
