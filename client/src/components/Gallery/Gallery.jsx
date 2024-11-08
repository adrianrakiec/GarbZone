import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export const Gallery = ({ offerImages }) => {
	const images = offerImages.map(img => ({
		original: img.url,
		thumbnail: img.url,
	}));

	return (
		<div>
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
