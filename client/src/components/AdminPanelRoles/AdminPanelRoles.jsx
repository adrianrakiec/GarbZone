import { useFetchData } from '../../services/ApiClientService';
import { UserEditRole } from '../UserEditRole/UserEditRole';
import styles from './AdminPanelRoles.module.css';

export const AdminPanelRoles = () => {
	const { data, isPending, refetch } = useFetchData('users/users-with-role', [
		'users',
	]);

	if (isPending) return <p>Ładowanie</p>;

	return (
		<section className={styles.usersContainer}>
			{data &&
				data.map(user => (
					<UserEditRole user={user} key={user.id} refetch={refetch} />
				))}
		</section>
	);
};
