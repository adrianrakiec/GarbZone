import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
import { LiaHeart } from 'react-icons/lia';
import { TbMessageChatbot } from 'react-icons/tb';
import { IoMdAddCircleOutline } from 'react-icons/io';
import styles from './UserMenu.module.css';

export const UserMenu = () => {
	return (
		<div className={styles.menu}>
			<Link to='/nowa-oferta'>
				<IoMdAddCircleOutline />
			</Link>
			<Link to='/wiadomosci'>
				<TbMessageChatbot />
			</Link>
			<Link to='/obserwowane'>
				<LiaHeart />
			</Link>
			<Link to='/profil'>
				<FaRegUser />
			</Link>
		</div>
	);
};
