

import { useEffect, useState, useRef } from "react";
import Outerspace from "./Outerspace";

export default function RadarLogic(){

    const [_upd, updater]=useState(0);
    const updateInfo=()=>updater((pre)=>pre+1);

    const spaceInfo = useRef({
        stars:[],
        hoverStack:[],
        reselectStar(){
            const currentlyHovering = this.hoverStack.length > 0 ? this.hoverStack[0] : null
            if(this.selectedStar === currentlyHovering){return}
            this.selectedStar = currentlyHovering;
            updateInfo();
        },
        hoverAdd(star){
            const find = this.hoverStack.indexOf(star);
            if(find === -1){
                this.hoverStack.push(star);
            } this.reselectStar();
        },
        hoverRemove(star){
            const find = this.hoverStack.indexOf(star);
            if(find !== -1){
                this.hoverStack.splice(find, 1);
            } this.reselectStar();
        },
        clickedStar(star){
            if(this.selectedStar === star){

                this.hoverRemove(star);

                const find = this.stars.indexOf(star);
                if(find !== -1){
                    this.stars.splice(find, 1);
                }
                updateInfo();
            }
        },
        selectedStar:null,
    });
    useEffect(()=>{
        const space = spaceInfo.current;
        const starCreator = setInterval(()=>{
            space.stars.push({});
            updateInfo();
            console.log('created star!');
        },1000);
        return()=>clearInterval(starCreator);
    },[]);

    return (
        spaceInfo.current
          ? <Outerspace spaceInfo={spaceInfo.current} />
          : <div>Loading...</div>
    );      
}
