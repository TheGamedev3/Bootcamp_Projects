
import DataDisplay from "./MyNavInfo";

export default function MARS(){
    return(
        <div style={{
            backgroundColor:'#a82105',
            minHeight: '100%'
        }}>
            {'\n'}
            <h2><b>🔴PLANET MARS</b></h2>

            This planet is very red! 🛑
            And has two moons!

            <DataDisplay/>
        </div>
    );
}
