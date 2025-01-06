import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useMutateData } from '../../services/ApiClientService';
import styles from './ReportedOffer.module.css';

export const ReportedOffer = ({ offer, refetch }) => {
	const { mutateAsync: endReport } = useMutateData(
		`offers/end-report/${offer.id}`,
		'PUT'
	);
	const { mutateAsync: deleteReportedOffer } = useMutateData(
		`offers/remove-reported-offer/${offer.id}/${offer.offerId}`,
		'DELETE'
	);
	const linkToOffer = `/oferta/${offer.offerId}`;

	const handleEndReportClick = async () => {
		await endReport();
		refetch();
	};

	const handleRemoveReportedOfferClick = async () => {
		await deleteReportedOffer();
		refetch();
	};

	return (
		<div className={styles.offer}>
			<h3>Numer zgłoszenia: {offer.id}</h3>
			<h4>
				<Link to={linkToOffer} className={styles.offerLink}>
					Zgłoszona oferta: {offer.offerId}
				</Link>
			</h4>
			<h5>Powód:</h5>
			<p>{offer.reason}</p>
			<div className={styles.options}>
				<button className={styles.confirmBtn} onClick={handleEndReportClick}>
					<FaCheck />
				</button>
				<button
					className={styles.deleteBtn}
					onClick={handleRemoveReportedOfferClick}
				>
					<RiDeleteBin6Line />
				</button>
			</div>
		</div>
	);
};
