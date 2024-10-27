import { Hero } from '../components/Hero/Hero';
import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';
import { Products } from '../components/Products/Products';
import { SectionHeading } from '../components/SectionHeading/SectionHeading';
import { Wrapper } from '../components/Wrapper/Wrapper';

export const MainPage = () => {
	return (
		<>
			<Hero />
			<Wrapper>
				<HorizontalRule />
				<SectionHeading preTitle='Nowości' title='Ostatnio dodane' />
				<Products />
				<HorizontalRule />
			</Wrapper>
		</>
	);
};
