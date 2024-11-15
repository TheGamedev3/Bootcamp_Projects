
import {useState} from "react";
import styles from "./MissionControl.module.css";

import MissionFilter from "./MissionFilter";
import MissionCard from "./MissionCard";
import MissionAction from "./MissionAction";

function MissionControl({missionData})
{

    const [filter, changeFilter] = useState("All");
    const [missions, changeMissions] = useState(missionData);
    const avalibleMissions = missions.filter(mission => filter === "All" || mission.status === filter);

    function updateMissions(changeId, action){
        changeMissions( originalMissionData =>
            (originalMissionData.map(mission => {
                if(mission.id === changeId){
                    if(action === "Launch" && mission.status === "Planned"){
                        mission.status = "Active";
                    }else if(action === "Finish" && mission.status === "Active"){
                        mission.status = "Completed";
                    }
                } return mission;
            }))
        );
    }
	return (
		<>
        <h1>Space Mission Control</h1>
        <MissionFilter changeFilter={changeFilter}/>
        <div style={{backgroundColor:"#000000"}} key={"SMCMB"}>
            {avalibleMissions.map((mission, index) => (
                <div className={styles.missionContainer} key={"m"+index}>
                    <div><MissionCard mission={mission} key={mission.id}/></div>
                    <div><MissionAction key={mission.id} id={mission.id} updateMissions={updateMissions}/></div>
                </div>
            ))}
        </div>
		</>
	);
}

export default MissionControl;
