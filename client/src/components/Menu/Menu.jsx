import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { AuthContext } from '../../context/AuthContext';
import { Wrapper } from '../Wrapper/Wrapper';
import { MainBtn } from '../MainBtn/MainBtn';
import { useFetchData } from '../../services/ApiClientService';
import { toastService } from '../../services/ToastService';
import styles from './Menu.module.css';

export const Menu = ({ setIsMenuOpen }) => {
	const { user, logout } = useContext(AuthContext);
	const { data: tags } = useFetchData('offers/tags', ['tags']);

	const handleClick = () => {
		logout();
		setIsMenuOpen(false);
		toastService.success('Wylogowano');
	};

	return (
		<div className={styles.menu}>
			<Wrapper>
				<h3 className={styles.balance}>
					Twoje saldo: <span>10</span> zł
				</h3>
				<h3 className={styles.title}>Tagi:</h3>
				<ul className={styles.tagsContainer}>
					{tags?.length > 0 &&
						tags.map(tag => (
							<li key={tag.id} className={styles.tagItem}>
								<Link to={`oferty/${tag.tagName}`}>{tag.tagName}</Link>
							</li>
						))}
				</ul>
				{user && (
					<div className={styles.logoutBtn}>
						<MainBtn onClick={handleClick}>
							Wyloguj się <CiLogout />
						</MainBtn>
					</div>
				)}
			</Wrapper>
		</div>
	);
};
