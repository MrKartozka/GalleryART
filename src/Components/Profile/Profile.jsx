import React, { useEffect, useState } from "react";
import UserGroups from "../UserGroups/UserGroups";
import "./Profile.css";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";
import AddedGroups from "../AddedGroups/AddedGroups";
import PostDetail from "../PostDetail/PostDetail";
import config from "../../config";

const Profile = ({ userEmail, onLogout }) => {
	const [currentGroup, setCurrentGroup] = useState("added");
	const [posts, setPosts] = useState([]);
	const [selectedPost, setSelectedPost] = useState(null);
	const [number, setNumber] = useState(0);
	const [loading, setLoading] = useState(false);

	const showGroups = (e) => {
		setCurrentGroup(e.currentTarget.dataset.group);
	};

	useEffect(() => {
		const fetchPosts = async (number) => {
			const accessToken = localStorage.getItem("accessToken");
			setLoading(true);
			try {
				const response = await fetch(
					`${config.apiBaseUrl}/posts/action/search-all`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
						body: JSON.stringify({
							number,
							size: 10,
						}),
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setPosts((prevPosts) => [...prevPosts, ...data.content]); // Add new posts to the existing list
			} catch (error) {
				console.error("Error loading posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts(number);
	}, [number]);

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
		setSelectedPost(post);
	};

	const handleCloseDetail = () => {
		setSelectedPost(null);
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
					<AddedGroups posts={posts} onPostClick={handlePostClick} />
					{loading && <p>Загрузка...</p>}
				</div>
			)}
		</>
	);
};

export default Profile;
