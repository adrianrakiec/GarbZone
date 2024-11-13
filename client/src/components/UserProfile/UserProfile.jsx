import { Link, ScrollRestoration } from 'react-router-dom';
import { Wrapper } from '../Wrapper/Wrapper';
import { Stars } from '../Stars/Stars';
import { Offer } from '../Offer/Offer';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { getLastActivity } from '../../utils/dateUtils';
import styles from './UserProfile.module.css';

export const UserProfile = ({ user }) => {
	const messageUrl = `/wiadomosci/${user?.username}`;

	return (
		<div className={styles.userProfile}>
			<ScrollRestoration />
			<Wrapper>
				<div className={styles.userProfileInfo}>
					<div className={styles.mainInfo}>
						<img
							src={user?.profilePhotoUrl}
							alt={`${user?.username}'s photo`}
						/>
						<div>
							<h3 className={styles.username}>{user?.username}</h3>
							<Stars count={user?.rating} />
							<p>
								Ostatnia aktywność: {getLastActivity(user?.lastActive)} dni temu
							</p>
						</div>
						<div className={styles.sendMessageLink}>
							<Link to={messageUrl}>Napisz wiadomość</Link>
						</div>
					</div>
					<h4>O sprzedawcy</h4>
					<p>{user?.about}</p>
					<div className={styles.offersSection}>
						<h3>Inne oferty sprzedającego</h3>
						{user?.offers ? (
							<div className={styles.offers}>
								{user?.offers.map((offer, i) => (
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
