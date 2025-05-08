

import { Card, Header, Profile } from "../../SpaceComponents/Card";
import {
    useFourm
} from "./MagicForum/Shared/ObtainAll";
import { defaults } from "./Info";

export default function Template({info}){
    info = Object.assign(Object.assign({},defaults),info);

    const forumref = useFourm();
    const fillForum=()=>{
        const forum = forumref?.obj?.current;
        if(!forum){return}

        Object.entries(info).forEach(([index, value])=>{
            forum.set(index, value);
        })
    }
    return(
        <Card
            onClick={fillForum}
            style={{height:'130px'}}
        >
            <Header title={info.title || info.name} size='0.8'/>
            <Profile url={info.picture}/>
        </Card>
    );
}
