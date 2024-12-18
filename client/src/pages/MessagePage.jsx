import { useState, useEffect } from 'react';
import { useFetchData } from '../services/ApiClientService';
import { Pagination } from '../components/Pagination/Pagination';
import { Wrapper } from '../components/Wrapper/Wrapper';
import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';
import { Message } from '../components/Message/Message';
import { MainBtn } from '../components/MainBtn/MainBtn';

export const MessagePage = () => {
	const [pagination, setPagination] = useState({
		currentPage: 1,
		itemsPerPage: 5,
		totalItems: 0,
		totalPages: 1,
	});

	const [container, setContainer] = useState('Inbox');

	const endpoint = `messages?container=${container}&pageNumber=${pagination.currentPage}&pageSize=${pagination.itemsPerPage}`;

	const { data, isPending } = useFetchData(
		endpoint,
		['messages', pagination.currentPage, container],
		true,
		true
	);

	useEffect(() => {
		if (data) {
			const { pagination: newPagination } = data;
			setPagination(JSON.parse(newPagination));
		}
	}, [data]);

	if (isPending) return <div>Ładowanie...</div>;

	const handlePageChange = page => {
		setPagination(prev => ({ ...prev, currentPage: page }));
	};

	const result = data.data;

	return (
		<section>
			<Wrapper>
				<div style={{ borderTop: '1px solid #808080' }}>
					<div
						style={{
							display: 'flex',
							gap: '1em',
							marginTop: '1em',
							padding: '1em 4em',
						}}
					>
						<MainBtn onClick={() => setContainer('Inbox')}>Otrzymane</MainBtn>
						<MainBtn onClick={() => setContainer('Outbox')}>Wysłane</MainBtn>
					</div>
					{result?.length > 0 ? (
						result.map(message => (
							<Message
								key={message.id}
								message={message}
								container={container}
							/>
						))
					) : (
						<p style={{ padding: '2em', textAlign: 'center' }}>
							Brak wiadomości
						</p>
					)}
					<Pagination {...pagination} onPageChange={handlePageChange} />
				</div>
				<HorizontalRule />
			</Wrapper>
		</section>
	);
};
