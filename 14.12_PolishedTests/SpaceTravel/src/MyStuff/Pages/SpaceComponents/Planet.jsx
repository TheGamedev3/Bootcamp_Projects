
import {
  Card,
  Header, Profile, Subtitle
} from "./Card";

export default function Planet({bevel=8, size=150, onClick, planet}){
  const pop = planet.currentPopulation;

  return(
      <Card
          bevel={bevel} size={size}
          onClick={onClick}
          style={{height:'220px'}}
      >
          <Header title={planet.name}/>
          <Profile url={planet.pictureUrl}/>
          <Subtitle text={pop > 0 && `🙂 (${pop})`} size={0.7}/>
      </Card>
  );
}