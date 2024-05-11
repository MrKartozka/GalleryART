import "./NavigationBar.css";

function NavigationBar() {
	return (
		<div className="nav">
			<div className="nav-container">
				<div clasName="nav__logo">Gallery Art</div>
				<div className="search-field">
					<input
						type="text"
						name=""
						id=""
						placeholder="Поиск картинки"
					/>
				</div>
				<img src="" alt="" />
				<button className="nav-login">Вход</button>
			</div>
		</div>
	);
}

export default NavigationBar;
