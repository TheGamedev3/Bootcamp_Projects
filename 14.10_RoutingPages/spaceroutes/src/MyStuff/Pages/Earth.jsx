
import DataDisplay from "./MyNavInfo";
export default function Earth(){
    return(
        <div style={{
            backgroundColor:'#388157',
            minHeight: '100%'
        }}>
            {'\n'}
            <h2><b>🌎PLANET EARTH</b></h2>

            This planet is very blue and green! 🌊🌱
            And has tons of life!

            <DataDisplay/>
        </div>
    );
}
