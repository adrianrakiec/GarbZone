import { useFetchData } from '../../services/ApiClientService';
import { ReportedOffer } from '../ReportedOffer/ReportedOffer';
import styles from './AdminPanelReports.module.css';

export const AdminPanelReports = () => {
	const {
		data: reportedOffers,
		isPending,
		refetch,
	} = useFetchData('offers/report-offers', ['reported-offers']);

	if (isPending) return <p>Ładowanie...</p>;

	return (
		<section className={styles.reportsContainer}>
			{reportedOffers?.length > 0 ? (
				reportedOffers.map(offer => (
					<ReportedOffer offer={offer} refetch={refetch} key={offer.id} />
				))
			) : (
				<p>Brak zgłoszeń</p>
			)}
		</section>
	);
};
