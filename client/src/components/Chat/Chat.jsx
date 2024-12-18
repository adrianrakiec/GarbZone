import { useParams } from 'react-router-dom';
import { useFetchData } from '../../services/ApiClientService';
import { Wrapper } from '../Wrapper/Wrapper';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { ChatMessageForm } from '../ChatMessageForm/ChatMessageForm';
import styles from './Chat.module.css';

export const Chat = () => {
	const { username } = useParams();
	const { data, refetch } = useFetchData(
		`messages/thread/${username}`,
		['messages', username],
		true,
		true
	);

	const messages = data?.data;

	return (
		<>
			<Wrapper>
				<section className={styles.chat}>
					<h2>
						Piszesz z użytkownikiem <span>{username}</span>
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
