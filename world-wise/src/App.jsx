import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';

const BASE_URL = 'http://localhost:8000';

const App = () => {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch {
				alert('Something went wrong with fetch!');
			} finally {
				setIsLoading(false);
			}
		};
		fetchCities();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='product' element={<Product />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route
						index
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path='cities'
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path='countries'
						element={<CountryList cities={cities} isLoading={isLoading} />}
					/>
					<Route path='form' element={<p>Form</p>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;