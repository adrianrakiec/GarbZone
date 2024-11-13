import { BestOffers } from '../components/BestOffers/BestOffers';
import { Hero } from '../components/Hero/Hero';
import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';
import { LastAddedOffers } from '../components/LastAddedOffers/LastAddedOffers';
import { SectionHeading } from '../components/SectionHeading/SectionHeading';
import { Wrapper } from '../components/Wrapper/Wrapper';
import { useFetchData } from '../services/ApiClientService';

export const MainPage = () => {
	const { data: bestOffers } = useFetchData('offers', ['offers']);
	const { data: lastAdded } = useFetchData('offers', ['offers']);

	return (
		<>
			<Hero />
			<Wrapper>
				<HorizontalRule />
				<SectionHeading preTitle='Nowości' title='Ostatnio dodane' />
				<LastAddedOffers lastAdded={lastAdded} />
				<HorizontalRule />
				<SectionHeading preTitle='Polecane' title='Najlepsze oferty' />
				<BestOffers bestOffers={bestOffers} />
				<HorizontalRule />
			</Wrapper>
		</>
	);
};
