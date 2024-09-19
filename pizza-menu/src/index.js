import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
	{
		name: 'Focaccia',
		ingredients: 'Bread with italian olive oil and rosemary',
		price: 6,
		photoName: 'pizzas/focaccia.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Margherita',
		ingredients: 'Tomato and mozarella',
		price: 10,
		photoName: 'pizzas/margherita.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Spinach',
		ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
		price: 12,
		photoName: 'pizzas/spinach.jpg',
		soldOut: true,
	},
	{
		name: 'Pizza Mushrooms',
		ingredients: 'Tomato, mozarella, mushrooms, and onion',
		price: 12,
		photoName: 'pizzas/mushrooms.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Salami',
		ingredients: 'Tomato, mozarella, and pepperoni',
		price: 15,
		photoName: 'pizzas/salami.jpg',
		soldOut: true,
	},
	{
		name: 'Pizza Prosciutto',
		ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
		price: 18,
		photoName: 'pizzas/prosciutto.jpg',
		soldOut: false,
	},
];

const daysOfWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

function App() {
	return (
		<div className='container'>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

const Header = () => {
	return (
		<header className='header'>
			<h1>Pizza Shop</h1>
		</header>
	);
};

const Menu = () => {
	const pizzas = pizzaData;
	const numPizzas = pizzas.length;
	return (
		<main className='menu'>
			<h2>Our menu</h2>
			{numPizzas > 0 ? (
				<>
					<p>
						Authentic Italian cuisine. Six creative dishes to choose from. All
						from our stone oven, all organic, all delicious!
					</p>
					<ul className='pizzas'>
						{pizzaData.map((pizza) => (
							<Pizza key={pizza.name} {...pizza} />
						))}
					</ul>
				</>
			) : (
				<p>We're still working on our menu. Please come back later :)</p>
			)}
		</main>
	);
};

function Pizza(props) {
	return (
		<li className={`pizza${props.soldOut ? ' sold-out' : ''}`}>
			<img src={props.photoName} alt={props.name} />
			<div className='pizza-details'>
				<h3>{props.name}</h3>
				<p>{props.ingredients}</p>
				<span>{props.soldOut ? 'SOLD OUT' : `$${props.price}`}</span>
			</div>
		</li>
	);
}

const Footer = () => {
	const hour = new Date().getHours();
	const day = new Date().getDay();
	const openHour = 12;
	const closeHour = 22;
	const isOpen =
		hour >= openHour && hour <= closeHour && day !== 1 && day !== 2;
	const todayOrTomorrow = hour >= closeHour && hour < 24 ? day + 1 : day;
	return (
		<footer>
			<div className='order'>
				<Order
					openHour={openHour}
					closeHour={closeHour}
					isOpen={isOpen}
					todayOrTomorrow={todayOrTomorrow}
				/>
				<p>
					Hours of operation: {openHour}:00 - {closeHour}:00 every day!
				</p>
			</div>
		</footer>
	);
};

const Order = ({ openHour, closeHour, isOpen, todayOrTomorrow }) => {
	return (
		<>
			<p style={{ color: isOpen ? 'black' : 'red' }}>
				{isOpen
					? `We're open until ${closeHour}:00. Come visit us or order online!`
					: `Sorry we're closed until ${daysOfWeek[todayOrTomorrow]} ${openHour}:00.`}
			</p>
			<button className='btn'>
				{isOpen ? 'Order now!' : 'Order for later!'}
			</button>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
