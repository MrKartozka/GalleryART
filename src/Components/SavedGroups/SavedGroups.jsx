import { React, useState } from "react";
import "./SavedGroups.css";

const SavedGroups = () => {
	const [dropdownFilter, setDropdownFilter] = useState(false);

	const toggleDropdown = () => {
		setDropdownFilter(!dropdownFilter);
	};
	return (
		<div className="saved-groups">
			<div className="saved-groups__buttons">
				<div className="filter__container">
					<button className="filter__btn" onClick={toggleDropdown}>
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
				<button>
					<img src="../../../add-group.svg" alt="" />
				</button>
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
