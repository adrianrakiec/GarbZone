import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toastService } from '../../services/ToastService';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Wrapper } from '../Wrapper/Wrapper';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './EditOfferForm.module.css';
import { TagPopup } from '../TagPopup/TagPopup';

const API_URL = import.meta.env.VITE_API_KEY;

export const EditOfferForm = ({ offer, setIsEdit, refetch }) => {
	const [selectedImages, setSelectedImages] = useState([]);
	const [selectedTags, setSelectedTags] = useState(
		offer.tags.map(tag => tag.id)
	);
	const [activeParents, setActiveParents] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const fileInputRef = useRef();
	const navigate = useNavigate();

	const { handleSubmit, register } = useForm({
		defaultValues: {
			title: offer.title,
			description: offer.description,
			price: offer.price,
		},
	});

	const handleRemoveClick = parentId => {
		setActiveParents(prevActiveParents =>
			prevActiveParents.includes(parentId)
				? prevActiveParents
				: [...prevActiveParents, parentId]
		);
	};

	const handleFileClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = event => {
		const files = Array.from(event.target.files);
		const newImageUrls = files.map(file => ({
			file,
			preview: URL.createObjectURL(file),
		}));
		setSelectedImages(prev => [...prev, ...newImageUrls]);
	};

	const handleRemoveImage = index => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
	};

	const removeImageFromOffer = async photoId => {
		try {
			await fetch(`${API_URL}offers/delete-photo/${photoId}`, {
				method: 'DELETE',
				credentials: 'include',
			});
		} catch (e) {
			toastService.error(e.message);
		}
	};

	const onSubmit = async data => {
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('price', data.price);

		selectedImages.forEach(image => {
			formData.append('images', image.file);
		});

		selectedTags.forEach(tagId => formData.append('tagIds', tagId));

		try {
			const response = await fetch(`${API_URL}offers/${offer.id}`, {
				method: 'PUT',
				body: formData,
				credentials: 'include',
			});

			if (!response.ok) {
				toastService.error('Błąd podczas aktualizacji oferty');
				return;
			}

			toastService.success('Oferta zaktualizowana pomyślnie');

			setIsEdit(false);
			navigate('/profil');
			refetch();
		} catch (error) {
			toastService.error(error.message);
		}
	};

	return (
		<div className={styles.editOffer}>
			<Wrapper>
				<h2>Edycja oferty</h2>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.formGroup}>
						<label htmlFor='title'>Tytuł</label>
						<input
							type='text'
							id='title'
							name='title'
							placeholder='Wprowadź tytuł'
							className={styles.input}
							{...register('title')}
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
							{...register('description')}
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
							{...register('price')}
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
						{offer?.images.map((img, index) => (
							<div
								key={index}
								className={
									activeParents.includes(index)
										? styles.deleted
										: styles.preview
								}
							>
								<img src={img.url} alt={`Podgląd zdjęcia ${index}`} />
								<button
									type='button'
									className={styles.removeButton}
									onClick={() => {
										removeImageFromOffer(img.id);
										handleRemoveClick(index);
									}}
								>
									Usuń
								</button>
							</div>
						))}
						{selectedImages.map((image, index) => (
							<div key={index} className={styles.preview}>
								<img src={image.preview} alt={`Podgląd zdjęcia ${index}`} />
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

					<div className={styles.formGroup}>
						<p>Edytuj tagi:</p>
						<button
							type='button'
							className={styles.addTagsBtn}
							onClick={() => setShowPopup(true)}
						>
							Dodaj tagi
						</button>
						<p>
							Wybrane: <strong>{selectedTags?.length}</strong>
						</p>
						{showPopup && (
							<TagPopup
								onClose={() => setShowPopup(false)}
								setSelectedTags={setSelectedTags}
								selectedTags={selectedTags}
							/>
						)}
					</div>
					<div className={styles.submitBtn}>
						<MainBtn>Zaktualizuj ofertę</MainBtn>
					</div>
				</form>
			</Wrapper>
		</div>
	);
};
