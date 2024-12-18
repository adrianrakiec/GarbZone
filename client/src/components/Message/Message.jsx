import { Link } from 'react-router-dom';
import { isDateNull } from '../../utils/dateUtils';
import defaultImg from '../../assets/user.png';
import styles from './Message.module.css';

export const Message = ({ message, container }) => {
	if (!message) return;

	const profileImg =
		(container === 'Inbox'
			? message?.senderPhotoUrl
			: message?.recipientPhotoUrl) || defaultImg;

	const linkToChat =
		container === 'Inbox'
			? message?.senderUsername
			: message?.recipientUsername;

	return (
		<Link
			to={linkToChat}
			className={`${styles.message} ${
				isDateNull(message?.messageRead) &&
				container === 'Inbox' &&
				styles.unread
			}`}
		>
			<img
				src={profileImg}
				alt='Zdjęcie profilowe nadawcy'
				className={styles.img}
			/>
			<div className={styles.messageContent}>
				{container === 'Inbox' ? (
					<p className={styles.sender}>Od: {message?.senderUsername}</p>
				) : (
					<p className={styles.sender}>Do: {message?.recipientUsername}</p>
				)}
				<p className={styles.content}>{message?.content}</p>
			</div>
		</Link>
	);
};
