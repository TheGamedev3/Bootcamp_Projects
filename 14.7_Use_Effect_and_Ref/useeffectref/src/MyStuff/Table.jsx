
import { useState, useEffect, useRef } from "react";

import ActionBtn, { darkenColor } from "./ActionBtn";

import Magic_Proxy from "./MagicProx.js";
import {reshuffleAll, drawCard} from "./CardDeck.js";

export default function Table(){

    const[ready, setReady]=useState(false);
    const[remaining, setRemaining]=useState(false);
    const[cardElements, setCards]=useState([]);

    const[canDraw, setCanDraw]=useState(false);
    const[shuffling, setShuffling]=useState(false);

    const[flowing, setFlowing]=useState(false);

    const flowOff={
        text:'draw flow',
        color:'turquoise'
    }
    const flowOn={
        text:'flowing...',
        color:darkenColor('turquoise')
    }

    const flowRef = useRef({
        onOff:false,
        ...flowOff
    });
    const setFlow=(bool)=>{
        const flower = flowRef.current;

        if(bool === 'toggle'){bool = !flower.onOff}
        if(flower.onOff === bool){return}
        flower.onOff = bool;
        Object.assign(flower, bool ? flowOn : flowOff);
        setFlowing(bool);

        if(bool){
            // set interval, keep drawing cards
            flower.interval=setInterval(() => {
                drawCard();
            }, 250);
        }else if(flower.interval){
            // stop interval drawing cards
            clearInterval(flower.interval);
            flower.interval = null;
        }
    }

    useEffect(()=>{
        const finish=[
            Magic_Proxy.listenFor('deckReady',
                (isReady)=>setReady(isReady)
            ),

            Magic_Proxy.listenFor('cardObjects',
                (cardArray)=>setCards(cardArray.map((card=>card.image)))
            ),

            Magic_Proxy.listenFor('remaining',
                (count)=>setRemaining(count)
            ),

            Magic_Proxy.listenFor('drawingEligible',
                (eligible)=>{
                    setCanDraw(eligible);

                    if(!eligible)setFlow(false);
                }
            ),

            Magic_Proxy.listenFor('shuffling',
                (shuffling)=>setShuffling(shuffling)
            ),
        ]
        return()=>finish.forEach(func=>func());
    },[]);

    return(
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>

        {(ready ? <>

            <div style={{
                flexGrow: 1,
                flexShrink: 1,
                width: '100%',
                overflowY: 'auto',
                backgroundColor: '#873e23',
                minWidth: 0,
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                padding: '20px',
                gap: '0px',
                boxSizing: 'border-box'
            }}>
            {cardElements.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`card-${i}`}
                    style={{
                        height: '140px',
                        marginBottom: '0px',
                        display: 'block'
                    }}
                />
            ))}
            </div>

            <div style={{
                width: '180px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // vertical centering
                alignItems: 'center',     // horizontal centering
                backgroundColor: 'gray',
                gap: '10px'                // spacing between elements
            }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <b>Remaining:<br /><div style={{fontSize:'1.5rem'}}>({remaining})</div></b>
                </div>
                <ActionBtn text={canDraw? "draw1" : "out of cards!"} color="orange" onClick={drawCard} enabled={canDraw && !flowing} />
                <ActionBtn text={shuffling? "shuffling..." : "reshuffle"} color="red" onClick={()=>{setFlow(false); reshuffleAll()}} enabled={!shuffling} />
                <ActionBtn text={canDraw? (flowRef.current.text) : "out of cards!"} color={flowRef.current.color} onClick={()=>setFlow('toggle')} enabled={canDraw} />
            </div>

            </> 

        : <div style={{
            display: 'flex',
            justifyContent: 'center',   // horizontal
            alignItems: 'center',       // vertical
            height: '100%',             // make sure it fills parent height
            width: '100%',              // optional, for symmetry
            textAlign: 'center'
          }}>
            <b>Preparing deck...</b>
          </div>
        )}

    </div>

    );
}
