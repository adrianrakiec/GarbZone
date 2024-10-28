import { BestOffers } from '../components/BestOffers/BestOffers';
import { Hero } from '../components/Hero/Hero';
import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';
import { LastAddedProducts } from '../components/LastAddedProducts/LastAddedProducts';
import { SectionHeading } from '../components/SectionHeading/SectionHeading';
import { Wrapper } from '../components/Wrapper/Wrapper';

export const MainPage = () => {
	return (
		<>
			<Hero />
			<Wrapper>
				<HorizontalRule />
				<SectionHeading preTitle='Nowości' title='Ostatnio dodane' />
				<LastAddedProducts />
				<HorizontalRule />
				<SectionHeading preTitle='Polecane' title='Najlepsze oferty' />
				<BestOffers />
				<HorizontalRule />
			</Wrapper>
		</>
	);
};
