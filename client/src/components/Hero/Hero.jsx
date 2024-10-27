import { Search } from '../Search/Search';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './Hero.module.css';

export const Hero = () => {
	return (
		<div className={styles.hero}>
			<Wrapper>
				<div className={styles.content}>
					<h1>
						Garb<span>Zone</span> - <br />
						znajdź to czego
						<br /> szukasz!
					</h1>
					<Search />
				</div>
			</Wrapper>
		</div>
	);
};
