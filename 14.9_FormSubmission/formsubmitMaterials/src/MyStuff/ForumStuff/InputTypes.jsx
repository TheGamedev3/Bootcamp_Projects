


const InputTypes={
    singleLine:{
        defaultValue:'',
        create(val, update, datum){
            return(
                <input
                    type='text'
                    value={val}
                    placeholder={datum.placeholder||''}
                    onChange={(e)=>update(e.target.value)}
                />
            );
        },
        // is empty
        isValid(val){
            return !val ? 'blank!' : true
        }
    },
    paragraph:{
        defaultValue:'',
        create(val, update, datum){
            return(
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <textarea
                        value={val}
                        placeholder={datum.placeholder||''}
                        onChange={(e)=>update(e.target.value)}
                    />
                </div>
            );
        },
        // is empty
        isValid(val){
            return !val ? 'blank!' : true
        }
    },
    checkbox:{
        defaultValue:false,
        create(val, update, datum){
            return(
                <input
                    type='checkbox'
                    checked={val}
                    placeholder={datum.placeholder||''}
                    onChange={(e)=>update(e.target.checked)}
                />
            );
        }
    },
    range:{
        defaultValue:(datum)=>datum.min||0,
        create(val, update, datum){
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
                <div style={{ fontWeight: 'bold', width: '0ch', textAlign: 'left' }}>
                    {val}
                </div>
                <input
                    type="range"
                    value={val}
                    min={datum.min}
                    max={datum.max}
                    onChange={(e) => update(Number(e.target.value))}
                />
              </div>
            );
        },
        isValid(val){
            return (!val || val === 0) ? 'must be more than 0!' : true
        }
    }
};

export default InputTypes;