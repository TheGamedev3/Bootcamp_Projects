

import InputTypes from "./InputTypes";
import { useReducer } from "react";

export default function MagicInput({datum}){
    const inputType = InputTypes[datum.type];
    const [val, dispatch] = useReducer(
        (state, action) => {
        switch (action.type) {
            case 'SET':
            datum.value = action.payload;
            return action.payload;
            default:
            return state;
        }
        },
        null,
        () => datum.reset()
    );
    datum.Reset=()=>{
        dispatch({ type: 'SET', payload: datum.reset() })
    }
    return(
        <div style={{
            border: datum.hasError ? '3px solid red' : '3px solid white',
            padding:'3px 3px',
            width:'100%'
        }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.4rem',}}>
                {datum.name && <label htmlFor={datum.index}><b>{datum.name}</b></label>}
                {inputType.create(val, (value) => dispatch({ type: 'SET', payload: value }), datum)}
                {datum.rightName && <label htmlFor={datum.index}><b>{datum.rightName}</b></label>}
            </div>
            {datum.hasError && <div style={{color:'red'}}><b>{datum.hasError}</b></div>}
        </div>
    );
}

