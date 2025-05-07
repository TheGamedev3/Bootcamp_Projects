


import OuterSpace2 from "../../API/OuterSpace2";
import { Page, ButtonRow, Row, Card } from "../SpaceComponents/Card";
import {SmartBackButton} from "./Buttons";



import {
    Fourm,
    Collapser, Checkbox,
    SingleLine, Number, Paragraph,
    useFourm, useInputs
} from "../../MagicForum/Shared/ObtainAll";

import { Button } from "../SpaceComponents/Card";
import { useNavigate } from "react-router-dom";

function BuildButton(){

    const ids = [
        'name',
        'capacity',
        'picture',
        'description'
    ];
    const[
        name,
        capacity,
        picture,
        description
    ]=useInputs(...ids);
    const forumref = useFourm();

    const navigate = useNavigate();

    return(
        <Button
            text={'Create'}
            onClick={async()=>{
                const forum = forumref?.obj?.current;
                if(!forum){return}

                await OuterSpace2.createCraft({
                    name, capacity, pictureUrl:picture,
                    description
                });
                
                ids.forEach(id=>forum.reset(id));

                navigate('/ships');
            }}
        />
    )
}

const BuildForum = {
    setters:{}, defaults:{},
    set(id, val){
        this[id] = val;
        this.setters[id](val);
        this.changedId(id);
    },
    reset(id){
        this.set(id, this.defaults[id]);
    },
    events:{},
    changedId(id){
        if(this.events[id]){
            this.events[id].forEach(func=>func(this[id]));
        }
    },
    changed(id, listener){
        (this.events[id]??=new Set()).add(listener);
        listener(this[id]);
    },
    unchanged(id, listener){
        (this.events[id]??=new Set()).delete(listener);
    },
};

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

                            <Row></Row>
                        </Fourm>
                    </div>
                )
                :(<div>⌛ loading...</div>)}
            </Page>
        </>
    );
}
