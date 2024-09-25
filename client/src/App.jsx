import { useQuery } from '@tanstack/react-query';

const URL = 'https://localhost:5001/api/users';

export const App = () => {
	const { data: users } = useQuery({
		queryFn: () => fetch(URL).then(res => res.json()),
		queryKey: ['users'],
	});

	return (
		<>
			<h1>Users:</h1>
			<ul>
				{users?.map(user => (
					<li key={user.id}>{user.userName}</li>
				))}
			</ul>
		</>
	);
};
