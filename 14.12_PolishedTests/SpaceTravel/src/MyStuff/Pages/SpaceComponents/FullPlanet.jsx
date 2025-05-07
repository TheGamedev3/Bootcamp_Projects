

import OuterSpace2 from "../../API/OuterSpace2";

import {
    Row, Card,
    Header, Profile, Subtitle
} from "./Card";

var currentCraft = null;

function MiniCraft({ship}){
    const myPfp = ship.pictureUrl || 'https://th.bing.com/th/id/OIP.K15zdMQUpDP92j5PUnm2NAHaEK?cb=iwp1&rs=1&pid=ImgDetMain'

    return(
        <Card
            bevel={32} size={120}
            //colors={{text:'black', back:'#C6C8CA', border:'white'}} //{text:'black', back:'#C6C8CA', border:'white'}
            onClick={()=>{currentCraft = ship}}
        >
            <Header title={ship.name} size='0.8'/>
            <Profile url={myPfp}/>
        </Card>
    );
}

import Planet from "./Planet";
export default function FullPlanet({planet}){
    const pop = planet.currentPopulation;
    const crafts = OuterSpace2.useCraftsAtPlanet(planet);

    return(
        <Row>
            <Planet
                planet={planet}
                bevel={16} size={150}
                onClick={()=>{currentCraft?.sendTo(planet)}}
            />

            {crafts.map((ship, i)=>(
                <MiniCraft
                    ship={ship}
                    key={`${planet.name}_${i}`}
                />
            ))}

        </Row>
    )
}