import { useParams } from 'react-router-dom';
import { useFetchData } from '../../services/ApiClientService';
import { Wrapper } from '../Wrapper/Wrapper';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './Chat.module.css';

export const Chat = () => {
	const { username } = useParams();
	const { data } = useFetchData(
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
						{messages?.length > 0 ? (
							messages.map(msg => (
								<ChatMessage key={msg.id} message={msg} username={username} />
							))
						) : (
							<h3>Brak wiadomości</h3>
						)}
						<form className={styles.sendForm}>
							<input type='text' className={styles.sendMsgInput} />
							<MainBtn>Wyślij</MainBtn>
						</form>
					</div>
				</section>
				<HorizontalRule />
			</Wrapper>
		</>
	);
};
