import React, { useEffect, useState } from "react";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import NavigationBar from "./../NavigationBar/NavigationBar";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import "./SavedPost.css";

function SavedPost({ userEmail, onLogout, isAuthenticated }) {
	const [savedPosts, setSavedPosts] = useState([]);
	const [number, setNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchSavedPosts = async (number) => {
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
				setSavedPosts(response.data.content);
			} catch (error) {
				console.error("Error loading saved posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchSavedPosts(number);
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

	const handleRemoveClick = async (postId) => {
		const accessToken = localStorage.getItem("accessToken");
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
				`Remove post response for postId ${postId}:`,
				response.data
			);
			if (response.data === true) {
				setSavedPosts(savedPosts.filter((post) => post.id !== postId));
			}
		} catch (error) {
			console.error("Error removing post:", error);
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

			<div className="saved-grid-container">
				{savedPosts.map((post, index) => (
					<div
						key={index}
						className="saved-grid-item"
						onClick={() => handlePostClick(post)}
					>
						<div className="saved-image-container">
							<img
								src={`${config.apiBaseUrl}/image/${post.images[0]?.fullFilename}`}
								alt={post.title}
							/>
							<div className="saved-overlay">
								<div className="saved-text">{post.title}</div>
							</div>
							<button
								className="remove-button"
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveClick(post.id);
								}}
							>
								Удалить
							</button>
						</div>
					</div>
				))}
				{loading && <p>Загрузка...</p>}
			</div>
		</>
	);
}

export default SavedPost;
