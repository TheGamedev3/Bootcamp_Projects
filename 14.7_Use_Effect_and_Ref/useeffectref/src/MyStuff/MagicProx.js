

const Magic_Proxy = new Proxy({
    listeners:{},
    listenFor(prop, func){
        const array = (this.listeners[prop]??=[]);
        array.push(func);

        const val = this[prop];
        if(val !== undefined){func(val)}
        
        // returns unlisteners
        return()=>{
            const i = array.indexOf(func);
            if(i!==-1){array.splice(i,1)}
        }
    },
    triggerChange(prop){
        this.listeners[prop]
            ?.forEach(func=>func(this[prop]));
    }
},{

    get(target, index){return target[index]},
    set(target, index, value){
        if(target[index] === value){return true}
        target[index] = value;
        target.triggerChange(index);
        return true;
    }
});

export default Magic_Proxy;