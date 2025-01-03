import { useContext } from 'react';
import { Link, Navigate, ScrollRestoration } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getLastActivity } from '../../utils/dateUtils';
import { calculateAverage } from '../../utils/ratingUtils';
import { Stars } from '../Stars/Stars';
import { Offer } from '../Offer/Offer';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { Wrapper } from '../Wrapper/Wrapper';
import { Comment } from '../Comment/Comment';
import defaultImg from '../../assets/user.png';
import styles from './UserProfile.module.css';

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
							<small className={styles.rating}>
								{' '}
								- na podstawie {user?.rating?.length} ocen
							</small>
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
					<HorizontalRule />
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
					<HorizontalRule />
					<div>
						<h3>Opinie o sprzedawcy</h3>
						{user.comments && user.comments.length > 0 ? (
							<div className={styles.ratings}>
								{user.comments.map(comment => (
									<Comment comment={comment} key={comment.id} />
								))}
							</div>
						) : (
							<p className={styles.offersEmpty}>
								Sprzedawca nie posiada jeszcze opinii
							</p>
						)}
					</div>
				</div>
				<HorizontalRule />
			</Wrapper>
		</div>
	);
};
