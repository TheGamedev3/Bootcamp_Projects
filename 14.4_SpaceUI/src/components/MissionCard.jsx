import styles from "./MissionCard.module.css";

function MissionCard({mission})
{
	return (
		<>
            <b className={styles.title}>{mission.name}</b>
            <p className={styles.detail}>{"status: "+mission.status}</p>
            <p className={styles.detail}>{"crew: "+mission.crew.join(", ")}</p>
		</>
	);
}

export default MissionCard;