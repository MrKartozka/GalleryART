import { React, useState } from "react";
import "./SavedGroups.css";

const SavedGroups = () => {
	const [dropdownFilter, setDropdownFilter] = useState(false);
	const [dropdownAdd, setDropdownAdd] = useState(false);

	const toggleFilterDropdown = () => {
		setDropdownFilter(!dropdownFilter);
		setDropdownAdd(false);
	};

	const toggleAddDropdown = () => {
		setDropdownAdd(!dropdownAdd);
		setDropdownFilter(false);
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
									<button className="filter-btn">
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
				<div className="saved-groups__albums-item">
					<img src="../../../route.jpg" alt="" />
					<h4>Альбом1</h4>
					<p>3 альбома</p>
				</div>
			</div>
		</div>
	);
};

export default SavedGroups;
