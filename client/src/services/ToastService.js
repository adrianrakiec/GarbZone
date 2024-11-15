import { toast, Bounce } from 'react-toastify';

const styles = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'colored',
	transition: Bounce,
};

export const toastService = {
	success: message => toast.success(message, styles),
	error: message => toast.error(message, styles),
};
