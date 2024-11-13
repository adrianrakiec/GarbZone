import { useParams, ScrollRestoration } from 'react-router-dom';
import { Wrapper } from '../Wrapper/Wrapper';
import { useFetchData } from '../../services/ApiClientService';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Gallery } from '../Gallery/Gallery';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './OfferDetails.module.css';

export const OfferDetails = () => {
	const { id } = useParams();
	const { data: offer } = useFetchData(`offers/${id}`, ['offer']);

	if (!offer) return <NotFoundPage />;

	return (
		<section className={styles.offerDetails}>
			<ScrollRestoration />
			<Wrapper>
				<div className={styles.container}>
					<div className={styles.offerInfo}>
						<div className={styles.offer}>
							<ProfileCard
								sellerUsername={offer.seller}
								sellerRaiting={offer.sellerRaiting}
								sellerImg={offer.sellerImg}
							/>
						</div>
						<div>
							<h2>{offer.title}</h2>
							<p className={styles.price}>{offer.price} zł</p>
							<p>{offer.description}</p>
							<div className={styles.options}>
								<MainBtn>Kup</MainBtn>
								<button className={styles.btn}>Zaoferuj wymianę</button>
								<button className={styles.btn}>Napisz do sprzedawcy</button>
							</div>
						</div>
					</div>
					<div className={styles.offerGallery}>
						<Gallery offerImages={offer.images} />
					</div>
				</div>
			</Wrapper>
		</section>
	);
};
