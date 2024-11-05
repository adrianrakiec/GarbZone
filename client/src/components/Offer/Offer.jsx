import { FaHeart } from 'react-icons/fa';
import { Stars } from '../Stars/Stars';
import styles from './Offer.module.css';
import { Link } from 'react-router-dom';

export const Offer = ({ offer }) => {
	const { url: mainPhoto } = offer.images.find(img => img.isMain);
	const sellerRaiting = Math.floor(offer.sellerRaiting);
	const linkToOfferDetails = `/oferta/${offer.id}`;

	return (
		<div className={styles.offer}>
			<Link to={linkToOfferDetails}>
				<img src={mainPhoto} alt='' width={250} height={250} />
			</Link>
			<button
				className={styles.like}
				onClick={() => console.log('dodano do polubionych')}
			>
				<FaHeart className={styles.heart} />
			</button>
			<h3>{offer.title}</h3>
			<p className={styles.price}>{offer.price} zł</p>
			<p>
				{offer.seller} (<Stars count={sellerRaiting} />)
			</p>
		</div>
	);
};
