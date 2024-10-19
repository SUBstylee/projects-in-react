import { useState } from 'react';
import MoviesWatchedList from './MoviesWatchedList';
import MoviesWatchedSummary from './MoviesWatchedSummary';
import { tempWatchedData } from '../consts/data';

const MoviesWatchedBox = () => {
	const [watched, setWatched] = useState(tempWatchedData);

	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='box'>
			<button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? '–' : '+'}
			</button>
			{isOpen && (
				<>
					<MoviesWatchedSummary watched={watched} />
					<MoviesWatchedList watched={watched} />
				</>
			)}
		</div>
	);
};

export default MoviesWatchedBox;
