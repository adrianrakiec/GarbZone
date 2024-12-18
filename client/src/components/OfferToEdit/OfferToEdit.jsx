import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainBtn } from '../MainBtn/MainBtn';
import { EditOfferForm } from '../EditOfferForm/EditOfferForm';
import { toastService } from '../../services/ToastService';
import ImgPlaceholder from '../../assets/placeholder-image.jpg';
import styles from './OfferToEdit.module.css';

const API_URL = import.meta.env.VITE_API_KEY;

export const OfferToEdit = ({ offer, refetch }) => {
	const [isEdit, setIsEdit] = useState(false);

	const offerUrl = `/oferta/${offer.id}`;
	const mainPhoto = offer.images.find(img => img.isMain);

	const onDeleteClick = async () => {
		try {
			await fetch(`${API_URL}offers/delete-offer/${offer.id}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			refetch();
		} catch (e) {
			toastService.error(e.message);
		}
	};

	return (
		<section className={styles.card}>
			<div className={styles.offerInfo}>
				<img
					src={mainPhoto?.url ?? ImgPlaceholder}
					alt={offer.title}
					className={styles.mainPhoto}
				/>
				<h3 className={styles.offerTitle}>
					<Link to={offerUrl}>{offer.title}</Link>
				</h3>
				<div>
					<MainBtn onClick={() => setIsEdit(prev => !prev)}>Edycja</MainBtn>
					<button className={styles.deleteOfferBtn} onClick={onDeleteClick}>
						Zakończ
					</button>
				</div>
			</div>
			{isEdit && (
				<EditOfferForm offer={offer} setIsEdit={setIsEdit} refetch={refetch} />
			)}
		</section>
	);
};
