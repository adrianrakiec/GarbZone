import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFetchData } from '../../services/ApiClientService';
import { Wrapper } from '../Wrapper/Wrapper';
import { MainBtn } from '../MainBtn/MainBtn';
import { convertDate } from '../../utils/dateUtils';
import { EditProfileForm } from '../EditProfileForm/EditProfileForm';
import defaultImg from '../../assets/user.png';
import styles from './Profile.module.css';

export const Profile = () => {
	const [isEdit, setIsEdit] = useState(false);
	const { user: username } = useContext(AuthContext);
	const { data: user, refetch } = useFetchData(`users/${username}`, ['currentUser']);

	if (!user) return <div>Ładowanie...</div>;

	const profileImg = user.profilePhotoUrl || defaultImg;

	return (
		<section>
			<Wrapper>
				<div className={styles.profile}>
					<div>
						<h2 className={styles.title}>Twój profil</h2>
						<div className={styles.profileInfo}>
							<img
								src={profileImg}
								alt='Twoje zdjęcie profilowe'
								className={styles.profileImg}
							/>
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
			</Wrapper>
		</section>
	);
};
