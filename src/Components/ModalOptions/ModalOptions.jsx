import React, { useState, useEffect } from "react";
import "./ModalOptions.css";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";

// Компонент ModalOptions отображает выпадающее меню с различными опциями пользователя
function ModalOptions({ userEmail, onLogout }) {
	const navigate = useNavigate();
	const [profilePicture, setProfilePicture] = useState(null);
	const [username, setUsername] = useState("");

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
			setUsername(userData.name); // Устанавливаем имя пользователя в состояние
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

	// Функция для обработки клика по кнопке профиля
	const handleProfileClick = () => {
		navigate("/profile"); // Навигация на страницу профиля
	};

	// Функция для обработки клика по кнопке настроек
	const handleSettingsClick = () => {
		navigate("/settings"); // Навигация на страницу настроек
	};

	// Функция для получения URL изображения профиля
	const getProfilePictureUrl = () => {
		if (!profilePicture) return "big-profile.png"; // Возвращаем URL изображения по умолчанию, если профильное изображение не установлено

		const filenameParts = profilePicture.split("/"); // Разделяем URL изображения на части
		const bucketName = filenameParts[0]; // Имя корзины
		const keyName = filenameParts.slice(1).join("/"); // Имя файла
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`; // Возвращаем полный URL изображения
	};

	return (
		<div className="dropdown">
			<button
				className="dropdown__profile-info"
				onClick={handleProfileClick}
			>
				<div className="dropdown__avatar">
					<img
						src={getProfilePictureUrl()}
						alt=""
						width="64px"
						style={{ borderRadius: "50%" }}
					/>
				</div>
				<div className="dropdown__texts">
					<div className="dropdown__nickname">{username}</div>
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
