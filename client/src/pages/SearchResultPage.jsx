import { SearchResult } from '../components/SearchResult/SearchResult';
import { HorizontalRule } from '../components/HorizontalRule/HorizontalRule';
import { Wrapper } from '../components/Wrapper/Wrapper';

export const SearchResultPage = () => {
	return (
		<>
			<Wrapper>
				<SearchResult />
				<HorizontalRule />
			</Wrapper>
		</>
	);
};
