
import DataDisplay from "./MyNavInfo";
export default function Jupiter(){
    return(
        <div style={{
            backgroundColor:'#b17a4d',
            minHeight: '100%',
            flex: 1, height: 0, overflow: 'auto'
        }}>
            {'\n'}
            <h2><b>🏀PLANET JUPITER</b></h2>

            This planet is THE MOST ENORMOUS!!!
            Galileo discovered 4 of its moons, "Io", "Eropa", "Ganymede", & "Callisto"

            <DataDisplay/>
        </div>
    );
}
