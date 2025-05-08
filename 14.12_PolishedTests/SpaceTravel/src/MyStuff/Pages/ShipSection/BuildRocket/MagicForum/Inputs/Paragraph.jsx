


import useInputs from "../Shared/InputHook";

export default function Paragraph({
    id, defaultVal='', 
    style={}, placeholder='placeholder'
}){
    const[val, update]=useInputs({id, defaultVal});

    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            ...style
        }}>
            <textarea
                id={id}
                value={val}
                placeholder={placeholder}
                style={{width: '100%',}}
                rows={6}
                onChange={(e)=>update(e.target.value)}
            />
        </div>
    );
}
