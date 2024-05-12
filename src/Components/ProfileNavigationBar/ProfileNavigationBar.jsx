import "./ProfileNavigationBar.css";
import ModalOptions from "../ModalOptions/ModalOptions";
import { useState } from "react";

function ProfileNavigationBar() {
	const [dropdownState, setDropdownState] = useState(false);

	const handleDropdown = () => {
		setDropdownState(!dropdownState);
	};

	return (
		<div className="profile-nav">
			<div className="profile-nav__container">
				<div clasName="profile-nav__logo">Gallery Art</div>
				<button className="profile-nav__сreate-profile">Создать</button>
				<div className="search-field">
					<input
						type="text"
						name=""
						id=""
						placeholder="Поиск картинки"
					/>
				</div>
				<img src="" alt="" />
				<button className="profile-nav__notification-btn">
					<img src="../../../notification.svg" alt="Уведомления" />
				</button>
				<button className="profile-nav__messages-btn">
					<img src="../../../messages.svg" alt="Сообщения" />
				</button>
				<div className="profile-settings">
					<button
						className="profile-settings__btn"
						onClick={handleDropdown}
					>
						<img
							src="../../../profile.png"
							className="profile-settings__img"
							alt="Иконка профиля"
						/>
						<img
							className="profile-setting__arrowdown"
							src="../../../arrow-down.svg"
							alt=""
						/>
					</button>
					{dropdownState && <ModalOptions />}
				</div>
			</div>
		</div>
	);
}

export default ProfileNavigationBar;
