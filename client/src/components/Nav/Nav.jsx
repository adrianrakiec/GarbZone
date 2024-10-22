import logo from '../../assets/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './Nav.module.css';

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
					<div className='menu'>
						<button>Zaloguj/Zarejestruj</button>
					</div>
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
