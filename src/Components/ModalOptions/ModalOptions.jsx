import React from "react";
import "./ModalOptions.css";
import { useNavigate } from "react-router-dom";

function ModalOptions({ userEmail, onLogout }) {
	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate("/profile");
	};
	const handleSettingsClick = () => {
		navigate("/settings");
	};

	return (
		<div className="dropdown">
			<button
				className="dropdown__profile-info"
				onClick={handleProfileClick}
			>
				<div className="dropdown__avatar">
					<img src="big-profile.png" alt="" width="64px" />
				</div>
				<div className="dropdown__texts">
					<div className="dropdown__nickname">Artman81</div>
					<div className="dropdown__email">{userEmail}</div>
				</div>
			</button>
			<ul className="dropdown-list">
				<li>
					<button
						className="dropdown-btn"
						onClick={handleSettingsClick}
					>
						Настройки
					</button>
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
					<button className="dropdown-btn" onClick={onLogout}>
						Выход
					</button>
				</li>
			</ul>
		</div>
	);
}

export default ModalOptions;
