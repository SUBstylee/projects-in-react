import MovieWatched from './MovieWatched';

const MoviesWatchedList = ({ watched }) => {
	return (
		<ul className='list'>
			{watched.map((movie, index) => (
				<MovieWatched movie={movie} key={index} />
			))}
		</ul>
	);
};

export default MoviesWatchedList;
