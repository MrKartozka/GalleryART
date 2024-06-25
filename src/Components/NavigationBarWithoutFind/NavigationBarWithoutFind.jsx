import "./NavigationBarWithoutFind.css";
import ModalOptions from "../ModalOptions/ModalOptions";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";

// Компонент NavigationBarWithoutFind отображает навигационную панель без функции поиска
function NavigationBarWithoutFind({ userEmail, onLogout }) {
	const [dropdownState, setDropdownState] = useState(false);
	const [profilePicture, setProfilePicture] = useState(null);
	const navigate = useNavigate();

	const dropdownRef = useRef(null); // Реф для выпадающего меню
	const buttonRef = useRef(null); // Реф для кнопки профиля

	// Функция для переключения состояния выпадающего меню
	// const handleDropdown = () => {
	// 	setDropdownState((prevState) => !prevState); // Переключаем состояние открытия/закрытия
	// };

	// Функция для обработки клика по логотипу
	const handleLogoClick = () => {
		navigate("/gallery");
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
						Authorization: `Bearer ${accessToken}`, // Добавляем токен доступа в заголовок запроса
					},
				}
			);
			const userData = response.data; // Полученные данные пользователя
			setProfilePicture(
				userData.image ? userData.image.fullFilename : null // Устанавливаем URL изображения профиля в состояние
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
				setDropdownState(false); // Закрываем выпадающее меню при клике вне его области
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

	// Функция для получения URL изображения профиля
	const getProfilePictureUrl = () => {
		if (!profilePicture) return "../../../profile.png"; // Возвращаем URL изображения по умолчанию, если профильное изображение не установлено

		const filenameParts = profilePicture.split("/"); // Разделяем URL изображения на части
		const bucketName = filenameParts[0]; // Имя корзины
		const keyName = filenameParts.slice(1).join("/"); // Имя файла
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`; // Возвращаем полный URL изображения
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
