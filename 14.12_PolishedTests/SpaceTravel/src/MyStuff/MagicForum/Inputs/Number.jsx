

import HtmlFor from "../Shared/HtmlFor";
import useInputs from "../Shared/InputHook";

export default function SingleLine({
    id, defaultVal='',
    style={}, inputStyle={}, placeholder='placeholder',
    leftText, rightText
}){
    const[val, update]=useInputs({id, defaultVal});

    return(
        <HtmlFor
            id={id} style={style}
            leftText={leftText} rightText={rightText}
        >
            <input
                style={inputStyle}
                id={id}
                type='number'
                value={val}
                placeholder={placeholder}
                onChange={(e)=>update(e.target.value)}
            />
        </HtmlFor>
    );
}
