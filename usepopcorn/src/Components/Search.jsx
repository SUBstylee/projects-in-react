import { useRef, useEffect } from 'react';

const Search = ({ query, setQuery }) => {
	const inputEl = useRef(null);
	useEffect(() => {
		const callback = (e) => {
			if (e.key === 'Enter') {
				if (document.activeElement === inputEl.current) return;
				inputEl.current.focus();
				setQuery('');
			}
		};
		document.addEventListener('keydown', callback);
		inputEl.current.focus();
		return () => document.addEventListener('keydown', callback);
	}, [setQuery]);
	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
};

export default Search;
