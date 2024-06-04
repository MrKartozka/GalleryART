import "./NavigationBarWithoutFind.css";
import ModalOptions from "../ModalOptions/ModalOptions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavigationBarWithoutFind({ userEmail, onLogout }) {
	const [dropdownState, setDropdownState] = useState(false);
	const navigate = useNavigate();

	const handleDropdown = () => {
		setDropdownState(!dropdownState);
	};

	const handleLogoClick = () => {
		navigate("/gallery");
	};

	return (
		<div className="profile-nav-wf">
			<div className="profile-nav-wf__container">
				<div className="profile-nav-wf__logo" onClick={handleLogoClick}>
					Gallery Art
				</div>
				<div className="profile-nav-wf__box">
					<button className="profile-nav-wf__notification-btn">
						<img
							src="../../../notification.svg"
							alt="Уведомления"
						/>
					</button>
					<button className="profile-nav-wf__messages-btn">
						<img src="../../../messages.svg" alt="Сообщения" />
					</button>
					<div className="profile-wf-settings">
						<button
							className="profile-settings__btn"
							onClick={handleDropdown}
						>
							<img
								src="../../../profile.png"
								className="profile-wf-settings__img"
								alt="Иконка профиля"
							/>
							<img
								className="profile-wf-setting__arrowdown"
								src="../../../arrow-down.svg"
								alt=""
							/>
						</button>
						{dropdownState && (
							<ModalOptions
								userEmail={userEmail}
								onLogout={onLogout}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavigationBarWithoutFind;
