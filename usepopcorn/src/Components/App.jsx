import { useState } from 'react';
import NavBar from './Nav';
import Main from './Main';
import { tempMovieData } from '../consts/data';

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);

	return (
		<>
			<NavBar movies={movies} />
			<Main movies={movies} />
		</>
	);
}
