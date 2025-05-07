

import OuterSpace2 from "../../API/OuterSpace2";
export default function ObjectWrap({object, children}){
    return(
        <OuterSpace2.ObjectContext.Provider value={object}>
            {children}
        </OuterSpace2.ObjectContext.Provider>
    );
}
