import React, { useState, useEffect } from "react";
import UserGroups from "../UserGroups/UserGroups";
import SavedGroups from "../SavedGroups/SavedGroups";
import "./Profile.css";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";
import PostDetail from "../PostDetail/PostDetail";
import config from "../../config";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = ({ userEmail, onLogout }) => {
	const location = useLocation();
	const [currentGroup, setCurrentGroup] = useState(
		location.state?.group || "added"
	);
	const [posts, setPosts] = useState([]);
	const [selectedPost, setSelectedPost] = useState(null);
	const [number, setNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const navigate = useNavigate();

	const showGroups = (e) => {
		setCurrentGroup(e.currentTarget.dataset.group);
	};

	useEffect(() => {
		const fetchPosts = async (number) => {
			const accessToken = localStorage.getItem("accessToken");
			const userId = localStorage.getItem("userId");

			if (!userId) {
				console.error("User ID is not defined");
				return;
			}

			setLoading(true);
			try {
				const response = await axios.post(
					`${config.apiBaseUrl}/posts/action/search-all`,
					{
						pageInfo: {
							number,
							size: 10,
						},
						filterPostRequest: {
							saved: false,
							userId: parseInt(userId),
						},
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setPosts(response.data.content);
			} catch (error) {
				console.error("Error loading posts:", error);
			} finally {
				setLoading(false);
			}
		};

		if (currentGroup === "added") {
			fetchPosts(number);
		}
	}, [number, currentGroup]);

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			setNumber((prevNumber) => prevNumber + 1);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handlePostClick = (post) => {
		navigate(`/profile/detail/${post.id}`, { state: { post } });
	};

	const handleCloseDetail = () => {
		setSelectedPost(null);
	};

	const fetchUserData = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		if (!userId) {
			console.error("User ID is not defined");
			return;
		}

		try {
			const response = await axios.get(
				`${config.apiBaseUrl}/user/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const userData = response.data;
			setUsername(userData.name);
			setDescription(userData.description);
			setProfilePicture(
				userData.image ? userData.image.fullFilename : null
			);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const getProfilePictureUrl = () => {
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
						<h3 className="profile-info-name">{username}</h3>
						<p className="profile-info-description">
							{description}
						</p>
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
							posts={posts}
							onPostClick={handlePostClick}
						/>
					) : (
						<SavedGroups />
					)}
					{loading && <p>Загрузка...</p>}
				</div>
			)}
		</>
	);
};

export default Profile;
