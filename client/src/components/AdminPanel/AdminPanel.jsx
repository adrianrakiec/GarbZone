import { NavLink, Outlet } from 'react-router-dom';
import { Wrapper } from '../Wrapper/Wrapper';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import styles from './AdminPanel.module.css';

export const AdminPanel = () => {
	return (
		<Wrapper>
			<section className={styles.adminPanel}>
				<div className={styles.optionsContainer}>
					<ul className={styles.options}>
						<li>
							<NavLink
								to='tagi'
								className={({ isActive }) =>
									isActive
										? `${styles.optionItem} ${styles.active}`
										: styles.optionItem
								}
							>
								Edytuj tagi
							</NavLink>
						</li>
						<li>
							<NavLink
								to='role'
								className={({ isActive }) =>
									isActive
										? `${styles.optionItem} ${styles.active}`
										: styles.optionItem
								}
							>
								Edytuj role
							</NavLink>
						</li>
						<li>
							<NavLink
								to='zgloszone'
								className={({ isActive }) =>
									isActive
										? `${styles.optionItem} ${styles.active}`
										: styles.optionItem
								}
							>
								Zgłoszone oferty
							</NavLink>
						</li>
					</ul>
				</div>
				<div>
					<Outlet />
				</div>
			</section>
			<HorizontalRule />
		</Wrapper>
	);
};
