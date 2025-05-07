

import FullPlanet from "./SpaceComponents/FullPlanet";
import OuterSpace2 from "../API/OuterSpace2";
export default function FlightPaths(){
    const planets = OuterSpace2.usePlanets();
    OuterSpace2.useFlightPage(); // resets selection targets on leave
    return(
        <div>
            {planets && planets.map((planet, i)=><FullPlanet planet={planet} key={planet.id}/>)}
            {/* RECALCULATE THE KEY EACH TIME OR ELSE IT WONT UPDATE */}
        </div>
    );
}