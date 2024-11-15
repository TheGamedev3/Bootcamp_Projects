
function filterButton(index, status, changeFilter)
{
	return (
		<button
            key={index}
			onClick={() => changeFilter(status)}
        >
        {status}
		</button>
	);
}
function MissionFilter({changeFilter})
{
    const STATUSES = ["All", "Planned", "Active", "Completed"];

	return (
		<>
            {STATUSES.map((status, index) => (filterButton(status+"-button", status, changeFilter)))}
		</>
	);
}

export default MissionFilter;