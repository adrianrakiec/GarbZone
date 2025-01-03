import { Link } from 'react-router-dom';
import defaultImg from '../../assets/user.png';
import styles from './Comment.module.css';

export const Comment = ({ comment }) => {
	const profileImg = comment.authorPhoto || defaultImg;
	const linkToProfile = `/profil/${comment.authorName}`;

	return (
		<div className={styles.comment}>
			<img
				src={profileImg}
				alt='Author profile photo'
				className={styles.authorImg}
			/>
			<div className={styles.commentInfo}>
				<Link to={linkToProfile} className={styles.link}>
					<h3 className={styles.authorName}>{comment.authorName}</h3>
				</Link>
				<p>{comment.content}</p>
			</div>
		</div>
	);
};
