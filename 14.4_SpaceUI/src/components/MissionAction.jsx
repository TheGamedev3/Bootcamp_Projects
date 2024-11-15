
function actionButton(id, text, updateMissions)
{
	return (
		<button
            key={text+id}
			onClick={() => updateMissions(id, text)}
        >
        {text}
		</button>
	);
}
function MissionAction({id, updateMissions})
{
	return (
		<>
            {actionButton(id,"Launch",updateMissions)}
            {actionButton(id,"Finish",updateMissions)}
		</>
	);
}

export default MissionAction;