import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './Gallery.module.css';

export const Gallery = ({ offerImages }) => {
	const images = offerImages.map(img => ({
		original: img.url,
		thumbnail: img.url,
	}));

	return (
		<div className={styles.galleryContainer}>
			<ImageGallery
				items={images}
				showThumbnails={true}
				showBullets={true}
				showFullscreenButton={false}
				showPlayButton={false}
				autoPlay={false}
				lazyLoad={true}
				slideDuration={500}
			/>
		</div>
	);
};
