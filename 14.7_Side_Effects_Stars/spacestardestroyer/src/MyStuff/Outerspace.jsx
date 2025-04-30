
import Star from "./Star"

export default function Outerspace({spaceInfo}){
    return(
        <div style={{backgroundColor:'#301934', height:'100vh', width:'100vw'}}>
            {spaceInfo.stars.map((starObj)=>{
            if (!starObj.pos) {
                starObj.pos = [
                    Math.random() * 80+10,
                    Math.random() * 80+10
                ];
            }
            return(<Star
                key={`${starObj.pos[0]}_${starObj.pos[1]}`}
                data={starObj}
                onHover={()=>spaceInfo.hoverAdd(starObj)}
                offHover={()=>spaceInfo.hoverRemove(starObj)}
                onClick={()=>spaceInfo.clickedStar(starObj)}
                isSelected={spaceInfo.selectedStar===starObj}
            />)})}
        </div>
    )
}
