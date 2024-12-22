import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AuthContext } from '../../context/AuthContext';
import { MainBtn } from '../MainBtn/MainBtn';
import { Wrapper } from '../Wrapper/Wrapper';
import { UserMenu } from '../UserMenu/UserMenu';
import { Menu } from '../Menu/Menu';
import logo from '../../assets/logo.png';
import styles from './Nav.module.css';

export const Nav = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useContext(AuthContext);

	const toggleMenu = () => {
		setIsMenuOpen(prev => !prev);
	};

	useEffect(() => {
		setIsMenuOpen(false);
	}, [location]);

	return (
		<nav className={styles.nav}>
			<Wrapper>
				<ul className={styles.navItems}>
					<li className={styles.logo}>
						<Link to='/'>
							<img src={logo} alt='GarbZone logo' />
						</Link>
					</li>
					<li className={styles.userMenu}>
						{user ? (
							<UserMenu />
						) : (
							<MainBtn onClick={() => navigate('/logowanie')}>
								Zaloguj/Zarejestruj
							</MainBtn>
						)}
					</li>
					<li>
						<button className={styles.menuBtn} onClick={toggleMenu}>
							<GiHamburgerMenu />
						</button>
					</li>
				</ul>
			</Wrapper>
			{isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
		</nav>
	);
};
