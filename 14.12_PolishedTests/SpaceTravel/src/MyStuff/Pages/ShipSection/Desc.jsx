

import OuterSpace2 from "../../API/OuterSpace2";
import { Row } from "../SpaceComponents/Card";
import { useParams } from "react-router-dom";

export default function Desc(){
    const { id } = useParams();
    const ready = OuterSpace2.useReady();
    const spacecraft = OuterSpace2.getCraftById(id);
    const name = spacecraft?.name;
    const url = spacecraft?.pictureUrl || 'https://th.bing.com/th/id/OIP.K15zdMQUpDP92j5PUnm2NAHaEK?cb=iwp1&rs=1&pid=ImgDetMain';
    
    return(
        <Row>
            <div style={{
                width:'100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                textAlign: 'center',
                rowGap:'10px',
                }}>
                    {spacecraft
                    ? (
                        <>
                            <header style={{
                                fontSize:'3rem',
                            }}>{name}</header>

                            <div style={{
                                textAlign:'center',
                                fontSize:'2rem',
                                color:'orangered'
                            }}>{`@${spacecraft.getMyPlanet().name}`}</div>

                            {url && (
                            <img
                                src={url}
                                alt={name}
                                style={{
                                    width: '500px', height: 'auto',
                                    borderRadius: '4px',
                                }}
                            />
                            )}

                            <div style={{
                                textAlign:'left',
                                width:'80%',
                                fontSize:'2rem',
                            }}>{spacecraft.description}</div>
                        </>
                    )
                    :(
                        ready
                        ?<div>spacecraft 404!</div>
                        :<div>searching...</div>
                    )}
            </div>
        </Row>
    );
}