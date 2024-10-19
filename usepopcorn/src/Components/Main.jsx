import MoviesListBox from './MoviesListBox';
import MoviesWatchedBox from './MoviesWatchedBox';

const Main = ({ movies }) => {
	return (
		<main className='main'>
			<MoviesListBox movies={movies} />
			<MoviesWatchedBox />
		</main>
	);
};

export default Main;
