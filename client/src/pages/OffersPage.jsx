import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';
import { OffersByTag } from '../components/OffersByTag/OffersByTag';
import { Wrapper } from '../components/Wrapper/Wrapper';

export const OffersPage = () => {
	return (
		<Wrapper>
			<OffersByTag />
			<HorizontalRule />
		</Wrapper>
	);
};
