import { useState } from 'react';

import Button from './Button';
import StepMessage from './StepMessage';

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
					<StepMessage step={step}>{messages[step - 1]}</StepMessage>
					<div className='buttons'>
						<Button
							handleClick={handlePrevious}
							step={step}
							textColor={'#fff'}
							bgColorDisabled={'#999'}
							bgColorEnabled={'#7950f2'}
							grayedStep={1}>
							<span>👈</span> Previous
						</Button>
						<Button
							handleClick={handleNext}
							step={step}
							textColor={'#fff'}
							bgColorDisabled={'#999'}
							bgColorEnabled={'#7950f2'}
							grayedStep={3}>
							Next <span>👉</span>
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
