import Movie from './Movie';

const MovieList = ({ movies }) => {
	return (
		<ul className='list'>
			{movies?.map((movie, index) => (
				<Movie movie={movie} key={index} />
			))}
		</ul>
	);
};

export default MovieList;
