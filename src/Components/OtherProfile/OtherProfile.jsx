import React, { useState } from "react";
import "./OtherProfile.css";
import OtherUserGroups from "../OtherUserGroups/OtherUserGroups";

const OtherProfile = () => {
	const [dropdownOptions, setDropdownOptions] = useState(false);
	const toggleOptions = () => {
		setDropdownOptions(!dropdownOptions);
	};

	const [currentGroup, setCurrentGroup] = useState("added");

	const showGroups = (e) => {
		setCurrentGroup(e.currentTarget.dataset.group);
	};

	return (
		<div className="otherprofile-container">
			<div className="otherprofile-info__logo">
				<img src="../../../big-profile.png" alt="" />
				<h3>Автор</h3>
				<p>dassadasd@gmail.com</p>
				<p className="otherprofile-description">
					Описание: Я гейм-дизайнер, занимаюсь отрисовкой разных
					моделек
				</p>
				<p>Ссылка на сайт: https//localhost</p>
				<p>0 подписок</p>
				<div className="otherprofile-info__buttons">
					<button className="btn">Отправить сообщение</button>
					<button className="btn" id="otherprofile-subscribe--btn">
						Подписаться
					</button>
					<div className="options-container">
						<button
							id="otherprofile-options--btn"
							className="btn"
							onClick={toggleOptions}
						>
							…
						</button>
						{dropdownOptions && (
							<div className="dropdown-options">
								<ul className="dropdown-list">
									<li>
										<button className="dropdown-btn">
											Заблокировать
										</button>
									</li>
									<li>
										<button className="dropdown-btn">
											Пожаловаться
										</button>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="otherprofile-menu">
				<button
					className="otherprofile-menu__btn"
					data-group="added"
					onClick={showGroups}
				>
					Созданные
				</button>
				<button
					className="otherprofile-menu__btn"
					data-group="saved"
					onClick={showGroups}
				>
					Сохраненные
				</button>
			</div>
			<OtherUserGroups data={currentGroup} />
		</div>
	);
};

export default OtherProfile;
