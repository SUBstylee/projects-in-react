import { useState } from 'react';

import Item from './Item';

const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;
	if (sortBy === 'description')
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	if (sortBy === 'packed')
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));
	if (sortBy === 'numItems')
		sortedItems = items.slice().sort((a, b) => a.quantity - b.quantity);

	return (
		<div className='list'>
			<ul>
				{sortedItems.map((item) => (
					<Item
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
						item={item}
						key={item.id}
					/>
				))}
			</ul>

			<div className='actions'>
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value={'input'}>Sort by input order</option>
					<option value={'description'}>Sort by description</option>
					<option value={'packed'}>Sort by packed status</option>
					<option value={'numItems'}>Sort by number of items</option>
				</select>
				<button onClick={onClearList}>Clear list</button>
			</div>
		</div>
	);
};

export default PackingList;
