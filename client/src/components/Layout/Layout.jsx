import { Nav } from '../Nav/Nav';
import { Footer } from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export const Layout = () => {
	return (
		<div className={styles.layout}>
			<Nav />
			<span className={styles.content}>
				<Outlet />
			</span>
			<Footer />
		</div>
	);
};
