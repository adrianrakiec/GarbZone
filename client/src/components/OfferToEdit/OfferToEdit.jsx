import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './OfferToEdit.module.css';
import { EditOfferForm } from '../EditOfferForm/EditOfferForm';

export const OfferToEdit = ({ offer, refetch }) => {
	const [isEdit, setIsEdit] = useState(false);

	const offerUrl = `/oferta/${offer.id}`;
	const mainPhoto = offer.images.find(img => img.isMain);

	return (
		<section className={styles.card}>
			<div className={styles.offerInfo}>
				<img
					src={mainPhoto?.url}
					alt={offer.title}
					className={styles.mainPhoto}
				/>
				<h3 className={styles.offerTitle}>
					<Link to={offerUrl}>{offer.title}</Link>
				</h3>
				<div>
					<MainBtn onClick={() => setIsEdit(prev => !prev)}>Edycja</MainBtn>
					<button className={styles.deleteOfferBtn}>Zakończ</button>
				</div>
			</div>
			{isEdit && <EditOfferForm offer={offer} setIsEdit={setIsEdit} refetch={refetch} />}
		</section>
	);
};
