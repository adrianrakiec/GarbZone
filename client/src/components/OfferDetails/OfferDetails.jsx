import { useParams } from 'react-router-dom';
import { Wrapper } from '../Wrapper/Wrapper';
import { useFetchData } from '../../services/ApiClientService';
import { NotFoundPage } from '../../pages/NotFoundPage';
import styles from './OfferDetails.module.css';
import { Gallery } from '../Gallery/Gallery';

export const OfferDetails = () => {
	const { id } = useParams();
	const { data: offer } = useFetchData(`offers/${id}`, ['offer']);

	if (!offer) return <NotFoundPage />;

	return (
		<section className={styles.offerDetails}>
			<Wrapper>
				<div className={styles.container}>
					<div className={styles.offerInfo}>
						<h2>{offer.title}</h2>
						<p>{offer.description}</p>
					</div>
					<Gallery offerImages={offer.images}/>
				</div>
			</Wrapper>
		</section>
	);
};
