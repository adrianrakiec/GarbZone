import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
	const { user } = useContext(AuthContext);

	const toggleMenu = () => {
		setIsMenuOpen(prev => !prev);
	};

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
						{isMenuOpen && <Menu />}
					</li>
				</ul>
			</Wrapper>
		</nav>
	);
};
