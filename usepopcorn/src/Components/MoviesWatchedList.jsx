import MovieWatched from './MovieWatched';

const MoviesWatchedList = ({ watched, onDeleteWatched }) => {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<MovieWatched
					movie={movie}
					key={movie.imdbId}
					onDeleteWatched={onDeleteWatched}
				/>
			))}
		</ul>
	);
};

export default MoviesWatchedList;
