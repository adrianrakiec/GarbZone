import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchData } from '../../services/ApiClientService';
import { AuthContext } from '../../context/AuthContext';
import { Wrapper } from '../Wrapper/Wrapper';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { ChatMessageForm } from '../ChatMessageForm/ChatMessageForm';
import { NotFoundPage } from '../../pages/NotFoundPage';
import styles from './Chat.module.css';

export const Chat = () => {
	const { username } = useParams();
	const { user: loggedUser } = useContext(AuthContext);
	const { data: user } = useFetchData(`users/${username}`, ['user']);

	const { data, refetch } = useFetchData(
		`messages/thread/${username}`,
		['messages', username],
		true,
		true
	);

	if (!user || loggedUser === username) return <NotFoundPage />;

	const messages = data?.data;
	const linkToProfile = `/profil/${username}`;

	return (
		<>
			<Wrapper>
				<section className={styles.chat}>
					<h2>
						Piszesz z użytkownikiem{' '}
						<Link to={linkToProfile}>
							<span className={styles.profileLink}>{username}</span>
						</Link>
					</h2>

					<div className={styles.messages}>
						<div className={styles.msgContainer}>
							{messages?.length > 0 ? (
								messages.map(msg => (
									<ChatMessage key={msg.id} message={msg} username={username} />
								))
							) : (
								<h3>Brak wiadomości</h3>
							)}
						</div>
						<ChatMessageForm onMsgSend={refetch} recipientUsername={username} />
					</div>
				</section>
				<HorizontalRule />
			</Wrapper>
		</>
	);
};
