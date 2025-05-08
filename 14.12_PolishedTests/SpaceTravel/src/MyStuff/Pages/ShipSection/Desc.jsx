

import { useParams } from "react-router-dom";

import OuterSpace2 from "../../API/OuterSpace2";
import { Page, ButtonRow } from "../SpaceComponents/Card";
import {SmartBackButton, ScrapButton} from "./Buttons";
import ObjectWrap from "../SpaceComponents/ObjectWrapper";

export default function Desc(){
    const { id } = useParams();
    const ready = OuterSpace2.useReady();
    const spacecraft = OuterSpace2.getCraftById(id);
    const name = spacecraft?.name;
    const url = spacecraft?.pictureUrl || 'https://th.bing.com/th/id/OIP.K15zdMQUpDP92j5PUnm2NAHaEK?cb=iwp1&rs=1&pid=ImgDetMain';
    
    return(
        <ObjectWrap object={spacecraft}>
            <ButtonRow style={{padding:'5px 10px'}}>
                <SmartBackButton/> <ScrapButton/>
            </ButtonRow>
            <Page>
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

                        <div style={{
                            textAlign:'center',
                            fontSize:'2rem',
                            color:'yellow'
                        }}>{`📦${spacecraft.capacity}`}</div>

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
            </Page>
        </ObjectWrap>
    );
}