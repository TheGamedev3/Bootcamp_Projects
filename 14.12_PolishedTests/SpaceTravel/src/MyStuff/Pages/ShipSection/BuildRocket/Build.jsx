


import OuterSpace2 from "../../../API/OuterSpace2";
import { Page, ButtonRow, Row } from "../../SpaceComponents/Card";
import {SmartBackButton} from "../Buttons";


import {
    Fourm,
    SingleLine, Number, Paragraph,
} from "./MagicForum/Shared/ObtainAll";

import BuildButton from "./BuildButton";
import Template from "./Template";
import { Templates, BuildForum } from "./Info";

export default function Build(){
    const ready = OuterSpace2.useReady();
    return(
        <>
            <ButtonRow style={{padding:'5px 10px'}}>
                <SmartBackButton/>
            </ButtonRow>
            <Page>
                {ready
                ? (
                    <div>
                        <header style={{
                            fontSize:'3rem',
                            marginBottom:'20px'
                        }}>{`🚀 Create a new ship!`}</header>
                        
                        <Fourm forumObject={BuildForum}>
                            
                            <div style={{
                                padding:'0px 10px',
                                width:'100%',
                                display:'flex',
                                flexDirection:'column',
                                gap:'20px'
                            }}>

                                <SingleLine id='name' leftText='Name:' placeholder='[enter name]' />
                                <Number id='capacity' leftText='Capacity:' placeholder='[enter capacity]' defaultVal={0} />
                                <SingleLine id='picture' inputStyle={{flex:1}} leftText='PictureURL:' placeholder='[enter picture]' defaultVal='https://th.bing.com/th/id/OIP.K15zdMQUpDP92j5PUnm2NAHaEK?cb=iwp1&rs=1&pid=ImgDetMain' />
                                
                                <Paragraph id='description' placeholder='[enter description]' defaultVal={''} />
                                
                                <div style={{
                                    justifyContent:'center',
                                    width:'100%',
                                    display:'flex',
                                    marginTop:'0px'
                                }}><BuildButton/></div>

                            </div>

                            <h2 style={{
                                fontSize:'2rem',
                                marginTop:'40px',
                                marginBottom:'20px'
                            }}>{`🚀 Templates`}</h2>

                            <Row style={{gap:'10px'}}>
                                {Templates.map((info,i)=><Template info={info} key={i}/>)}
                            </Row>
                        </Fourm>
                    </div>
                )
                :(<div>⌛ loading...</div>)}
            </Page>
        </>
    );
}
