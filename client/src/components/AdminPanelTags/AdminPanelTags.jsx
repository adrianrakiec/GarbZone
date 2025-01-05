import { useFetchData } from '../../services/ApiClientService';
import { TagToEdit } from '../TagToEdit/TagToEdit';
import styles from './AdminPanelTags.module.css';

export const AdminPanelTags = () => {
	const {
		data: tags,
		isPending,
		refetch,
	} = useFetchData('offers/tags', ['tags']);

	if (isPending) return <p>Ładowanie...</p>;

	const sortedTags = tags.sort((a, b) => a.tagName.localeCompare(b.tagName));

	return (
		<section className={styles.tagsContainer}>
			{sortedTags ? (
				sortedTags.map(tag => (
					<TagToEdit tag={tag} key={tag.id} refetch={refetch} />
				))
			) : (
				<p>Brak tagów</p>
			)}
		</section>
	);
};
