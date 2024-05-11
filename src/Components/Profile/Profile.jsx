import React, { useState } from "react";
import UserGroups from "../UserGroups/UserGroups";
import "./Profile.css";

const Profile = () => {
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
				<p>0 подписок</p>
				<div className="profile-info__buttons">
					<button>Поделиться</button>
					<button>Изменить профиль</button>
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
			<UserGroups data={currentGroup} />
		</div>
	);
};

export default Profile;
