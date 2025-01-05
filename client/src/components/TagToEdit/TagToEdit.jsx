import { useState } from 'react';
import { useMutateData } from '../../services/ApiClientService';
import styles from './TagToEdit.module.css';

export const TagToEdit = ({ tag, refetch }) => {
	const { mutateAsync: editTag } = useMutateData(
		`users/edit-tag/${tag.id}`,
		'PUT'
	);
	const { mutateAsync: deleteTag } = useMutateData(
		`users/remove-tag/${tag.id}`,
		'DELETE'
	);
	const [newTagName, setNewTagName] = useState(tag.tagName);
	const [isEdit, setIsEdit] = useState(false);

	const handleChange = event => {
		setNewTagName(event.target.value);
	};

	const handleEdit = () => {
		setIsEdit(true);
		setNewTagName(tag.tagName);
	};

	const onSave = async () => {
		setIsEdit(false);

		if (newTagName === tag.tagName) return;

		await editTag(newTagName);
		refetch();
	};

	const onDelete = async () => {
		await deleteTag();
		refetch();
	};

	return (
		<div className={styles.tag}>
			{isEdit ? (
				<input type='text' value={newTagName} onChange={handleChange} className={styles.tagNameInput}/>
			) : (
				<p className={styles.tagName}>{tag.tagName}</p>
			)}
			<div className={styles.options}>
				{isEdit ? (
					<>
						<button onClick={onSave} className={styles.editBtn}>
							Zapisz
						</button>
						<button
							onClick={() => setIsEdit(false)}
							className={styles.deleteBtn}
						>
							X
						</button>
					</>
				) : (
					<>
						<button onClick={handleEdit} className={styles.editBtn}>
							Edytuj
						</button>
						<button onClick={onDelete} className={styles.deleteBtn}>
							Usuń
						</button>
					</>
				)}
			</div>
		</div>
	);
};
