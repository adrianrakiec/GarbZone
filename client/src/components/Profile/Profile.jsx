import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './Profile.module.css';

export const Profile = () => {
	const { user } = useContext(AuthContext);

	return (
		<section className={styles.profile}>
			<Wrapper>
				<div className={styles.profileInfo}>
					<img
						src='https://randomuser.me/api/portraits/men/50.jpg'
						alt=''
						className={styles.profileImg}
					/>
					<div className={styles.userInfo}>
						<h2>Profil: {user.username}</h2>
						<p>
							Ocena sprzedawcy: <span>★★★★★</span> - 5 opinii
						</p>
						<p>Konto utwożone dnia: 2023-09-07</p>
						<p>Ostatnia aktywność: 2 dni temu</p>
					</div>
				</div>
				<div className={styles.description}>
					<h3>Opis</h3>
					<p>
						Nostrud commodo Lorem enim esse incididunt magna officia amet
						occaecat proident ut. Sit ullamco commodo Lorem ut ex. Velit qui
						nisi esse commodo labore ullamco mollit. Nostrud est irure cupidatat
						labore adipisicing occaecat. Reprehenderit sunt exercitation ea
						ullamco mollit. In mollit eiusmod ut occaecat enim nulla labore. Est
						consequat est veniam ut enim veniam velit voluptate culpa.
					</p>
				</div>
			</Wrapper>
		</section>
	);
};
