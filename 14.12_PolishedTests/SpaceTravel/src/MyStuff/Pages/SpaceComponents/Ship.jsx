
import {
  Card,
  Header, Profile, Subtitle
} from "./Card";

export default function Ship({bevel=8, size=150, onClick, ship}){

  const myPfp = ship.pictureUrl || 'https://th.bing.com/th/id/OIP.K15zdMQUpDP92j5PUnm2NAHaEK?cb=iwp1&rs=1&pid=ImgDetMain'

  return(
      <Card
          bevel={bevel} size={size}
          onClick={onClick}
          style={{height:'220px'}}
      >
        <Header title={ship.name} size='1'/>
        <Subtitle color='orangered' text={`@${ship.getMyPlanet().name}`} size='.9'/>
        <Profile url={myPfp}/>
      </Card>
  );
}