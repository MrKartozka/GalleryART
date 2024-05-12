import "./ModalOptions.css";

function ModalOptions() {
	return (
		<div className="dropdown">
			<div className="dropwdown__profile-info">
				<div className="dropdown__avatar">
					<img src="big-profile.png" alt="" width="64px" />
				</div>
				<div className="dropdown__texts">
					<div className="dropdown__nickname">Artman81</div>
					<div className="dropdown__email">Artman81@gmail.com</div>
				</div>
			</div>
			<ul className="dropdown-list">
				<li>
					<button className="dropdown-btn">Настройки</button>
				</li>
				<li>
					<button className="dropdown-btn">
						Настройки главной ленты
					</button>
				</li>
				<li>
					<button className="dropdown-btn">
						Центр жалоб и сообщений
					</button>
				</li>
				<li>
					<button className="dropdown-btn">
						Права и конфиденциальность
					</button>
				</li>
				<li>
					<button className="dropdown-btn">Выход</button>
				</li>
			</ul>
		</div>
	);
}

export default ModalOptions;
