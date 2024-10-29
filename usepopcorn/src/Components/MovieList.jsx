import Movie from './Movie';

const MovieList = ({ movies, onSelectMovie }) => {
	return (
		<ul className='list list-movies'>
			{movies?.map((movie, index) => (
				<Movie movie={movie} key={index} onSelectMovie={onSelectMovie} />
			))}
		</ul>
	);
};

export default MovieList;
