import { useState, useEffect } from 'react';

export const useMovies = (query, OMDB_KEY, callback) => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

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
		fetchMovies();
		return () => controller.abort;
	}, [query, OMDB_KEY]);

	return { movies, isLoading, error };
};
