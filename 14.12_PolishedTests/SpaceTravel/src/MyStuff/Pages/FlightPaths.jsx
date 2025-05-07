

import FullPlanet from "./SpaceComponents/FullPlanet";
import OuterSpace2 from "../API/OuterSpace2";
export default function FlightPaths(){
    const planets = OuterSpace2.usePlanets();
    return(
        <div>
            {planets && planets.map((planet, i)=><FullPlanet planet={planet} key={i}/>)}
        </div>
    );
}