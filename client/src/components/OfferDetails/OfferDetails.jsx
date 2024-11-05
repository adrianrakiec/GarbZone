import { useParams } from 'react-router-dom';
import { Wrapper } from '../Wrapper/Wrapper';
import { useFetchData } from '../../services/ApiClientService';
import { NotFoundPage } from '../../pages/NotFoundPage';
import styles from './OfferDetails.module.css';

export const OfferDetails = () => {
	const { id } = useParams();
	const { data: offer } = useFetchData(`offers/${id}`, ['offer']);

	if (!offer) return <NotFoundPage />;

	return (
		<section className={styles.offerDetails}>
			<Wrapper>
				<div className={styles.offerDetailsInfo}>
					<h2>{offer.title}</h2>
                    <p>{offer.description}</p>
					<img src={offer.images[0].url} alt={offer.title} />
				</div>
			</Wrapper>
		</section>
	);
};
