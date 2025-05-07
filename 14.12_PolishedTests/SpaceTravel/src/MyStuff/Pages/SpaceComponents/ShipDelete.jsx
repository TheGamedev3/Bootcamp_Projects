

import { HoverWrapper } from "./Card";
import OuterSpace2 from "../../API/OuterSpace2";
export default function InjectShipDelete({children}){
    const ship = OuterSpace2.useMyself();
    
    return(
        <HoverWrapper
            hoverButton={{
                content: '❌',
                onClick: async() => await ship.destroy()
            }}
        >{children}</HoverWrapper>
    );
}