

import Ship from "../SpaceComponents/Ship";
import OuterSpace2 from "../../API/OuterSpace2";
import { useNavigate } from "react-router-dom";

export default function ShipList(){
    const navigate=useNavigate();
    const ships = OuterSpace2.useSpacecrafts();
    return(
        <div>
            <button onClick={()=>navigate('create')}>Create New+</button>
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
                {ships && ships.map((ship, i) => (
                    <Ship
                        ship={ship} key={i}
                        onClick={()=>navigate(`description/${ship.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
