import { useState } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import Search from './Search';
import MoviesBox from './MoviesBox';
import MovieList from './MovieList';
import MoviesWatchedList from './MoviesWatchedList';
import MoviesWatchedSummary from './MoviesWatchedSummary';
import { tempWatchedData } from '../consts/data';

import NumResults from './NumResults';
import { tempMovieData } from '../consts/data';

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);
	const [watched, setWatched] = useState(tempWatchedData);

	return (
		<>
			<NavBar>
				<Search />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<MoviesBox>
					<MovieList movies={movies} />
				</MoviesBox>
				<MoviesBox>
					<>
						<MoviesWatchedSummary watched={watched} />
						<MoviesWatchedList watched={watched} />
					</>
				</MoviesBox>
			</Main>
		</>
	);
}
