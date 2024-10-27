import logo from '../../assets/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MainBtn } from '../MainBtn/MainBtn';
import { Wrapper } from '../Wrapper/Wrapper';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './Nav.module.css';

export const Nav = () => {
	const navigate = useNavigate();
	const { user, logout } = useContext(AuthContext);

	return (
		<nav className={styles.nav}>
			<Wrapper>
				<ul className={styles.navItems}>
					<li>
						<Link to='/'>
							<img src={logo} alt='GarbZone logo' />
						</Link>
					</li>
					<li>
						{user ? (
							<MainBtn onClick={() => logout()}>Witaj {user.username}</MainBtn>
						) : (
							<MainBtn onClick={() => navigate('/logowanie')}>
								Zaloguj/Zarejestruj
							</MainBtn>
						)}
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
