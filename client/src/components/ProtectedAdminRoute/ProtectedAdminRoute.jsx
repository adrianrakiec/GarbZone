import { useFetchData } from '../../services/ApiClientService';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Wrapper } from '../Wrapper/Wrapper';

export const ProtectedAdminRoute = ({ children }) => {
	const { isError, isPending } = useFetchData('users/admin-panel', [
		'admin-panel',
	]);

	if (isPending)
		return (
			<Wrapper>
				<p>Ładowanie</p>
			</Wrapper>
		);

	return isError ? <NotFoundPage /> : <>{children}</>;
};
