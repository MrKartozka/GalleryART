import "./ProfileNavigationBar.css";
import ModalOptions from "../ModalOptions/ModalOptions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";

function ProfileNavigationBar({ userEmail, onLogout }) {
	const [dropdownState, setDropdownState] = useState(false);
	const [profilePicture, setProfilePicture] = useState(null);
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const handleDropdown = () => {
		setDropdownState(!dropdownState);
	};

	const handleLogoClick = () => {
		navigate("/gallery");
	};

	const handleCreateClick = () => {
		navigate("/add-picture");
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
			setUsername(userData.name);
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

	const getProfilePictureUrl = () => {
		if (!profilePicture) return "../../../profile.png";

		const filenameParts = profilePicture.split("/");
		const bucketName = filenameParts[0];
		const keyName = filenameParts.slice(1).join("/");
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`;
	};

	return (
		<div className="profile-nav">
			<div className="profile-nav__container">
				<div className="profile-nav__first-box">
					<div
						className="profile-nav__logo"
						onClick={handleLogoClick}
					>
						Gallery Art
					</div>
					<button
						className="profile-nav__create-profile"
						onClick={handleCreateClick}
					>
						Создать
					</button>
				</div>
				<div className="search-field">
					<input type="text" placeholder="Поиск картинки" />
				</div>
				<div className="profile-nav__second-box">
					<button className="profile-nav__notification-btn">
						<img
							src="../../../notification.svg"
							alt="Уведомления"
						/>
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
								src={getProfilePictureUrl()}
								className="profile-settings__img"
								alt="Иконка профиля"
								style={{
									borderRadius: "50%",
									width: "24px",
									height: "24px",
								}}
							/>
							<img
								className="profile-setting__arrowdown"
								src="../../../arrow-down.svg"
								alt=""
							/>
						</button>
						{dropdownState && (
							<ModalOptions
								userEmail={userEmail}
								username={username}
								profilePicture={getProfilePictureUrl()}
								onLogout={onLogout}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileNavigationBar;
