import config from "../../config";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import "./Collection.css";
import { useState } from "react";

function Collection({}) {
	const url = `${config.apiBaseUrl}/image/default/20240502214901.jpg`;
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
		<>
			<ProfileNavigationBar />

			<div className="collection-container">
				<div className="collection-setting">
					<h2 className="collection-name">Альбом1</h2>
					<button
						className="collection-setting-btn"
						onClick={toggleAddDropdown}
					>
						···
					</button>
					{dropdownAdd && (
						<div className="collection-dropdown-add">
							<ul className="collection-filter-list">
								<li>
									<button className="collection-filter-btn">
										Изображение
									</button>
								</li>
								<li>
									<button className="collection-filter-btn">
										Коллекция
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
				<div className="collection-icon_profile">
					<img src="../../../profile-colletcion.svg" alt="" />
				</div>
			</div>

			<div className="grid-container">
				<div className="grid-item">
					<img src={url} alt="" />
				</div>
			</div>
		</>
	);
}

export default Collection;
