import { useParams } from 'react-router-dom';
import { useFetchData } from '../services/ApiClientService';
import { Wrapper } from '../components/Wrapper/Wrapper';
import { NotFoundPage } from './NotFoundPage';
import { UserProfile } from '../components/UserProfile/UserProfile';
import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';
import { Search } from '../components/Search/Search';

export const UserProfilePage = () => {
	const { username } = useParams();
	const {
		data: user,
		isPending,
		isError,
	} = useFetchData(`users/${username}`, ['user']);

	if (isPending) return <div>Ładowanie...</div>;
	if (isError) return <NotFoundPage />;

	return (
		<Wrapper>
			<div
				style={{
					margin: '0 auto',
					maxWidth: '55%',
				}}
			>
				<Search />
			</div>
			<HorizontalRule />
			<UserProfile user={user} />
		</Wrapper>
	);
};
