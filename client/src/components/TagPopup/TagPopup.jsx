import { useFetchData } from '../../services/ApiClientService';
import styles from './TagPopup.module.css';

export const TagPopup = ({ onClose, setSelectedTags, selectedTags }) => {
	const { data: tags } = useFetchData('offers/tags', ['tags']);

	if (!tags) return <p>Ładowanie...</p>;

	const handleTagSelect = tagId => {
		setSelectedTags(prevTags => {
			if (prevTags.includes(tagId)) {
				return prevTags.filter(id => id !== tagId);
			}

			if (prevTags.length === 5) {
				return prevTags;
			}

			return [...prevTags, tagId];
		});
	};

	return (
		<div className={styles.popup}>
			<div className={styles.popupContent}>
				<button className={styles.closeBtn} type='button' onClick={onClose}>
					X
				</button>
				<h3>Wybierz tagi</h3>
				<div className={styles.tagContainer}>
					{tags &&
						tags.map(tag => (
							<button
								key={tag.id}
								type='button'
								className={`${styles.tag} ${
									selectedTags?.includes(tag.id) ? styles.selected : ''
								}`}
								onClick={() => handleTagSelect(tag.id)}
							>
								{tag.tagName}
							</button>
						))}
				</div>
			</div>
		</div>
	);
};
