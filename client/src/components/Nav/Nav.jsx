import logo from '../../assets/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './Nav.module.css';
import { MainBtn } from '../MainBtn/MainBtn';

export const Nav = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.navItems}>
				<li>
					<a href='#'>
						<img src={logo} alt='GarbZone logo' />
					</a>
				</li>
				<li>
					<MainBtn>Zaloguj/Zarejestruj</MainBtn>
				</li>
				<li>
					<button className={styles.menuBtn}>
						<GiHamburgerMenu />
					</button>
				</li>
			</ul>
		</nav>
	);
};
