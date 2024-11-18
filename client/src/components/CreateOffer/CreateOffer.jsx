import { useState, useRef } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Wrapper } from '../Wrapper/Wrapper';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './CreateOffer.module.css';

export const CreateOffer = () => {
	const [selectedImages, setSelectedImages] = useState([]);
	const fileInputRef = useRef();

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

	return (
		<div className={styles.createOffer}>
			<Wrapper>
				<h2>Tworzenie oferty</h2>
				<form className={styles.form}>
					<div className={styles.formGroup}>
						<label htmlFor='title'>Tytuł</label>
						<input
							type='text'
							id='title'
							name='title'
							placeholder='Wprowadź tytuł'
							className={styles.input}
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='description'>Opis</label>
						<textarea
							id='description'
							name='description'
							placeholder='Dodaj opis oferty'
							className={styles.textarea}
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
