const Button = ({
	handleClick,
	step,
	textColor,
	bgColorDisabled,
	bgColorEnabled,
	grayedStep,
	children,
}) => {
	return (
		<button
			onClick={handleClick}
			style={{
				backgroundColor: step === grayedStep ? bgColorDisabled : bgColorEnabled,
				color: textColor,
			}}>
			{children}
		</button>
	);
};

export default Button;
