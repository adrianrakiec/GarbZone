import { Link, Navigate, ScrollRestoration } from 'react-router-dom';
import { useContext } from 'react';
import { Wrapper } from '../Wrapper/Wrapper';
import { Stars } from '../Stars/Stars';
import { Offer } from '../Offer/Offer';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { AuthContext } from '../../context/AuthContext';
import { getLastActivity } from '../../utils/dateUtils';
import defaultImg from '../../assets/user.png';
import styles from './UserProfile.module.css';
import { calculateAverage } from '../../utils/ratingUtils';

export const UserProfile = ({ user }) => {
	const { user: username } = useContext(AuthContext);
	const messageUrl = `/wiadomosci/${user.username}`;
	const profileImg = user.profilePhotoUrl || defaultImg;

	if (user.username === username) return <Navigate to='/profil' />;

	return (
		<div className={styles.userProfile}>
			<ScrollRestoration />
			<Wrapper>
				<div className={styles.userProfileInfo}>
					<div className={styles.mainInfo}>
						<img
							src={profileImg}
							alt={`Zdjęcie użytkownika ${user.username}`}
						/>
						<div>
							<h3 className={styles.username}>{user.username}</h3>
							<Stars count={Math.floor(calculateAverage(user?.rating))} />
							<small className={styles.rating}> - na podstawie {user?.rating?.length} opinii</small>
							<p>
								Ostatnia aktywność: {getLastActivity(user.lastActive)} dni temu
							</p>
						</div>
						<div className={styles.sendMessageLink}>
							<Link to={messageUrl}>Napisz wiadomość</Link>
						</div>
					</div>
					<h4>O sprzedawcy</h4>
					<p className={user.about ? '' : styles.offersEmpty}>
						{user.about || 'Brak opisu'}
					</p>
					<div className={styles.offersSection}>
						<h3>Inne oferty sprzedającego</h3>
						{user.offers && user.offers.length > 0 ? (
							<div className={styles.offers}>
								{user.offers.map((offer, i) => (
									<Offer key={i} offer={offer} />
								))}
							</div>
						) : (
							<p className={styles.offersEmpty}>
								Sprzedawca nie posiada innych ofert
							</p>
						)}
					</div>
				</div>
				<HorizontalRule />
			</Wrapper>
		</div>
	);
};
