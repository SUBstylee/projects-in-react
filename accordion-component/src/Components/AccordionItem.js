const AccordionItem = ({ num, title, children, currOpen, onOpen }) => {
	const isOpen = num === currOpen;
	const handleToggle = () => onOpen(isOpen ? null : num);
	return (
		<div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
			<p className='number'>{num < 10 ? `0${num}` : num}</p>
			<p className='title'>{title}</p>
			<p className='icon'>{isOpen ? '-' : '+'}</p>
			{isOpen && <div className='content-box'>{children}</div>}
		</div>
	);
};

export default AccordionItem;
