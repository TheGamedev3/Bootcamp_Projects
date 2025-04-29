
import { useState } from "react";

import Player from "./Player";
import Fire from "./Fire";
import Leaderboard from "./Leaderboard";

export default function Field(){

    const original={
        goodGuyHealth:100,
        badGuyHealth:100,
        began:true,
        roundOver:false
    }
    const [stats, resetStats]=useState(original);

    const applyDamage=(changeFunc)=>{
        if(stats.roundOver){return}

        if(stats.began){stats.began = false}
        changeFunc(stats);

        const isAlive=(who)=>{
            if(stats[who] <= 0){
                stats.roundOver = true;
                stats[who] = 0;
            }
        }
        isAlive('badGuyHealth');
        isAlive('goodGuyHealth');

        resetStats({...stats});
    }

    function rngDamage(){
        const [min, max] = [6, 13];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const onFire=()=>{
        console.log("FIRING!!!", stats);

        if(stats.roundOver){
            resetStats(original);
            return;
        }

        // first the bad guy
        applyDamage((stats)=>stats.badGuyHealth-=rngDamage());

        // then the good guy
        applyDamage((stats)=>stats.goodGuyHealth-=rngDamage());
    }

    return(
        <>
            <Leaderboard stats={stats}/>
            <Player
                name='good guys'
                color='green'
                health={stats.goodGuyHealth}
                styling={{
                    position: 'absolute',
                    left: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
            />
            <Fire
                text={stats.roundOver ? 'retry?' : 'FIRE!!!'}
                color={stats.roundOver ? 'blue' : 'goldenrod'}
                onClick={onFire}
                enabled={true}
                styling={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                }}
            />
            <Player
                name='bad guys'
                color='red'
                health={stats.badGuyHealth}
                styling={{
                    position: 'absolute',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
            />
        </>
    );
}