import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toastService } from '../../services/ToastService';
import { useMutateData } from '../../services/ApiClientService';
import { Wrapper } from '../Wrapper/Wrapper';
import { MainBtn } from '../MainBtn/MainBtn';
import { NotFoundPage } from '../../pages/NotFoundPage';
import styles from './ReportForm.module.css';

export const ReportForm = () => {
	const { register, handleSubmit, reset } = useForm();
	const location = useLocation();
	const navigate = useNavigate();
	const offerId = location.state?.offerId;
	const { mutateAsync } = useMutateData(
		`offers/report-offer/${offerId}`,
		'POST'
	);

	if (!offerId) return <NotFoundPage />;

	const onSubmit = async data => {
		try {
			reset();
			await mutateAsync(data.reason);
			navigate('/');
			toastService.success('Zgłoszenie zostało wysłane');
		} catch (e) {
			toastService.error(e.message || 'Wystąpił błąd');
		}
	};

	return (
		<Wrapper>
			<section className={styles.reportForm}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2>Zgłoś ofertę:</h2>
					<div>
						<label htmlFor='reason'>Powód:</label>
						<textarea
							id='reason'
							{...register('reason')}
							placeholder='Napisz powód zgłoszenia...'
							className={styles.reason}
						/>
					</div>

					<MainBtn>Wyślij zgłoszenie</MainBtn>
				</form>
			</section>
		</Wrapper>
	);
};
