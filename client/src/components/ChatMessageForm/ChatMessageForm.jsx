import { useForm } from 'react-hook-form';
import { useMutateData } from '../../services/ApiClientService';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './ChatMessageForm.module.css';

export const ChatMessageForm = ({ onMsgSend, recipientUsername }) => {
	const { register, handleSubmit, reset } = useForm();
	const { mutateAsync } = useMutateData('messages', 'POST');

	const onSubmit = async data => {
		const payload = {
			recipientUsername: recipientUsername,
			content: data.content,
		};

		await mutateAsync(payload);
		onMsgSend();
		reset({ content: '' });
	};

	return (
		<form className={styles.sendForm} onSubmit={handleSubmit(onSubmit)}>
			<input
				id='content'
				type='text'
				{...register('content', { required: true })}
				placeholder='Wpisz treść wiadomości'
				className={styles.sendMsgInput}
			/>
			<MainBtn>Wyślij</MainBtn>
		</form>
	);
};
