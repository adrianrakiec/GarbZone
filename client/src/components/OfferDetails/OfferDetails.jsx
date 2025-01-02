import { useParams, ScrollRestoration, useNavigate } from 'react-router-dom';
import { Wrapper } from '../Wrapper/Wrapper';
import { useFetchData, useMutateData } from '../../services/ApiClientService';
import { Gallery } from '../Gallery/Gallery';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { MainBtn } from '../MainBtn/MainBtn';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import styles from './OfferDetails.module.css';

export const OfferDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: offer } = useFetchData(`offers/${id}`, ['offer']);
	const { mutateAsync } = useMutateData(
		`transaction/create-transaction/${id}`,
		'POST'
	);

	if (!offer) return <div>Ładowanie oferty...</div>;

	const handleBuyClick = async () => {
		await mutateAsync();
		navigate(`/wiadomosci/${offer.seller}`);
	};

	return (
		<section className={styles.offerDetails}>
			<ScrollRestoration />
			<Wrapper>
				<div className={styles.container}>
					<div className={styles.offerInfo}>
						<div className={styles.tags}>
							<p>Tagi: </p>
							{offer.tags.length > 0 ? (
								offer.tags.map(tag => (
									<div key={tag.id} className={styles.tag}>
										{tag.tagName}
									</div>
								))
							) : (
								<i>Brak dodanych tagów</i>
							)}
						</div>
						<div className={styles.offer}>
							<ProfileCard
								sellerUsername={offer.seller}
								sellerRating={offer.sellerRating}
								sellerImg={offer.sellerImg}
							/>
						</div>
						<div>
							<h2 className={styles.title}>{offer.title}</h2>
							<p className={styles.price}>{offer.price} zł</p>
							<p>{offer.description}</p>
							<div className={styles.options}>
								<MainBtn onClick={handleBuyClick}>Kup</MainBtn>
								<button
									className={styles.btn}
									onClick={() => navigate(`/wiadomosci/${offer.seller}`)}
								>
									Napisz do sprzedawcy
								</button>
							</div>
						</div>
					</div>
					<div className={styles.offerGallery}>
						{offer.images.length > 0 && <Gallery offerImages={offer.images} />}
					</div>
				</div>
				<p className={styles.views}>
					Liczba wyświetleń: <i>{offer.viewCount}</i>
				</p>
				<HorizontalRule />
			</Wrapper>
		</section>
	);
};
