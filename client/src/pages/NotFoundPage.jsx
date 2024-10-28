import { ArrowBtn } from '../components/ArrowBtn/ArrowBtn';
import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';
import { Wrapper } from '../components/Wrapper/Wrapper';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<section>
			<Wrapper>
				<HorizontalRule />
				<h1 style={{ fontSize: '3rem' }}>Strona nie istnieje!</h1>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<ArrowBtn arrowDirection='left' onClick={() => navigate('/')} />
					<p style={{ marginLeft: '1em' }}>Wróć na stronę główną</p>
				</div>
			</Wrapper>
		</section>
	);
};
