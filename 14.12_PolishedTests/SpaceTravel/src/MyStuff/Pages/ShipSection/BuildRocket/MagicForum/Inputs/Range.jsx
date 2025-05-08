


import useInputs from "../Shared/InputHook";

export default function Paragraph({
    id, defaultVal,
    min=0, max=100,
    style={}
}){
    const[val, update]=useInputs({id, defaultVal:defaultVal||min});

    return(
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', ...style }}>
            <div style={{ fontWeight: 'bold', width: '0ch', textAlign: 'left' }}>
                {val}
            </div>
            <input
                type="range"
                id={id}
                value={val}
                min={min} max={max}
                onChange={(e) => update(Number(e.target.value))}
            />
        </div>
    );
}
