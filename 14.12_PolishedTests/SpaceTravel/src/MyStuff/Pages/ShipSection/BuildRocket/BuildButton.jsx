

import { Card, Header, Subtitle, Profile } from "../../SpaceComponents/Card";

import {
    useFourm, useInputs
} from "./MagicForum/Shared/ObtainAll";

import { useNavigate } from "react-router-dom";
import OuterSpace2 from "../../../API/OuterSpace2";

export default function BuildButton(){

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

    const avaliable = name && name.trim();

    return(
        <Card 
            onClick={async()=>{
                const forum = forumref?.obj?.current;
                if(!forum || !name){return}

                await OuterSpace2.createCraft({
                    name, capacity, pictureUrl:picture,
                    description
                });
                
                ids.forEach(id=>forum.reset(id));

                navigate('/ships');
            }}
            colors={
                avaliable
                ? {border:'cyan', text:'cyan', back:'black'}
                : {border:'red', text:'red', back:'black'}
            }
        >
            <Header title={
                name && name.trim()
                ? 'Create '+name
                : '[Name needed!]'
            } size='0.8'/>
            <Subtitle color='yellow' text={`📦${capacity}`} size='.9'/>
            <Profile url={picture}/>
        </Card>
    )
}
