

import navOptions from "../NavOptions";
import { useLocation } from "react-router-dom";
export function useNavInfo(){
    const location = useLocation();
    const found = navOptions.find((opt)=>opt.path === location.pathname);
    return(
        Object.fromEntries(
            Object.entries(found)
            .filter(([index, value])=>value && typeof value !== 'function')
        )
    );
}

export default function DataDisplay() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'left', whiteSpace: 'pre-wrap', color:"black" }}>
          {'\ndata set:\n'}
          <i>{JSON.stringify(useNavInfo(), null, 2)}</i>
        </div>
      </div>
    );
}
  