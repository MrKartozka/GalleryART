import React, { useState, useEffect, useRef } from "react";
import "./SavedGroups.css";
import { useNavigate } from "react-router-dom";

const SavedGroups = () => {
	const [dropdownFilter, setDropdownFilter] = useState(false);
	const [dropdownAdd, setDropdownAdd] = useState(false);
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const [isFlagEnabled, setIsFlagEnabled] = useState(false);

	//
	const dropdownFilterRef = useRef(null);
	const filterButtonRef = useRef(null);
	const dropdownAddRef = useRef(null);
	const addButtonRef = useRef(null);

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

	const handleAlbumClick = (collectionId) => {
		navigate(`/collection/${collectionId}`);
	};

	const handleAllPostsClick = () => {
		navigate("/saved-posts");
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				(dropdownFilterRef.current &&
					!dropdownFilterRef.current.contains(event.target) &&
					!filterButtonRef.current.contains(event.target)) ||
				(dropdownAddRef.current &&
					!dropdownAddRef.current.contains(event.target) &&
					!addButtonRef.current.contains(event.target))
			) {
				console.log("Клик за пределами выпадающего списка");
				setDropdownFilter(false);
				setDropdownAdd(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="saved-groups">
			<div className="saved-groups__buttons">
				<div className="filter__container">
					<button
						className={`filter__btn ${
							dropdownFilter ? "active" : ""
						}`}
						ref={filterButtonRef}
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
						className={`add__btn ${dropdownAdd ? "active" : ""}`}
						onClick={toggleAddDropdown}
						ref={addButtonRef}
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
				<div
					className="saved-groups__albums-item"
					onClick={handleAlbumClick}
				>
					<img src="../../../route.jpg" alt="" />
					<h4>Коллекция1</h4>
					<p>3 поста</p>
				</div>
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
								placeholder="Например, “котики” и т.д."
							/>
						</div>
						<div className="description-new-collection">
							<h3 className="title-description-name">Описание</h3>

							<input
								type="text"
								name="description-collection"
								className="description-collection-text"
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
							<button className="save-collection-btn">
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
