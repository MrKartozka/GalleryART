import config from "../../config";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import "./Collection.css";
import { useState, useEffect, useRef } from "react";

function Collection({}) {
	const url = `${config.apiBaseUrl}/image/default/20240502214901.jpg`;
	// const [dropdownFilter, setDropdownFilter] = useState(false);
	const [dropdownAdd, setDropdownAdd] = useState(false);

	const dropdownRef = useRef(null);

	const buttonRef = useRef(null); // Добавляем ref для кнопки

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target) // Проверяем, что клик не был по кнопке
			) {
				console.log("Клик за пределами выпадающего списка");
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

	const toggleAddDropdown = () => {
		// Переключение состояния dropdownAdd
		setDropdownAdd((prevState) => !prevState);
	};

	return (
		<>
			<ProfileNavigationBar />

			<div className="collection-container">
				<div className="collection-setting">
					<h2 className="collection-name">Альбом1</h2>
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
