import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import "./Collection.css";

// Компонент Collection отображает коллекцию постов пользователя
function Collection() {
	const { collectionId } = useParams(); // Получаем идентификатор коллекции из URL
	const [collection, setCollection] = useState(null); // Состояние для хранения данных коллекции
	const [posts, setPosts] = useState([]); // Состояние для хранения постов в коллекции
	const [dropdownAdd, setDropdownAdd] = useState(false); // Состояние для управления выпадающим меню
	const [profilePicture, setProfilePicture] = useState(null); // Состояние для хранения URL изображения профиля
	const dropdownRef = useRef(null); // Реф для выпадающего меню
	const buttonRef = useRef(null); // Реф для кнопки выпадающего меню
	const navigate = useNavigate(); // Используем хук useNavigate для навигации

	// Хук useEffect для получения данных коллекции при монтировании компонента
	useEffect(() => {
		// Функция для получения данных коллекции
		const fetchCollection = async () => {
			const accessToken = localStorage.getItem("accessToken"); // Получаем токен доступа из localStorage
			try {
				const response = await axios.get(
					`${config.apiBaseUrl}/post-collection/${collectionId}`, // Запрос к API для получения данных коллекции
					{
						headers: {
							Authorization: `Bearer ${accessToken}`, // Добавляем токен доступа в заголовок запроса
						},
					}
				);
				setCollection(response.data); // Устанавливаем данные коллекции в состояние
				fetchUserProfile(response.data.owner.id); // Получаем профиль владельца коллекции
				fetchCollectionPosts(response.data.id); // Получаем посты в коллекции
			} catch (error) {
				console.error("Error fetching collection:", error); // Обрабатываем ошибку получения данных коллекции
			}
		};

		// Функция для получения постов в коллекции
		const fetchCollectionPosts = async (collectionId) => {
			const accessToken = localStorage.getItem("accessToken");
			const requestData = {
				pageInfo: {
					number: 0,
					size: 10,
				},
				filterPostByCollectionRequest: {
					collectionId: collectionId,
				},
			};
			try {
				const response = await axios.post(
					`${config.apiBaseUrl}/posts/action/search-by-collection`, // Запрос к API для получения постов в коллекции
					requestData,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`, // Добавляем токен доступа в заголовок запроса
							"Content-Type": "application/json",
						},
					}
				);
				setPosts(response.data.content); // Устанавливаем посты в состояние
			} catch (error) {
				console.error("Error fetching posts in collection:", error); // Обрабатываем ошибку получения постов
			}
		};

		fetchCollection(); // Вызываем функцию для получения данных коллекции
	}, [collectionId]);

	// Функция для получения профиля пользователя
	const fetchUserProfile = async (userId) => {
		const accessToken = localStorage.getItem("accessToken"); // Получаем токен доступа из localStorage
		try {
			const response = await axios.get(
				`${config.apiBaseUrl}/user/${userId}`, // Запрос к API для получения профиля пользователя
				{
					headers: {
						Authorization: `Bearer ${accessToken}`, // Добавляем токен доступа в заголовок запроса
					},
				}
			);
			const userProfile = response.data; // Полученные данные профиля пользователя
			setProfilePicture(
				userProfile.image
					? `${config.apiBaseUrl}/image/${userProfile.image.fullFilename}`
					: null // Устанавливаем URL изображения профиля в состояние
			);
		} catch (error) {
			console.error("Error fetching user profile:", error); // Обрабатываем ошибку получения профиля пользователя
		}
	};

	// Хук useEffect для обработки кликов вне выпадающего меню
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				setDropdownAdd(false);
			}
		}

		if (dropdownAdd) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownAdd]);

	// Функция для переключения состояния выпадающего меню
	const toggleAddDropdown = () => {
		setDropdownAdd((prevState) => !prevState);
	};

	if (!collection) {
		return <div>Loading...</div>;
	}

	const previewImage =
		posts.length > 0
			? `${config.apiBaseUrl}/image/${posts[0].images[0]?.fullFilename}`
			: "../../../route.jpg"; // URL изображения для предпросмотра

	const userProfileImage =
		profilePicture || "../../../profile-collection.svg"; // URL изображения профиля пользователя

	return (
		<>
			<ProfileNavigationBar />{" "}
			{/* Отображаем навигационную панель профиля */}
			<button
				className="collection-back-button"
				onClick={() =>
					navigate("/profile", { state: { group: "saved" } })
				}
			>
				←
			</button>
			<div className="collection-container">
				<div className="collection-setting">
					<h2 className="collection-name">{collection.title}</h2>
					<button
						ref={buttonRef}
						className={`collection-setting-btn ${
							dropdownAdd ? "active" : ""
						}`}
						onClick={toggleAddDropdown}
					>
						···
					</button>
					{dropdownAdd && (
						<div
							className="collection-dropdown-add"
							ref={dropdownRef}
						>
							<ul className="collection-filter-list">
								<li>
									<h4 className="header-collection-filter-btn">
										Действия в коллекции
									</h4>
									<button className="collection-filter-btn">
										Изменить альбом
									</button>
								</li>
								<li>
									<button className="collection-filter-btn">
										Поделиться
									</button>
								</li>
								<li>
									<button className="collection-filter-btn">
										Архивировать
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
				<div className="collection-icon_profile">
					<img
						src={userProfileImage}
						alt="User"
						width="50px"
						height="50px"
					/>
				</div>
			</div>
			<div className="grid-container">
				{posts.length > 0 ? (
					posts.map((post) => (
						<div key={post.id} className="grid-item">
							<img
								src={`${config.apiBaseUrl}/image/${post.images[0]?.fullFilename}`}
								alt={post.title}
							/>
						</div>
					))
				) : (
					<div className="grid-item">
						<img src={previewImage} alt="Default" />
					</div>
				)}
			</div>
		</>
	);
}

export default Collection;
