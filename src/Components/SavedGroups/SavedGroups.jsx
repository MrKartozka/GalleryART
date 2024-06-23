import { React, useState } from "react";
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

	return (
		<div className="saved-groups">
			<div className="saved-groups__buttons">
				<div className="filter__container">
					<button
						className="filter__btn"
						onClick={toggleFilterDropdown}
					>
						<img src="../../../filter.svg" alt="" />
					</button>
					{dropdownFilter && (
						<div className="dropdown-filter">
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
					<button className="add__btn" onClick={toggleAddDropdown}>
						<img src="../../../add-group.svg" alt="" />
					</button>
					{dropdownAdd && (
						<div className="dropdown-add">
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
				<div className="saved-groups__albums-item">
					<img src="../../../background.jpg" alt="" />
					<h4>Все картинки</h4>
					<p>3 картинки</p>
				</div>
				<div
					className="saved-groups__albums-item"
					onClick={handleAlbumClick}
				>
					<img src="../../../route.jpg" alt="" />
					<h4>Альбом1</h4>
					<p>3 альбома</p>
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
