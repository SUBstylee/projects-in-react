import { useState } from 'react';

const messages = ['Steal underpants 🧺', '??? 🤔', 'Profit 🤑'];
function App() {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

	const handlePrevious = () => step > 1 && setStep((s) => s - 1);
	const handleNext = () => step < 3 && setStep((s) => s + 1);

	return (
		<>
			<button className='close' onClick={() => setIsOpen((io) => !io)}>
				{isOpen ? String.fromCharCode(215) : String.fromCharCode(926)}
			</button>
			{isOpen && (
				<div className='steps'>
					<div className='numbers'>
						<div className={`number ${step >= 1 ? 'active' : ''}`}>1</div>
						<div className={`number ${step >= 2 ? 'active' : ''}`}>2</div>
						<div className={`number ${step >= 3 ? 'active' : ''}`}>3</div>
					</div>
					<p className='message'>
						Step {step}: {messages[step - 1]}
					</p>
					<div className='buttons'>
						<button
							onClick={handlePrevious}
							style={{
								backgroundColor: step === 1 ? '#999' : '#7950f2',
								color: '#fff',
							}}>
							Previous
						</button>
						<button
							onClick={handleNext}
							style={{
								backgroundColor: step === 3 ? '#999' : '#7950f2',
								color: '#fff',
							}}>
							Next
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
