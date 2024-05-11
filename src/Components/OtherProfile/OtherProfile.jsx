import React, { useState } from "react";
import "./OtherProfile.css";
import OtherUserGroups from "../OtherUserGroups/OtherUserGroups";

const OtherProfile = () => {
	const [currentGroup, setCurrentGroup] = useState("added");

	const showGroups = (e) => {
		setCurrentGroup(e.currentTarget.dataset.group);
	};

	return (
		<div className="profile-container">
			<div className="profile-info__logo">
				<img src="../../../big-profile.png" alt="" />
				<h3>Автор</h3>
				<p>dassadasd@gmail.com</p>
				<p className="profile-description">
					Описание: Я гейм-дизайнер, занимаюсь отрисовкой разных
					моделек
				</p>
				<p>Ссылка на сайт: https//localhost</p>
				<p>0 подписок</p>
				<div className="profile-info__buttons">
					<button>Отправить сообщение</button>
					<button id="profile-subscribe--btn">Подписаться</button>
					<button id="profile-options--btn">…</button>
				</div>
			</div>
			<div className="profile-menu">
				<button data-group="added" onClick={showGroups}>
					Созданные
				</button>
				<button data-group="saved" onClick={showGroups}>
					Сохраненные
				</button>
			</div>
			<OtherUserGroups data={currentGroup} />
		</div>
	);
};

export default OtherProfile;
