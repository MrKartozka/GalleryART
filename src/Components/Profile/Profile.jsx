import React, { useState } from "react";
import UserGroups from "../UserGroups/UserGroups";
import "./Profile.css";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";

const Profile = ({ userEmail, onLogout }) => {
	const [currentGroup, setCurrentGroup] = useState("added");

	const showGroups = (e) => {
		setCurrentGroup(e.currentTarget.dataset.group);
	};

	return (
		<>
			<NavigationBarWithoutFind
				userEmail={userEmail}
				onLogout={onLogout}
			/>
			<div className="profile-container">
				<div className="profile-info__logo">
					<img src="../../../big-profile.png" alt="" />
					<h3 className="profile-info-name">Автор</h3>
					<p className="profile-info-email">{userEmail}</p>
					<p className="profile-info-subscribes">0 подписок</p>
					<div className="profile-info__buttons">
						<button className="profile-info-button">
							Поделиться
						</button>
						<button className="profile-info-button">
							Изменить профиль
						</button>
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
		</>
	);
};

export default Profile;
