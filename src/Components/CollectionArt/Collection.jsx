import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import "./Collection.css";

function Collection() {
	const { collectionId } = useParams();
	const [collection, setCollection] = useState(null);
	const [posts, setPosts] = useState([]);
	const [dropdownAdd, setDropdownAdd] = useState(false);
	const [profilePicture, setProfilePicture] = useState(null);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCollection = async () => {
			const accessToken = localStorage.getItem("accessToken");
			try {
				const response = await axios.get(
					`${config.apiBaseUrl}/post-collection/${collectionId}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setCollection(response.data);
				fetchUserProfile(response.data.owner.id);
				fetchCollectionPosts(response.data.id);
			} catch (error) {
				console.error("Error fetching collection:", error);
			}
		};

		const fetchCollectionPosts = async (collectionId) => {
			const accessToken = localStorage.getItem("accessToken");
			const requestData = {
				pageInfo: {
					number: 0,
					size: 10,
				},
				filterPostByCollectionRequest: {
					collectionId: collectionId,
				},
			};
			try {
				const response = await axios.post(
					`${config.apiBaseUrl}/posts/action/search-by-collection`,
					requestData,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							"Content-Type": "application/json",
						},
					}
				);
				setPosts(response.data.content);
			} catch (error) {
				console.error("Error fetching posts in collection:", error);
			}
		};

		fetchCollection();
	}, [collectionId]);

	const fetchUserProfile = async (userId) => {
		const accessToken = localStorage.getItem("accessToken");
		try {
			const response = await axios.get(
				`${config.apiBaseUrl}/user/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const userProfile = response.data;
			setProfilePicture(
				userProfile.image
					? `${config.apiBaseUrl}/image/${userProfile.image.fullFilename}`
					: null
			);
		} catch (error) {
			console.error("Error fetching user profile:", error);
		}
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				setDropdownAdd(false);
			}
		}

		if (dropdownAdd) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownAdd]);

	const toggleAddDropdown = () => {
		setDropdownAdd((prevState) => !prevState);
	};

	if (!collection) {
		return <div>Loading...</div>;
	}

	const previewImage =
		posts.length > 0
			? `${config.apiBaseUrl}/image/${posts[0].images[0]?.fullFilename}`
			: "../../../route.jpg";

	const userProfileImage =
		profilePicture || "../../../profile-collection.svg";

	return (
		<>
			<ProfileNavigationBar />
			<button
				className="collection-back-button"
				onClick={() =>
					navigate("/profile", { state: { group: "saved" } })
				}
			>
				←
			</button>
			<div className="collection-container">
				<div className="collection-setting">
					<h2 className="collection-name">{collection.title}</h2>
					<button
						ref={buttonRef}
						className={`collection-setting-btn ${
							dropdownAdd ? "active" : ""
						}`}
						onClick={toggleAddDropdown}
					>
						···
					</button>
					{dropdownAdd && (
						<div
							className="collection-dropdown-add"
							ref={dropdownRef}
						>
							<ul className="collection-filter-list">
								<li>
									<h4 className="header-collection-filter-btn">
										Действия в коллекции
									</h4>
									<button className="collection-filter-btn">
										Изменить альбом
									</button>
								</li>
								<li>
									<button className="collection-filter-btn">
										Поделиться
									</button>
								</li>
								<li>
									<button className="collection-filter-btn">
										Архивировать
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
				<div className="collection-icon_profile">
					<img
						src={userProfileImage}
						alt="User"
						width="50px"
						height="50px"
					/>
				</div>
			</div>

			<div className="grid-container">
				{posts.length > 0 ? (
					posts.map((post) => (
						<div key={post.id} className="grid-item">
							<img
								src={`${config.apiBaseUrl}/image/${post.images[0]?.fullFilename}`}
								alt={post.title}
							/>
						</div>
					))
				) : (
					<div className="grid-item">
						<img src={previewImage} alt="Default" />
					</div>
				)}
			</div>
		</>
	);
}

export default Collection;
