import logo from '../../assets/logo.png';

export const Nav = () => {
	return (
		<nav>
			<ul>
				<li>
					<a href='#'>
						<img src={logo} alt='GarbZone logo' />
					</a>
				</li>
				<li>
					<div className='search-bar'>
						<select name='options' id='options'>
							<option value='offers'>Przedmioty</option>
							<option value='users'>Użytkownicy</option>
						</select>
						<input type='search' placeholder='Wyszukaj...' />
					</div>
				</li>
				<li>
					<div className='menu'>
						<button>Zaloguj</button>
						<button>Zarejestruj</button>
					</div>
				</li>
			</ul>
		</nav>
	);
};
