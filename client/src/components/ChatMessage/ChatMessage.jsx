import { isDateNull, convertDate } from '../../utils/dateUtils';
import defaultImg from '../../assets/user.png';
import styles from './ChatMessage.module.css';

export const ChatMessage = ({ message, username }) => {
	if (!message) return;

	const senderImg = message.senderPhotoUrl || defaultImg;

	return (
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
	);
};
