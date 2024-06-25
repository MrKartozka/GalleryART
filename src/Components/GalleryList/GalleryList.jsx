import React, { useEffect, useState } from "react";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import NavigationBar from "./../NavigationBar/NavigationBar";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import "./GalleryList.css";

// Компонент для отображения списка постов галереи
function GalleryList({ userEmail, onLogout, isAuthenticated }) {
	const [posts, setPosts] = useState([]); // Состояние для хранения постов
	const [savedPostIds, setSavedPostIds] = useState(new Set()); // Состояние для хранения ID сохраненных постов
	const [number, setNumber] = useState(0); // Состояние для хранения номера страницы
	const [loading, setLoading] = useState(false); // Состояние для индикации загрузки
	const navigate = useNavigate();

	// Хук для загрузки постов при изменении номера страницы
	useEffect(() => {
		const fetchPosts = async () => {
			const accessToken = localStorage.getItem("accessToken"); // Получаем токен доступа из localStorage
			const userId = localStorage.getItem("userId"); // Получаем ID пользователя из localStorage
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
						filterPostRequest: {},
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				// Обновляем состояние постов, добавляя новые посты
				setPosts((prevPosts) => {
					const newPosts = response.data.content.filter(
						(post) =>
							!prevPosts.some(
								(prevPost) => prevPost.id === post.id
							)
					);
					return [...prevPosts, ...newPosts];
				});

				// Выполняем POST-запрос для получения сохраненных постов пользователя
				const savedResponse = await axios.post(
					`${config.apiBaseUrl}/posts/action/search-all`,
					{
						pageInfo: {
							number: 0,
							size: 1000,
						},
						filterPostRequest: {
							saved: true,
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
				// Обновляем состояние сохраненных постов
				setSavedPostIds(
					new Set(savedResponse.data.content.map((post) => post.id))
				);
			} catch (error) {
				console.error("Error loading posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts(number); // Вызываем функцию для загрузки постов
	}, [number]); // Перезапускаем хук при изменении номера страницы

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

	// Обработчик клика по кнопке сохранения поста
	const handleSaveClick = async (postId, authorId) => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		if (userId === authorId) {
			console.log("You cannot save your own post.");
			return;
		}

		try {
			// Выполняем PUT-запрос для сохранения или удаления поста из сохраненных
			const response = await axios.put(
				`${config.apiBaseUrl}/posts/action/add-to-saved/${postId}`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(
				`Save/remove post response for postId ${postId}:`,
				response.data
			);
			// Обновляем состояние сохраненных постов в зависимости от ответа
			if (response.data === true) {
				setSavedPostIds(new Set([...savedPostIds, postId]));
			} else {
				setSavedPostIds(
					new Set([...savedPostIds].filter((id) => id !== postId))
				);
			}
		} catch (error) {
			console.error("Error saving/removing post:", error);
		}
	};

	return (
		<>
			{/* Отображаем соответствующую панель навигации в зависимости от аутентификации */}
			{isAuthenticated ? (
				<ProfileNavigationBar
					userEmail={userEmail}
					onLogout={onLogout}
				/>
			) : (
				<NavigationBar isAuthenticated={isAuthenticated} />
			)}

			<div className="grid-container">
				{/* Отображаем посты в сетке */}
				{posts.map((post) => (
					<div
						key={post.id} // Используем post.id для уникального ключа
						className="grid-item"
						onClick={() => handlePostClick(post)}
					>
						<div className="image-container">
							<img
								src={`${config.apiBaseUrl}/image/${post.images[0]?.fullFilename}`}
								alt={post.title}
							/>
							<div className="overlay">
								<div className="text">{post.title}</div>
							</div>
							<button
								className="save-button"
								onClick={(e) => {
									e.stopPropagation(); // Останавливаем всплытие события, чтобы не активировался обработчик клика по посту
									handleSaveClick(post.id, post.userId);
								}}
							>
								{savedPostIds.has(post.id)
									? "Сохранено"
									: "Сохранить"}
							</button>
						</div>
					</div>
				))}
				{loading && <p>Загрузка...</p>}
			</div>
		</>
	);
}

export default GalleryList;
