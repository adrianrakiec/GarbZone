import { useState, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useMutateData } from '../../services/ApiClientService';
import styles from './LikeBtn.module.css';

export const LikeBtn = ({ likedBy, offerId }) => {
	const [likedByUsers, setLikedByUsers] = useState(likedBy);
	const { id: userId } = useContext(AuthContext);
	const { mutate: like } = useMutateData(`likes/like/${offerId}`, 'POST');
	const { mutate: unlike } = useMutateData(`likes/unlike/${offerId}`, 'DELETE');

	const handleClick = () => {
		const parsedId = parseInt(userId);

		if (likedByUsers.includes(parsedId)) {
			setLikedByUsers(prev => prev.filter(u => u != parsedId));
			unlike();
		} else {
			setLikedByUsers(prev => [...prev, parsedId]);
			like();
		}
	};

	return (
		<button
			className={
				Array.isArray(likedByUsers) && likedByUsers.includes(parseInt(userId))
					? styles.liked
					: styles.like
			}
			onClick={handleClick}
		>
			<FaHeart className={styles.heart} />
		</button>
	);
};
