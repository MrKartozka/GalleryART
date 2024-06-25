import "./ProfileNavigationBar.css";
import ModalOptions from "../ModalOptions/ModalOptions";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";

// Компонент ProfileNavigationBar отображает навигационную панель с дополнительными функциями профиля
function ProfileNavigationBar({ userEmail, onLogout }) {
	const [dropdownState, setDropdownState] = useState(false);
	const [profilePicture, setProfilePicture] = useState(null);
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const dropdownRef = useRef(null); // Реф для выпадающего меню
	const buttonRef = useRef(null); // Реф для кнопки профиля

	// Функция для переключения состояния выпадающего меню
	const handleDropdown = () => {
		setDropdownState((prevState) => !prevState); // Инвертируем состояние dropdownState
	};

	// Функция для обработки клика по логотипу
	const handleLogoClick = () => {
		navigate("/gallery"); // Навигация на страницу галереи
	};

	// Функция для обработки клика по кнопке "Создать"
	const handleCreateClick = () => {
		navigate("/add-picture"); // Навигация на страницу добавления изображения
	};

	// Функция для получения данных пользователя
	const fetchUserData = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		try {
			const response = await axios.get(
				`${config.apiBaseUrl}/user/${userId}`, // Запрос к API для получения данных пользователя
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const userData = response.data; // Полученные данные пользователя
			setUsername(userData.name); // Устанавливаем имя пользователя в состояние
			setProfilePicture(
				userData.image ? userData.image.fullFilename : null
			);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	// Хук useEffect для вызова функции fetchUserData при монтировании компонента
	useEffect(() => {
		fetchUserData();
	}, []);

	// Хук useEffect для обработки кликов вне выпадающего меню
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

	// Функция для получения URL изображения профиля
	const getProfilePictureUrl = () => {
		if (!profilePicture) return "../../../profile.png"; // Возвращаем URL изображения по умолчанию, если профильное изображение не установлено

		const filenameParts = profilePicture.split("/"); // Разделяем URL изображения на части
		const bucketName = filenameParts[0]; // Имя корзины
		const keyName = filenameParts.slice(1).join("/"); // Имя файла
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`; // Возвращаем полный URL изображения
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
							ref={buttonRef}
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
								className={`profile-setting__arrowdown ${
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
									username={username}
									profilePicture={getProfilePictureUrl()}
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

export default ProfileNavigationBar;
