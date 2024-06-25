import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import config from "../../config";
import "./SavedGroups.css";
import { useNavigate } from "react-router-dom";

// Компонент для отображения сохраненных групп
const SavedGroups = () => {
	const [dropdownFilter, setDropdownFilter] = useState(false);
	const [dropdownAdd, setDropdownAdd] = useState(false);
	const [collections, setCollections] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [collectionTitle, setCollectionTitle] = useState("");
	const [collectionDescription, setCollectionDescription] = useState("");
	const [isFlagEnabled, setIsFlagEnabled] = useState(false);
	const navigate = useNavigate();

	const filterButtonRef = useRef(null); // Реф для кнопки фильтра
	const addButtonRef = useRef(null); // Реф для кнопки добавления
	const dropdownFilterRef = useRef(null); // Реф для выпадающего списка фильтров
	const dropdownAddRef = useRef(null); // Реф для выпадающего списка добавления

	// Хук для получения коллекций при монтировании компонента
	useEffect(() => {
		fetchCollections();
	}, []);

	// Хук для закрытия выпадающих списков при клике вне их области
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownFilterRef.current &&
				!dropdownFilterRef.current.contains(event.target) &&
				!filterButtonRef.current.contains(event.target)
			) {
				setDropdownFilter(false);
			}
			if (
				dropdownAddRef.current &&
				!dropdownAddRef.current.contains(event.target) &&
				!addButtonRef.current.contains(event.target)
			) {
				setDropdownAdd(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Функция для получения всех коллекций пользователя
	const fetchCollections = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		try {
			const response = await axios.post(
				`${config.apiBaseUrl}/post-collection/action/search-all`,
				{
					pageInfo: {
						number: 0,
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
			setCollections(response.data.content); // Обновляем состояние коллекций
		} catch (error) {
			console.error("Error fetching collections:", error);
		}
	};

	// Функция для переключения флага видимости коллекции
	const toggleFlag = () => {
		setIsFlagEnabled(!isFlagEnabled);
	};

	// Функция для переключения видимости выпадающего списка фильтров
	const toggleFilterDropdown = () => {
		setDropdownFilter(!dropdownFilter);
		setDropdownAdd(false);
	};

	// Функция для переключения видимости выпадающего списка добавления
	const toggleAddDropdown = () => {
		setDropdownAdd(!dropdownAdd);
		setDropdownFilter(false);
	};

	// Функции для открытия и закрытия модального окна
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => {
		setIsModalOpen(false);
		setCollectionTitle("");
		setCollectionDescription("");
	};

	// Функция для перехода к коллекции
	const handleAlbumClick = (collectionId) => {
		navigate(`/collection/${collectionId}`);
	};

	// Функция для перехода к сохраненным постам
	const handleAllPostsClick = () => {
		navigate("/saved-posts");
	};

	// Функция для создания новой коллекции
	const handleCreateCollection = async () => {
		const accessToken = localStorage.getItem("accessToken");

		try {
			const response = await axios.post(
				`${config.apiBaseUrl}/post-collection`,
				{
					title: collectionTitle,
					description: collectionDescription,
					hide: isFlagEnabled,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			setCollections([...collections, response.data]); // Обновляем состояние коллекций
			closeModal();
		} catch (error) {
			console.error("Error creating collection:", error);
		}
	};

	return (
		<div className="saved-groups">
			<div className="saved-groups__buttons">
				<div className="filter__container">
					<button
						ref={filterButtonRef}
						className={`filter__btn ${
							dropdownFilter ? "active" : ""
						}`}
						onClick={toggleFilterDropdown}
					>
						<img src="../../../filter.svg" alt="" />
					</button>
					{dropdownFilter && (
						<div
							className="dropdown-filter"
							ref={dropdownFilterRef}
						>
							<ul className="filter-list">
								<span className="filter-sort">Сортировка</span>
								<li>
									<button className="filter-btn">
										В алфавитном порядке
									</button>
								</li>
								<li>
									<button className="filter-btn">
										Настраиваемая
									</button>
								</li>
								<li>
									<button className="filter-btn">
										По добавлению
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
				<div className="add__container">
					<button
						ref={addButtonRef}
						className={`add__btn ${dropdownAdd ? "active" : ""}`}
						onClick={toggleAddDropdown}
					>
						<img src="../../../add-group.svg" alt="" />
					</button>
					{dropdownAdd && (
						<div className="dropdown-add" ref={dropdownAddRef}>
							<ul className="filter-list">
								<li>
									<button className="filter-btn">
										Изображение
									</button>
								</li>
								<li>
									<button
										className="filter-btn"
										onClick={openModal}
									>
										Коллекция
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
			<div className="saved-groups__albums">
				<div
					className="saved-groups__albums-item"
					onClick={handleAllPostsClick}
				>
					<img src="../../../background.jpg" alt="" />
					<h4>Все посты</h4>
					<p>30 постов</p>
				</div>
				{collections.map((collection) => (
					<div
						key={collection.id}
						className="saved-groups__albums-item"
						onClick={() => handleAlbumClick(collection.id)}
					>
						<img src="../../../route.jpg" alt="" />
						<h4>{collection.title}</h4>
						<p>
							{collection.posts ? collection.posts.length : 0}{" "}
							постов
						</p>
					</div>
				))}
			</div>
			{isModalOpen && (
				<div className="modal-overlay">
					<div className="modal-content">
						<span className="close-button" onClick={closeModal}>
							&times;
						</span>
						<h2>Создание Коллекции</h2>
						<div className="name-new-collection">
							<h3 className="title-name-collection">Название</h3>
							<input
								type="text"
								name="name-collection"
								className="name-collection-text"
								value={collectionTitle}
								onChange={(e) =>
									setCollectionTitle(e.target.value)
								}
								placeholder="Например, “котики” и т.д."
							/>
						</div>
						<div className="description-new-collection">
							<h3 className="title-description-name">Описание</h3>
							<input
								type="text"
								name="description-collection"
								className="description-collection-text"
								value={collectionDescription}
								onChange={(e) =>
									setCollectionDescription(e.target.value)
								}
								placeholder="Опишите свою коллекцию"
							/>
						</div>
						<div className="visible-collection">
							<input
								type="checkbox"
								checked={isFlagEnabled}
								onChange={toggleFlag}
								className="visible-collection-flag"
							/>
							<label className="visible-collection-text">
								<h4>Сделать Альбом скрытым</h4>
								Видеть его будете только вы
							</label>
						</div>
						<div className="save-collection">
							<button
								className="save-collection-btn"
								onClick={handleCreateCollection}
							>
								Создать
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SavedGroups;
