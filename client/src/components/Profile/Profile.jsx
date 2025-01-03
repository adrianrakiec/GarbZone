import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFetchData } from '../../services/ApiClientService';
import { Wrapper } from '../Wrapper/Wrapper';
import { MainBtn } from '../MainBtn/MainBtn';
import { convertDate } from '../../utils/dateUtils';
import { EditProfileForm } from '../EditProfileForm/EditProfileForm';
import { EditProfilePhotoForm } from '../EditProfilePhotoForm/EditProfilePhotoForm';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { UserOffers } from '../UserOffers/UserOffers';
import { Comment } from '../Comment/Comment';
import defaultImg from '../../assets/user.png';
import styles from './Profile.module.css';

export const Profile = () => {
	const [isEdit, setIsEdit] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const { user: username } = useContext(AuthContext);
	const { data: user, refetch } = useFetchData(`users/${username}`, [
		'currentUser',
	]);

	if (!user) return <div>Ładowanie...</div>;

	const profileImg = user.profilePhotoUrl || defaultImg;

	return (
		<section>
			<Wrapper>
				{isPopupOpen && (
					<EditProfilePhotoForm onClose={setIsPopupOpen} refetch={refetch} />
				)}
				<div className={styles.profile}>
					<div>
						<h2 className={styles.title}>Twój profil</h2>
						<div className={styles.profileInfo}>
							<div className={styles.photoContainer}>
								<img
									src={profileImg}
									alt='Twoje zdjęcie profilowe'
									className={styles.profileImg}
								/>
								<button
									className={styles.editPhotoBtn}
									onClick={() => setIsPopupOpen(true)}
								>
									Edytuj zdjęcie
								</button>
							</div>
							<p>Konto utwożone dnia: {convertDate(user.createdAt)}</p>
						</div>
					</div>

					<div className={styles.editInfo}>
						<div className={styles.editBtn}>
							{isEdit ? (
								<MainBtn onClick={() => setIsEdit(false)}>X</MainBtn>
							) : (
								<MainBtn onClick={() => setIsEdit(true)}>Edytuj</MainBtn>
							)}
						</div>
						<EditProfileForm
							user={user}
							isEdit={isEdit}
							setIsEdit={setIsEdit}
							refetch={refetch}
						/>
					</div>
				</div>
				<HorizontalRule />
				<UserOffers offers={user.offers} refetch={refetch} />
				<div className={styles.ratings}>
					<h2>Opinie o Tobie</h2>
					{user.comments && user.comments.length > 0 ? (
						<div>
							{user.comments.map(comment => (
								<Comment comment={comment} key={comment.id} />
							))}
						</div>
					) : (
						<p className={styles.offersEmpty}>Nie masz jeszcze opinii</p>
					)}
				</div>
				<HorizontalRule />
			</Wrapper>
		</section>
	);
};
