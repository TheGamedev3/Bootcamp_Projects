import { useRef } from "react";

import { FourmContext } from "./FourmContext.js";

export default function Fourm({children, style, forumObject}){
    const obj = useRef(forumObject);
    return(
        <FourmContext.Provider value={{obj}}>
            <div style={style}>
                {children}
            </div>
        </FourmContext.Provider>
    );
}
