
import DataDisplay from "./MyNavInfo";

export default function MARS(){
    return(
        <div style={{
            backgroundColor:'#a82105',
            minHeight: '100%',
            flex: 1, height: 0, overflow: 'auto'
        }}>
            {'\n'}
            <h2><b>🔴PLANET MARS</b></h2>

            This planet is very red! 🛑
            And has two moons!

            <DataDisplay/>
        </div>
    );
}
