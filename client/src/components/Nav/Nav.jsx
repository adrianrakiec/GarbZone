import logo from '../../assets/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MainBtn } from '../MainBtn/MainBtn';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './Nav.module.css';

export const Nav = () => {
	return (
		<nav className={styles.nav}>
			<Wrapper>
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
			</Wrapper>
		</nav>
	);
};
