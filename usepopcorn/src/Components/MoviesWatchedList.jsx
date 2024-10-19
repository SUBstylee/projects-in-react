import MovieWatched from './MovieWatched';

const MoviesWatchedList = ({ watched }) => {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<MovieWatched movie={movie} />
			))}
		</ul>
	);
};

export default MoviesWatchedList;
