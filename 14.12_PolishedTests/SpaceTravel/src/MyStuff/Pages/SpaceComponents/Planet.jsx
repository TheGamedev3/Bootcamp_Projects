
import ObjectWrap from "./ObjectWrapper";

import {
  Card,
  Header, Profile, Subtitle
} from "./Card";

export default function Planet({bevel=8, size=150, onClick, planet, selected}){
  const pop = planet.currentPopulation;
  return(
      <ObjectWrap object={planet}>
        <Card
            bevel={bevel} size={size}
            onClick={onClick}
            style={{height:'220px'}}
            selectedStyle={{borderColor:'cyan'}}
            selected={selected}
            id={planet.name}
        >
            <Header title={planet.name}/>
            <Profile url={planet.pictureUrl}/>
            <Subtitle text={pop > 0 && `🙂 (${pop})`} size={0.7}/>
        </Card>
      </ObjectWrap>
  );
}