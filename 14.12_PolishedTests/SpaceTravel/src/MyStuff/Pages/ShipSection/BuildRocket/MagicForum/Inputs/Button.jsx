


import toSafeId from "../Shared/SafeId";

export default function Button({
    onClick=()=>{},
    enabled=true,
    text='button', style={}
}){
    return(
        <button
            id={toSafeId(text)+'-btn'}
            style={style}
            disabled={!enabled}
            onClick={onClick}
        >{text}</button>
    );
}
