import { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ data }) => {
	const [currOpen, setCurrOpen] = useState(null);
	return (
		<div className='accordion'>
			{data.map((el, i) => (
				<AccordionItem
					currOpen={currOpen}
					onOpen={setCurrOpen}
					key={el.title}
					num={i + 1}
					title={el.title}>
					{el.text}
				</AccordionItem>
			))}
			<AccordionItem
				currOpen={currOpen}
				onOpen={setCurrOpen}
				key={'test 1'}
				num={4}
				title={'Test 1'}>
				<p>Allows React developers to:</p>
				<ul>
					<li>Break up UI into components</li>
					<li>Make components reusuable</li>
					<li>Place state efficiently</li>
				</ul>
			</AccordionItem>
		</div>
	);
};

export default Accordion;
