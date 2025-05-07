

import Planet from "./SpaceComponents/Planet";
import OuterSpace2 from "../API/OuterSpace2";
export default function Planets(){
    const planets = OuterSpace2.usePlanets();
    return(
        <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 150px)',
            gridAutoRows: '220px',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'start'
        }}          
        >
        {planets && planets.map((planet, i) => (
            <Planet planet={planet} key={i} />
        ))}
        </div>
    );
}
