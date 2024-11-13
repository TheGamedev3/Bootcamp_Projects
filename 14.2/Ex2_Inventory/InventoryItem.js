function InventoryItem({itemData})
{
	let lowQuantity = 5; let expensive = 100;

	const {name, type, quantity = 0, price = 0} = itemData;
	return (
		<div>
			<h2>{name} - {type}</h2>
			<p>${price} each, QT: {quantity}</p>
			{
				quantity < lowQuantity
				&&
				<Message key={name+type+"-lowsupply"}>
					<p>⚠️ Low Supply</p>
				</Message>
			}
			{
				quantity*price > expensive
				&&
				<Message key={name+type+"-expensive"}>
					<p>💰 Super Expensive! (total: ${quantity*price})</p>
				</Message>
			}
		</div>
	);
}
