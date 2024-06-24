import React, { useEffect, useState } from "react";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import NavigationBar from "./../NavigationBar/NavigationBar";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import "./GalleryList.css";

function GalleryList({ userEmail, onLogout, isAuthenticated }) {
	const [posts, setPosts] = useState([]);
	const [savedPostIds, setSavedPostIds] = useState(new Set());
	const [number, setNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			const accessToken = localStorage.getItem("accessToken");
			const userId = localStorage.getItem("userId");
			setLoading(true);
			try {
				const response = await axios.post(
					`${config.apiBaseUrl}/posts/action/search-all`,
					{
						pageInfo: {
							number,
							size: 10,
						},
						filterPostRequest: {},
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setPosts((prevPosts) => {
					const newPosts = response.data.content.filter(
						(post) =>
							!prevPosts.some(
								(prevPost) => prevPost.id === post.id
							)
					);
					return [...prevPosts, ...newPosts];
				});

				const savedResponse = await axios.post(
					`${config.apiBaseUrl}/posts/action/search-all`,
					{
						pageInfo: {
							number: 0,
							size: 1000,
						},
						filterPostRequest: {
							saved: true,
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
				setSavedPostIds(
					new Set(savedResponse.data.content.map((post) => post.id))
				);
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
		navigate(`/profile/detail/${post.id}`, { state: { post } });
	};

	const handleSaveClick = async (postId, authorId) => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		if (userId === authorId) {
			console.log("You cannot save your own post.");
			return;
		}

		try {
			const response = await axios.put(
				`${config.apiBaseUrl}/posts/action/add-to-saved/${postId}`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(
				`Save/remove post response for postId ${postId}:`,
				response.data
			);
			if (response.data === true) {
				setSavedPostIds(new Set([...savedPostIds, postId]));
			} else {
				setSavedPostIds(
					new Set([...savedPostIds].filter((id) => id !== postId))
				);
			}
		} catch (error) {
			console.error("Error saving/removing post:", error);
		}
	};

	return (
		<>
			{isAuthenticated ? (
				<ProfileNavigationBar
					userEmail={userEmail}
					onLogout={onLogout}
				/>
			) : (
				<NavigationBar isAuthenticated={isAuthenticated} />
			)}

			<div className="grid-container">
				{posts.map((post) => (
					<div
						key={post.id} // Используем post.id для уникального ключа
						className="grid-item"
						onClick={() => handlePostClick(post)}
					>
						<div className="image-container">
							<img
								src={`${config.apiBaseUrl}/image/${post.images[0]?.fullFilename}`}
								alt={post.title}
							/>
							<div className="overlay">
								<div className="text">{post.title}</div>
							</div>
							<button
								className="save-button"
								onClick={(e) => {
									e.stopPropagation();
									handleSaveClick(post.id, post.userId);
								}}
							>
								{savedPostIds.has(post.id)
									? "Сохранено"
									: "Сохранить"}
							</button>
						</div>
					</div>
				))}
				{loading && <p>Загрузка...</p>}
			</div>
		</>
	);
}

export default GalleryList;
