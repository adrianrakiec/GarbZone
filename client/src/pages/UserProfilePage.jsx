import { useParams } from 'react-router-dom';
import { useFetchData } from '../services/ApiClientService';
import { Wrapper } from '../components/Wrapper/Wrapper';
import { NotFoundPage } from './NotFoundPage';
import { UserProfile } from '../components/UserProfile/UserProfile';
import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';

export const UserProfilePage = () => {
	const { username } = useParams();
	const {
		data: user,
		isPending,
		isError,
	} = useFetchData(`users/${username}`, [username]);

	if (isPending) return <div>Ładowanie...</div>;
	if (isError) return <NotFoundPage />;

	return (
		<Wrapper>
			<HorizontalRule />
			<UserProfile user={user} />
		</Wrapper>
	);
};
