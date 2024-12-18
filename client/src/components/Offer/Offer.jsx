import { Link } from 'react-router-dom';
import { Stars } from '../Stars/Stars';
import { LikeBtn } from '../LikeBtn/LikeBtn';
import ImgPlaceholder from '../../assets/placeholder-image.jpg';
import styles from './Offer.module.css';

export const Offer = ({ offer }) => {
	if (!offer) return <p>Ładowanie...</p>;

	const mainPhoto = offer?.images?.find(img => img.isMain);
	const sellerRating = Math.floor(offer.sellerRating);
	const linkToOfferDetails = `/oferta/${offer.id}`;
	const linkToProfile = `/profil/${offer.seller}`;

	return (
		<div className={styles.offer}>
			<Link to={linkToOfferDetails}>
				<img
					src={mainPhoto?.url ?? ImgPlaceholder}
					alt={offer.title}
					width={250}
					height={250}
				/>
			</Link>
			<LikeBtn offerId={offer.id} likedBy={offer.likedByUsers} />
			<h3>{offer.title}</h3>
			<p className={styles.price}>{offer.price} zł</p>
			<p>
				<Link to={linkToProfile}>{offer.seller}</Link> (
				<Stars count={sellerRating} />)
			</p>
		</div>
	);
};
