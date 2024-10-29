import { useState, useRef, useEffect } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import Search from './Search';
import MoviesBox from './MoviesBox';
import MovieList from './MovieList';
import MoviesWatchedList from './MoviesWatchedList';
import MoviesWatchedSummary from './MoviesWatchedSummary';

import NumResults from './NumResults';
import StarRating from './StarRating';

// Free API Key, otherwise would put in .env
const OMDB_KEY = '9763d024';

const Loader = () => {
	return <p className='loader'>Loading...</p>;
};

const ErrorMessage = ({ message }) => {
	return (
		<p className='error'>
			<span>❌</span> {message}
		</p>
	);
};

export default function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);
	const [watched, setWatched] = useState(() => {
		const storedValue = localStorage.getItem('watched') || [];
		return JSON.parse(storedValue);
	});

	const handleSelectMovie = (id) => {
		setSelectedId((selectedId) => (selectedId === id ? null : id));
	};
	const handleCloseSelectedMovie = () => {
		setSelectedId(null);
	};

	const handleAddWatched = (movie) => {
		setWatched((watched) => [...watched, movie]);
	};

	const handleDeleteWatched = (id) => {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	};

	useEffect(() => {
		localStorage.setItem('watched', JSON.stringify(watched));
	}, [watched]);

	useEffect(() => {
		const controller = new AbortController();
		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				setError('');
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`,
					{ signal: controller.signal },
				);
				if (!res.ok) throw new Error('Something went wrong!');
				const data = await res.json();
				if (data.Response === 'False')
					throw new Error('There are currently no movies with this title...');
				setMovies(data.Search);
				setError('');
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err.message);
				}
			} finally {
				setIsLoading(false);
			}
		};
		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}
		handleCloseSelectedMovie();
		fetchMovies();
		return () => controller.abort;
	}, [query]);

	return (
		<>
			<NavBar>
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<MoviesBox>
					{isLoading && !error && <Loader />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</MoviesBox>
				<MoviesBox>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseSelectedMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<MoviesWatchedSummary watched={watched} />
							<MoviesWatchedList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</MoviesBox>
			</Main>
		</>
	);
}

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);

	const countRef = useRef(0);

	useEffect(() => {
		if (userRating) countRef.current = countRef.current + 1;
	}, [userRating]);

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId,
	)?.userRating;
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;
	const handleAdd = () => {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
			countRatingDecisions: countRef.current,
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	};
	useEffect(() => {
		const getMovieDetails = async () => {
			setIsLoading(true);
			const res = await fetch(
				`http://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${selectedId}`,
			);
			const data = await res.json();
			setMovie(data);
			setIsLoading(false);
		};
		getMovieDetails();
	}, [selectedId]);
	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;
		return () => {
			document.title = 'usePopcorn';
		};
	}, [title]);
	useEffect(() => {
		const callback = (e) => {
			if (e.code === 'Escape') {
				onCloseMovie();
			}
		};
		document.addEventListener('keydown', callback);
		return () => document.removeEventListener('keydown', callback);
	}, [onCloseMovie]);
	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								{imdbRating} IMBd rating
							</p>
						</div>
					</header>
					<section>
						<div className='rating'>
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
										movieRating={userRating}
									/>
									{userRating > 0 && (
										<button className='btn-add' onClick={handleAdd}>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>
									You have already rated this movie {watchedUserRating}
									<span>⭐️</span>
								</p>
							)}
						</div>

						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
};
