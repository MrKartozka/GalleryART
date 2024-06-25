import React, { useState, useEffect } from "react";
import UserGroups from "../UserGroups/UserGroups";
import SavedGroups from "../SavedGroups/SavedGroups";
import "./Profile.css";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";
import PostDetail from "../PostDetail/PostDetail";
import config from "../../config";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// Компонент профиля пользователя
const Profile = ({ userEmail, onLogout }) => {
	const location = useLocation(); // Получаем текущее местоположение
	const [currentGroup, setCurrentGroup] = useState(
		location.state?.group || "added" // Устанавливаем текущую группу из состояния местоположения или по умолчанию "added"
	);
	const [posts, setPosts] = useState([]);
	const [selectedPost, setSelectedPost] = useState(null);
	const [number, setNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const navigate = useNavigate();

	// Функция для смены текущей группы
	const showGroups = (e) => {
		setCurrentGroup(e.currentTarget.dataset.group);
	};

	// Хук для загрузки постов при изменении номера страницы или текущей группы
	useEffect(() => {
		const fetchPosts = async (number) => {
			const accessToken = localStorage.getItem("accessToken");
			const userId = localStorage.getItem("userId");

			if (!userId) {
				console.error("User ID is not defined");
				return;
			}

			setLoading(true); // Устанавливаем состояние загрузки в true
			try {
				// Выполняем POST-запрос для получения всех постов
				const response = await axios.post(
					`${config.apiBaseUrl}/posts/action/search-all`,
					{
						pageInfo: {
							number,
							size: 10,
						},
						filterPostRequest: {
							saved: false,
							userId: parseInt(userId),
						},
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setPosts(response.data.content); // Обновляем состояние постов
			} catch (error) {
				console.error("Error loading posts:", error);
			} finally {
				setLoading(false); // Устанавливаем состояние загрузки в false
			}
		};

		if (currentGroup === "added") {
			fetchPosts(number); // Вызываем функцию для загрузки постов
		}
	}, [number, currentGroup]); // Перезапускаем хук при изменении номера страницы или текущей группы

	// Обработчик прокрутки для загрузки новых постов при достижении конца страницы
	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			setNumber((prevNumber) => prevNumber + 1); // Увеличиваем номер страницы на 1
		}
	};

	// Хук для добавления и удаления обработчика прокрутки
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Обработчик клика по посту для перехода на страницу деталей поста
	const handlePostClick = (post) => {
		navigate(`/profile/detail/${post.id}`, { state: { post } });
	};

	// Обработчик для закрытия окна с деталями поста
	const handleCloseDetail = () => {
		setSelectedPost(null);
	};

	// Функция для получения данных пользователя
	const fetchUserData = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		if (!userId) {
			console.error("User ID is not defined");
			return;
		}

		try {
			// Выполняем GET-запрос для получения данных пользователя
			const response = await axios.get(
				`${config.apiBaseUrl}/user/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const userData = response.data; // Получаем данные пользователя из ответа
			setUsername(userData.name); // Устанавливаем имя пользователя
			setDescription(userData.description); // Устанавливаем описание пользователя
			setProfilePicture(
				userData.image ? userData.image.fullFilename : null // Устанавливаем аватарку пользователя
			);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	// Хук для получения данных пользователя при монтировании компонента
	useEffect(() => {
		fetchUserData();
	}, []);

	// Функция для получения URL аватарки пользователя
	const getProfilePictureUrl = () => {
		if (!profilePicture) return "../../../big-profile.png";

		const filenameParts = profilePicture.split("/"); // Разделяем полное имя файла на части
		const bucketName = filenameParts[0]; // Получаем имя корзины
		const keyName = filenameParts.slice(1).join("/"); // Получаем ключ имени файла
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`; // Возвращаем URL изображения
	};

	return (
		<>
			{/* Отображаем панель навигации без поиска */}
			<NavigationBarWithoutFind
				userEmail={userEmail}
				onLogout={onLogout}
			/>
			{selectedPost ? (
				// Если пост выбран, отображаем его детали
				<PostDetail post={selectedPost} onClose={handleCloseDetail} />
			) : (
				<div className="profile-container">
					<div className="profile-info__logo">
						<img src={getProfilePictureUrl()} alt="" />
						<h3 className="profile-info-name">{username}</h3>
						<p className="profile-info-description">
							{description}
						</p>
						<p className="profile-info-email">{userEmail}</p>
						<p className="profile-info-subscribes">0 подписок</p>
						<div className="profile-info__buttons">
							<button className="profile-info-button">
								Поделиться
							</button>
							<button className="profile-info-button">
								Изменить профиль
							</button>
						</div>
					</div>
					<div className="profile-menu">
						<button data-group="added" onClick={showGroups}>
							Созданные
						</button>
						<button data-group="saved" onClick={showGroups}>
							Сохраненные
						</button>
					</div>
					{currentGroup === "added" ? (
						<UserGroups
							group={currentGroup}
							posts={posts}
							onPostClick={handlePostClick}
						/>
					) : (
						<SavedGroups />
					)}
					{loading && <p>Загрузка...</p>}
				</div>
			)}
		</>
	);
};

export default Profile;
