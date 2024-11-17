import { useState } from 'react';
import { MainBtn } from '../MainBtn/MainBtn';
import { toastService } from '../../services/ToastService';
import styles from './EditProfilePhotoForm.module.css';

const API_URL = import.meta.env.VITE_API_KEY;

export const EditProfilePhotoForm = ({ onClose, refetch }) => {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleFileChange = event => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);

		if (selectedFile) {
			const previewUrl = URL.createObjectURL(selectedFile);
			setPreview(previewUrl);
		} else {
			setPreview(null);
		}
	};

	const onSubmit = async e => {
		e.preventDefault();

		if (!file) {
			alert('Proszę wybrać plik do przesłania');
			return;
		}

		setIsLoading(true);

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch(`${API_URL}users/update-photo`, {
				method: 'PUT',
				credentials: 'include',
				body: formData,
			});

			await response.json();
			toastService.success('Zdjęcie zostało zaktualizowane!');
			onClose(false);
			refetch();
		} catch (e) {
			toastService.error(
				'Wystąpił błąd podczas aktualizacji zdjęcia: ' + e.message
			);
		} finally {
			setIsLoading(false);
			if (preview) {
				URL.revokeObjectURL(preview);
				setPreview(null);
			}
		}
	};

	return (
		<div className={styles.updateForm}>
			<div className={styles.container}>
				<button onClick={() => onClose(false)} className={styles.closeBtn}>
					X
				</button>
				{isLoading && <p className={styles.loading}>Aktualizowanie...</p>}
				<h3>Aktualizuj zdjęcie profilowe</h3>
				{preview && (
					<div className={styles.preview}>
						<img
							src={preview}
							alt='Podgląd zdjęcia'
							className={styles.previewPhoto}
						/>
					</div>
				)}
				<form onSubmit={onSubmit}>
					<input
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						multiple={false}
					/>
					<MainBtn disabled={isLoading}>Aktualizuj</MainBtn>
				</form>
			</div>
		</div>
	);
};
