import { useState } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import Search from './Search';
import MoviesListBox from './MoviesListBox';
import MoviesWatchedBox from './MoviesWatchedBox';
import MovieList from './MovieList';

import NumResults from './NumResults';
import { tempMovieData } from '../consts/data';

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);

	return (
		<>
			<NavBar>
				<Search />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<MoviesListBox>
					<MovieList movies={movies} />
				</MoviesListBox>
				<MoviesWatchedBox />
			</Main>
		</>
	);
}
