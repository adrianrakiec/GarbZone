import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { Stars } from '../Stars/Stars';
import { calculateAverage } from '../../utils/ratingUtils';
import DefaultImg from '../../assets/user.png';
import styles from './ProfileCard.module.css';

export const ProfileCard = ({ sellerImg, sellerRating, sellerUsername }) => {
	const linkToProfile = `/profil/${sellerUsername}`;

	return (
		<div className={styles.profileCard}>
			<Link to={linkToProfile}>
				<div className={styles.profileInfo}>
					<img
						src={sellerImg ? sellerImg : DefaultImg}
						alt={`${sellerUsername} photo`}
					/>
					<div className={styles.sellerInfo}>
						<p>{sellerUsername}</p>
						<Stars count={Math.floor(calculateAverage(sellerRating))} />
					</div>
					<FaArrowRight />
				</div>
			</Link>
		</div>
	);
};
