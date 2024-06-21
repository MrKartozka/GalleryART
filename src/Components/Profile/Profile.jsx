import React, { useState } from "react";
import UserGroups from "../UserGroups/UserGroups";
import SavedGroups from "../SavedGroups/SavedGroups";
import "./Profile.css";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";
import PostDetail from "../PostDetail/PostDetail";
import config from "../../config";

const Profile = ({ userEmail, onLogout }) => {
	const [currentGroup, setCurrentGroup] = useState("added");
	const [selectedPost, setSelectedPost] = useState(null);

	const showGroups = (e) => {
		setCurrentGroup(e.currentTarget.dataset.group);
	};

	const handlePostClick = (post) => {
		setSelectedPost(post);
	};

	const handleCloseDetail = () => {
		setSelectedPost(null);
	};

	const getProfilePictureUrl = () => {
		const profilePicture = localStorage.getItem("profilePicture");
		if (!profilePicture) return "../../../big-profile.png";

		const filenameParts = profilePicture.split("/");
		const bucketName = filenameParts[0];
		const keyName = filenameParts.slice(1).join("/");
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`;
	};

	return (
		<>
			<NavigationBarWithoutFind
				userEmail={userEmail}
				onLogout={onLogout}
			/>
			{selectedPost ? (
				<PostDetail post={selectedPost} onClose={handleCloseDetail} />
			) : (
				<div className="profile-container">
					<div className="profile-info__logo">
						<img src={getProfilePictureUrl()} alt="" />
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
						<UserGroups
							group={currentGroup}
							posts={[]}
							onPostClick={handlePostClick}
						/>
					) : (
						<SavedGroups />
					)}
				</div>
			)}
		</>
	);
};

export default Profile;
