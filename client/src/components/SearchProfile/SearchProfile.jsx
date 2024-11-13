import { Link } from 'react-router-dom';
import { Stars } from '../Stars/Stars';
import styles from './SearchProfile.module.css';

export const SearchProfile = ({ user }) => {
	const profileUrl = `/profil/${user?.username}`;

	return (
		<div className={styles.searchProfile}>
			<Link to={profileUrl}>
				<div className={styles.searchProfileInfo}>
					<img src={user?.profilePhotoUrl} alt={user?.username} />
					<div className={styles.userInfo}>
						<h3>{user?.username}</h3>
						<Stars count={user?.rating} />
					</div>
				</div>
			</Link>
		</div>
	);
};
