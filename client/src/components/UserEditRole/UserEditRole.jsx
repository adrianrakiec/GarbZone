import { useMutateData } from '../../services/ApiClientService';
import styles from './UserEditRole.module.css';

export const UserEditRole = ({ user, refetch }) => {
	const { mutateAsync } = useMutateData(
		`users/change-user-role/${user.userName}`,
		'PUT'
	);

	const onClick = async () => {
		await mutateAsync();
		refetch();
	};

	return (
		<div key={user.id} className={styles.userCard}>
			<p>
				<strong>ID:</strong> {user.id}
			</p>
			<p>
				<strong>Nazwa:</strong> {user.userName}
			</p>
			<p>
				<strong>Rola:</strong> {user.role}
			</p>
			<button className={styles.changeRoleBtn} onClick={onClick}>
				Zmień rolę
			</button>
		</div>
	);
};
