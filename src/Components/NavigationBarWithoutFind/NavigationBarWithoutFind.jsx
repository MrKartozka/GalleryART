import "./NavigationBarWithoutFind.css";
import ModalOptions from "../ModalOptions/ModalOptions";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";

function NavigationBarWithoutFind({ userEmail, onLogout }) {
	const [dropdownState, setDropdownState] = useState(false);
	const [profilePicture, setProfilePicture] = useState(null);
	const navigate = useNavigate();

	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);

	const handleDropdown = () => {
		setDropdownState((prevState) => !prevState); // Переключаем состояние открытия/закрытия
	};

	const handleLogoClick = () => {
		navigate("/gallery");
	};

	const fetchUserData = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		try {
			const response = await axios.get(
				`${config.apiBaseUrl}/user/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const userData = response.data;
			setProfilePicture(
				userData.image ? userData.image.fullFilename : null
			);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				setDropdownState(false);
			}
		}

		if (dropdownState) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownState]);

	const handleProfileButtonClick = () => {
		if (dropdownState) {
			setDropdownState(false); // Закрываем выпадающий список при повторном клике на кнопку профиля
		} else {
			setDropdownState(true); // Открываем выпадающий список при первом клике на кнопку профиля
		}
	};

	const getProfilePictureUrl = () => {
		if (!profilePicture) return "../../../profile.png";

		const filenameParts = profilePicture.split("/");
		const bucketName = filenameParts[0];
		const keyName = filenameParts.slice(1).join("/");
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`;
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
							ref={buttonRef}
							className="profile-settings__btn"
							onClick={handleProfileButtonClick}
						>
							<img
								src={getProfilePictureUrl()}
								className="profile-wf-settings__img"
								alt="Иконка профиля"
								style={{
									borderRadius: "50%",
									width: "24px",
									height: "24px",
								}}
							/>
							<img
								className={`profile-wf-setting__arrowdown ${
									dropdownState ? "arrow-up" : ""
								}`}
								src="../../../arrow-down.svg"
								alt=""
							/>
						</button>

						{dropdownState && (
							<div ref={dropdownRef}>
								<ModalOptions
									userEmail={userEmail}
									onLogout={onLogout}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavigationBarWithoutFind;
