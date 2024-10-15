import { useState } from 'react';

import Logo from './Components/Logo';
import Form from './Components/Form';
import PackingList from './Components/PackingList';
import Stats from './Components/Stats';

export default function App() {
	const [items, setItems] = useState([]);

	const handleAddItems = (item) => {
		setItems((items) => [...items, item]);
	};

	const handleDeleteItem = (id) => {
		setItems((items) => items.filter((item) => item.id !== id));
	};

	const handleToggleItem = (id) => {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item,
			),
		);
	};

	const handleClearList = () => {
		const confirmed = window.confirm(
			'Are you sure you want to delete all items?',
		);

		if (confirmed) setItems([]);
	};

	return (
		<div className='app'>
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
				onClearList={handleClearList}
			/>
			<Stats items={items} />
		</div>
	);
}
