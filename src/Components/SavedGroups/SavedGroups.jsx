import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import config from "../../config";
import "./SavedGroups.css";
import { useNavigate } from "react-router-dom";

const SavedGroups = () => {
	const [dropdownFilter, setDropdownFilter] = useState(false);
	const [dropdownAdd, setDropdownAdd] = useState(false);
	const [collections, setCollections] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [collectionTitle, setCollectionTitle] = useState("");
	const [collectionDescription, setCollectionDescription] = useState("");
	const [isFlagEnabled, setIsFlagEnabled] = useState(false);
	const navigate = useNavigate();

	const filterButtonRef = useRef(null);
	const addButtonRef = useRef(null);
	const dropdownFilterRef = useRef(null);
	const dropdownAddRef = useRef(null);

	useEffect(() => {
		fetchCollections();
	}, []);

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
			console.log("Fetched collections:", response.data.content);
			setCollections(response.data.content);
		} catch (error) {
			console.error("Error fetching collections:", error);
		}
	};

	const toggleFlag = () => {
		setIsFlagEnabled(!isFlagEnabled);
	};

	const toggleFilterDropdown = () => {
		setDropdownFilter(!dropdownFilter);
		setDropdownAdd(false);
	};

	const toggleAddDropdown = () => {
		setDropdownAdd(!dropdownAdd);
		setDropdownFilter(false);
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => {
		setIsModalOpen(false);
		setCollectionTitle("");
		setCollectionDescription("");
	};

	const handleAlbumClick = (collectionId) => {
		navigate(`/collection/${collectionId}`);
	};

	const handleAllPostsClick = () => {
		navigate("/saved-posts");
	};

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
			setCollections([...collections, response.data]);
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
