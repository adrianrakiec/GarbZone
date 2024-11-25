import { OfferToEdit } from '../OfferToEdit/OfferToEdit';

export const UserOffers = ({ offers, refetch }) => {
	return (
		<section>
			<h2>Wystawione przez Ciebie</h2>
			{offers?.length > 0 ? (
				offers.map(offer => (
					<OfferToEdit key={offer.id} offer={offer} refetch={refetch} />
				))
			) : (
				<p>Brak ofert</p>
			)}
		</section>
	);
};
