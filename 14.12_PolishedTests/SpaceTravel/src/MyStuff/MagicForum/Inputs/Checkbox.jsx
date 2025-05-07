

import useInputs from "../Shared/InputHook";
import HtmlFor from "../Shared/HtmlFor";

export default function Checkbox({
    id, defaultVal=false,
    style={}, inputStyle={},
    leftText, rightText
}){
    const[val, update]=useInputs({id, defaultVal});

    return(
        <HtmlFor
            id={id} style={style}
            leftText={leftText} rightText={rightText}
        >
            <input
                id={id}
                type='checkbox' checked={val}
                style={inputStyle}
                onChange={(e)=>update(e.target.checked)}
            />
        </HtmlFor>
    );
}
