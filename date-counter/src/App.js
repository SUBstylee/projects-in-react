import { useState } from 'react';
import './App.css';

function App() {
	const [step, setStep] = useState(0);
	const [count, setCount] = useState(0);

	const date = new Date();
	date.setDate(date.getDate() + count);

	const adjustStep = (stepMove) =>
		stepMove ? setStep((s) => s + 1) : setStep((s) => s - 1);
	const adjustCount = (countMove) =>
		countMove ? setCount((c) => c + step) : setCount((c) => c - step);
	return (
		<div className='App'>
			<div className='row'>
				<button onClick={() => adjustStep(false)}>-</button>
				<span>Step: {step}</span>
				<button onClick={() => adjustStep(true)}>+</button>
			</div>
			<div className='row'>
				<button onClick={() => adjustCount(false)}>-</button>
				<span>Count: {count}</span>
				<button onClick={() => adjustCount(true)}>+</button>
			</div>
			<p>
				{count
					? `${Math.abs(count)} ${count === 1 || count === -1 ? 'day' : 'days'}`
					: ''}{' '}
				{count === 0 ? 'Today is' : ''} {count > 0 && 'from today will be'}
				{count < 0 && 'before today was'} {date.toDateString()}
			</p>
		</div>
	);
}

export default App;
