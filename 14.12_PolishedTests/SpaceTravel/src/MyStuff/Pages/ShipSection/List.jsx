

import Ship from "../SpaceComponents/Ship";
import OuterSpace2 from "../../API/OuterSpace2";
import { useNavigate } from "react-router-dom";
import { Card, Header, Subtitle, Profile } from "../SpaceComponents/Card";

export default function ShipList(){
    const navigate=useNavigate();
    const ships = OuterSpace2.useSpacecrafts();
    return(
        <div>
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
                <Card
                    bevel={8} size={150}
                    onClick={()=>navigate('create')}
                    style={{height:'220px'}}
                    colors={{border:'lime', back:'black', text:'lime'}}
                    id={'Create New 🚀'}
                >
                    <Header title={'Create New 🚀'} size='1'/>
                    <Subtitle color='orangered' text={`@Earth`} size='.9'/>
                    <Profile url={'https://media.wtsp.com/assets/WTSP/images/9a1b5ac6-661d-49d1-bb7a-5e95f971008a/9a1b5ac6-661d-49d1-bb7a-5e95f971008a_750x422.jpg'}/>
                </Card>
            </div>
        </div>
    );
}
