import React, { useEffect, useState } from "react";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import NavigationBar from "./../NavigationBar/NavigationBar";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import "./GalleryList.css";

function GalleryList({ userEmail, onLogout, isAuthenticated }) {
	const [posts, setPosts] = useState([]);
	const [number, setNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async (number) => {
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
				setPosts((prevPosts) => [
					...prevPosts,
					...response.data.content,
				]);
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

	const handleSaveClick = (postId) => {
		console.log(`Post ${postId} saved`);
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
				{posts.map((post, index) => (
					<div
						key={index}
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
									handleSaveClick(post.id);
								}}
							>
								Сохранить
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
