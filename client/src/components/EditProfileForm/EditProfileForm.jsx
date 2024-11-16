import { useForm } from 'react-hook-form';
import { useMutateData } from '../../services/ApiClientService';
import { toastService } from '../../services/ToastService';
import styles from './EditProfileForm.module.css';

export const EditProfileForm = ({ user, isEdit, setIsEdit, refetch }) => {
	const { mutateAsync, isPending } = useMutateData('users', 'PUT');
	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: user.email,
			about: user.about,
		},
	});

	const onSubmit = async data => {
		try {
			await mutateAsync(data);
			toastService.success('Dane zostały zaktualizowane');
			refetch();
		} catch (e) {
			toastService.error(e.message || 'Nieznany błąd');
		} finally {
			setIsEdit(false);
		}
	};

	if (isPending) return <div>Aktualizowanie...</div>;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.editForm}>
			<div className={styles.formGroup}>
				<label htmlFor='about'>Opis</label>
				<textarea
					id='about'
					name='about'
					disabled={!isEdit}
					{...register('about')}
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					name='email'
					disabled={!isEdit}
					{...register('email')}
				/>
			</div>
			{isEdit && <button type='submit'>Edytuj</button>}
		</form>
	);
};
