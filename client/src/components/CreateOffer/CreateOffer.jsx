import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastService } from '../../services/ToastService';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Wrapper } from '../Wrapper/Wrapper';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './CreateOffer.module.css';

const API_URL = import.meta.env.VITE_API_KEY;

export const CreateOffer = () => {
	const [selectedImages, setSelectedImages] = useState([]);
	const fileInputRef = useRef();
	const navigate = useNavigate();

	const handleFileClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = event => {
		const files = Array.from(event.target.files);
		const imageUrls = files.map(file => ({
			file,
			preview: URL.createObjectURL(file),
		}));
		setSelectedImages(prev => [...prev, ...imageUrls]);
	};

	const handleRemoveImage = index => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async event => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('title', event.target.title.value);
		formData.append('description', event.target.description.value);
		formData.append('price', event.target.price.value);
		selectedImages.forEach(image => {
			formData.append('images', image.file);
		});

		try {
			const response = await fetch(`${API_URL}offers`, {
				method: 'POST',
				body: formData,
				credentials: 'include',
			});

			if (!response.ok) {
				toastService.error('Błąd podczas tworzenia oferty');
			}

			toastService.success('Oferta utworzona pomyślnie');
			navigate('/');
		} catch (error) {
			toastService.error(error.message);
		}
	};

	return (
		<div className={styles.createOffer}>
			<Wrapper>
				<h2>Tworzenie oferty</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor='title'>Tytuł</label>
						<input
							type='text'
							id='title'
							name='title'
							placeholder='Wprowadź tytuł'
							className={styles.input}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='description'>Opis</label>
						<textarea
							id='description'
							name='description'
							placeholder='Dodaj opis oferty'
							className={styles.textarea}
							required
						></textarea>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='price'>Cena</label>
						<input
							type='number'
							id='price'
							name='price'
							placeholder='Wprowadź cenę'
							className={styles.input}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='images'>Zdjęcia</label>
						<input
							type='file'
							id='images'
							name='images'
							accept='image/*'
							multiple
							ref={fileInputRef}
							onChange={handleFileChange}
							className={styles.fileInput}
							required
						/>
						<button
							type='button'
							onClick={handleFileClick}
							className={styles.uploadButton}
						>
							<IoMdAddCircleOutline />
						</button>
					</div>
					<div className={styles.previewContainer}>
						{selectedImages.map((image, index) => (
							<div key={index} className={styles.preview}>
								<img src={image.preview} alt={`Preview ${index}`} />
								<button
									type='button'
									className={styles.removeButton}
									onClick={() => handleRemoveImage(index)}
								>
									Usuń
								</button>
							</div>
						))}
					</div>
					<div className={styles.submitBtn}>
						<MainBtn>Utwórz ofertę</MainBtn>
					</div>
				</form>
				<HorizontalRule />
			</Wrapper>
		</div>
	);
};
