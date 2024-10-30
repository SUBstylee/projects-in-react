const NextButton = ({ dispatch, answer, numQuestions, index }) => {
	if (answer === null) return null;
	if (index < numQuestions - 1) {
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'nextQuestion' })}>
				Next Question
			</button>
		);
	}
	if (index === numQuestions - 1) {
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'finish' })}>
				Finish Quiz
			</button>
		);
	}
};

export default NextButton;