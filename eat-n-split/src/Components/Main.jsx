import { useState } from 'react';
import Button from './Button';
import FriendsList from './FriendsList';
import FormAddFriend from './FormAddFriend';
import FormSplitBill from './FormSplitBill';

import { initialFriends } from '../consts/data';

const Main = () => {
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);

	const handleShowAddFriend = () => {
		setShowAddFriend((show) => !show);
		setSelectedFriend(null);
	};

	const handleAddFriend = (friend) => {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriend((show) => !show);
	};

	const handleSelection = (friend) => {
		setSelectedFriend(friend);
		setShowAddFriend(false);
	};

	const handleSplitBill = (value) => {
		setFriends(
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend,
			),
		);
		setSelectedFriend(null);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList
					friends={friends}
					selectedFriend={selectedFriend}
					onSelection={handleSelection}
				/>
				{showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? 'Close' : 'Add Friend'}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
					key={selectedFriend.id}
				/>
			)}
		</div>
	);
};

export default Main;
