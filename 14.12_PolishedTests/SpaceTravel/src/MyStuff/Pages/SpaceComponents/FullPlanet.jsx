

import OuterSpace2 from "../../API/OuterSpace2";
import ObjectWrap from "./ObjectWrapper";
import InjectShipDelete from "./ShipDelete";

import {
    Row, Card,
    Header, Profile 
} from "./Card";

function MiniCraft({ship}){
    const myPfp = ship.pictureUrl || 'https://th.bing.com/th/id/OIP.K15zdMQUpDP92j5PUnm2NAHaEK?cb=iwp1&rs=1&pid=ImgDetMain'
    const[isTargeted, targetMe] = OuterSpace2.useMoveTargets(ship);

    return(
        <ObjectWrap object={ship}>
            <InjectShipDelete>
                <Card
                    bevel={32} size={120}
                    onClick={()=>targetMe()}
                    selectedStyle={{borderColor:'cyan'}}
                    selected={isTargeted}
                    id={ship.name}
                >
                    <Header title={ship.name} size='0.8'/>
                    <Profile url={myPfp}/>
                </Card>
            </InjectShipDelete>
        </ObjectWrap>
    );
}

import Planet from "./Planet";
export default function FullPlanet({planet}){
    const crafts = OuterSpace2.useCraftsAtPlanet(planet);
    const[isTargeted, targetMe] = OuterSpace2.useMoveTargets(planet);
    return(
        <ObjectWrap object={planet}>
            <Row style={{gap:'10px'}}>
                <Planet
                    planet={planet}
                    bevel={16} size={150}
                    onClick={()=>targetMe()}
                    selected={isTargeted}
                />

                {crafts.map((ship, i)=>(
                    <MiniCraft
                        ship={ship}
                        key={`${planet.name}_${i}`}
                    />
                ))}

            </Row>
        </ObjectWrap>
    )
}