import { useForm } from 'react-hook-form';
import { useMutateData } from '../../services/ApiClientService';
import { useFetchData } from '../../services/ApiClientService';
import { TagToEdit } from '../TagToEdit/TagToEdit';
import styles from './AdminPanelTags.module.css';
import { MainBtn } from '../MainBtn/MainBtn';

export const AdminPanelTags = () => {
	const { mutateAsync } = useMutateData('users/create-tag', 'POST');
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			tagName: '',
		},
	});

	const {
		data: tags,
		isPending,
		refetch,
	} = useFetchData('offers/tags', ['tags']);

	if (isPending) return <p>Ładowanie...</p>;

	const sortedTags = tags.sort((a, b) => a.tagName.localeCompare(b.tagName));

	const onSubmit = async data => {
		await mutateAsync(data.tagName);
		reset();
		refetch();
	};

	return (
		<section className={styles.tagsContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.createTagForm}>
				<label htmlFor='tagName'>Utwórz nowy tag:</label>
				<>
					<input
						id='tagName'
						name='tagName'
						{...register('tagName')}
						className={styles.input}
					/>
					<MainBtn>Utwórz tag</MainBtn>
				</>
			</form>
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
