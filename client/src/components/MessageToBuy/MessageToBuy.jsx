import { GiConfirmed } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';
import { useFetchData, useMutateData } from '../../services/ApiClientService';
import styles from './MessageToBuy.module.css';

export const MessageToBuy = ({ offerId, username, refetch }) => {
	const { data: offer } = useFetchData(`offers/${offerId}`, ['offer']);
	const { mutateAsync } = useMutateData(
		`transaction/cancel-transaction/${offerId}`,
		'PUT'
	);

	if (!offer) return;

	const offerImg = offer.images.find(img => img.isMain).url;

	const handleClick = async () => {
		await mutateAsync();
		refetch();
	};

	return (
		<div className={styles.msg}>
			<img src={offerImg} alt='' className={styles.offerImg} />
			<div className={styles.offerContainer}>
				<h3>{offer.title}</h3>
				<p>Kwota: {offer.price} zł</p>
				{username !== offer.seller && (
					<div className={styles.actionBtns}>
						<button className={styles.confirmBtn} title='Potwierdź zakup'>
							<GiConfirmed />
						</button>
						<button
							className={styles.cancelBtn}
							title='Odrzuć'
							onClick={handleClick}
						>
							<ImCancelCircle />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
