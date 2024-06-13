import React, { useEffect, useState } from "react";
import UserGroups from "../UserGroups/UserGroups";
import "./Profile.css";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";
import AddedGroups from "../AddedGroups/AddedGroups";
import config from "../../config";

const Profile = ({ userEmail, onLogout }) => {
	const [currentGroup, setCurrentGroup] = useState("added");
	const [posts, setPosts] = useState([]); // Добавьте состояние для постов

	const showGroups = (e) => {
		setCurrentGroup(e.currentTarget.dataset.group);
	};

	// Загрузите посты при монтировании компонента
	useEffect(() => {
		// Замените на реальный запрос к вашему API
		fetch(`${config.apiBaseUrl}/posts`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => setPosts(data))
			.catch((error) => console.error("Error loading posts:", error));
	}, []);

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
				{currentGroup === "added" ? (
					<AddedGroups posts={posts} />
				) : (
					<UserGroups data={currentGroup} posts={posts} />
				)}
			</div>
		</>
	);
};

export default Profile;
