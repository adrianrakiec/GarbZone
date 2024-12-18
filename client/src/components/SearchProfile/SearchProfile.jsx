import { Link } from 'react-router-dom';
import { Stars } from '../Stars/Stars';
import defaultImg from '../../assets/user.png';
import styles from './SearchProfile.module.css';
import { calculateAverage } from '../../utils/ratingUtils';

export const SearchProfile = ({ user }) => {
	const profileUrl = `/profil/${user?.username}`;
	const profileImg = user?.profilePhotoUrl || defaultImg;

	return (
		<div className={styles.searchProfile}>
			<Link to={profileUrl}>
				<div className={styles.searchProfileInfo}>
					<img src={profileImg} alt={`Zdjęcie użytkownika ${user?.username}`} />
					<div className={styles.userInfo}>
						<h3>{user?.username}</h3>
						<Stars count={Math.floor(calculateAverage(user?.rating))} />
					</div>
				</div>
			</Link>
		</div>
	);
};
