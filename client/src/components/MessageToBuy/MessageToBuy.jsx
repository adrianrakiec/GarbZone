import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { GiConfirmed } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';
import { useFetchData, useMutateData } from '../../services/ApiClientService';
import styles from './MessageToBuy.module.css';

export const MessageToBuy = ({ offerId, username, refetch }) => {
	const { setWallet } = useContext(AuthContext);
	const { data: offer } = useFetchData(`offers/${offerId}`, ['offer']);
	const { mutateAsync: cancelOffer } = useMutateData(
		`transaction/cancel-transaction/${offerId}`,
		'PUT'
	);
	const { mutateAsync: completeOffer } = useMutateData(
		`transaction/complete-transaction/${offerId}`,
		'PUT'
	);

	if (!offer) return;

	const offerImg = offer.images.find(img => img.isMain).url;

	const handleCancelClick = async () => {
		await cancelOffer();
		refetch();
	};

	const handleCompleteClick = async () => {
		await completeOffer();
		setWallet(prev => prev + offer.price);
		refetch();
	};

	return (
		<div className={styles.msg}>
			<img src={offerImg} alt='' className={styles.offerImg} />
			<div className={styles.offerContainer}>
				<h3>{offer.title}</h3>
				<p>Kwota: {offer.price} zł</p>
				{username !== offer.seller ? (
					<div className={styles.actionBtns}>
						<button
							className={styles.confirmBtn}
							title='Potwierdź zakup'
							onClick={handleCompleteClick}
						>
							<GiConfirmed />
						</button>
						<button
							className={styles.cancelBtn}
							title='Odrzuć'
							onClick={handleCancelClick}
						>
							<ImCancelCircle />
						</button>
					</div>
				) : (
					<div>
						<Link
							to='/ocena'
							className={styles.ratingLink}
							state={{ user: offer.seller, offerId: offerId }}
						>
							Oceń sprzedawcę
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
