import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Wrapper } from '../Wrapper/Wrapper';
import { Stars } from '../Stars/Stars';
import { convertDate, getLastActivity } from '../../utils/dateUtils';
import defaultImg from '../../assets/user.png';
import styles from './Profile.module.css';

const API_URL = import.meta.env.VITE_API_KEY;

export const Profile = () => {
	const { user: username, logout } = useContext(AuthContext);
	const [user, setUser] = useState(null);
	const profileImg = user?.profilePhotoUrl || defaultImg;

	useEffect(() => {
		fetch(`${API_URL}users/${username}`, { credentials: 'include' })
			.then(res => res.json())
			.then(data => setUser(data));
	}, [username]);

	return (
		<section className={styles.profile}>
			<button onClick={logout}>wyloguj</button>
			<Wrapper>
				<div className={styles.profileInfo}>
					<img
						src={profileImg}
						alt={`Zdjęcie użytkownika ${user?.username}`}
						className={styles.profileImg}
					/>
					<div className={styles.userInfo}>
						<h2>Profil: {user?.username}</h2>
						<p>
							Ocena sprzedawcy: <Stars count={user?.rating} /> - 5 opinii
						</p>
						<p>Konto utwożone dnia: {convertDate(user?.createdAt)}</p>
						<p>
							Ostatnia aktywność: {getLastActivity(user?.lastActive)} dni temu
						</p>
					</div>
				</div>
				<div className={styles.description}>
					<h3>Opis</h3>
					<p>{user?.about || 'Brak opisu'}</p>
				</div>
			</Wrapper>
		</section>
	);
};
