import { isDateNull, convertDate } from '../../utils/dateUtils';
import { MessageToBuy } from '../MessageToBuy/MessageToBuy';
import defaultImg from '../../assets/user.png';
import styles from './ChatMessage.module.css';

export const ChatMessage = ({ message, username, refetch }) => {
	if (!message) return;

	const senderImg = message.senderPhotoUrl || defaultImg;

	return (
		<>
			<div className={styles.chatMessage}>
				<img
					src={senderImg}
					alt='Zdjęcie wysyłającego'
					className={`${styles.profileImg} ${
						message?.senderUsername === username ? styles.imgRight : ''
					}`}
				/>
				<div className={styles.msgContainer}>
					{isDateNull(message.messageRead) ? (
						<small className={styles.unreadMsg}>(nie wyświetlono)</small>
					) : (
						<small className={styles.readMsg}>
							(wyświetlono: {convertDate(message.messageRead)})
						</small>
					)}
					<p className={styles.msgContent}>{message.content}</p>
				</div>
			</div>
			{message.offerId !== 0 ? (
				<MessageToBuy
					offerId={message.offerId}
					username={username}
					refetch={refetch}
				/>
			) : (
				<></>
			)}
		</>
	);
};
