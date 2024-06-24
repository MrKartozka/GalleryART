import React, { useState, useEffect, useRef } from "react";
import "./AddedGroups.css";
import config from "../../config";
import axios from "axios";

const AddedGroups = ({ posts = [], onPostClick }) => {
	const [currentPosts, setCurrentPosts] = useState(posts);
	const [dropdownPostId, setDropdownPostId] = useState(null);
	const [collections, setCollections] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedPostId, setSelectedPostId] = useState(null);
	const dropdownRefs = useRef(new Map());

	useEffect(() => {
		setCurrentPosts(posts);
		fetchCollections();
	}, [posts]);

	const fetchCollections = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		try {
			const response = await axios.post(
				`${config.apiBaseUrl}/post-collection/action/search-all`,
				{
					pageInfo: {
						number: 0,
						size: 10,
					},
					filterPostRequest: {
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
			setCollections(response.data.content);
		} catch (error) {
			console.error("Error fetching collections:", error);
		}
	};

	const getImageUrl = (fullFilename) => {
		const filenameParts = fullFilename.split("/");
		const bucketName = filenameParts[0];
		const keyName = filenameParts.slice(1).join("/");
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`;
	};

	const handleButtonClick = (e, postId) => {
		e.stopPropagation();
		setDropdownPostId((prevId) => (prevId === postId ? null : postId));
	};

	const handleDelete = async (e, postId) => {
		e.stopPropagation();
		const accessToken = localStorage.getItem("accessToken");

		console.log(`Attempting to delete postId: ${postId}`);
		console.log(`Authorization: Bearer ${accessToken}`);

		try {
			const response = await axios.delete(`${config.apiBaseUrl}/posts`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				params: {
					postsIds: postId,
				},
			});

			console.log(`Delete response: `, response);

			if (response.status === 200) {
				setCurrentPosts(
					currentPosts.filter((post) => post.id !== postId)
				);
				console.log(`Post deleted successfully: ${postId}`);
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		} finally {
			setDropdownPostId(null);
		}
	};

	const handleAddToCollection = (e, postId) => {
		e.stopPropagation();
		setSelectedPostId(postId);
		setShowModal(true);
		setDropdownPostId(null);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedPostId(null);
	};

	const handleCollectionSelect = async (collectionId) => {
		console.log(
			`Add postId ${selectedPostId} to collectionId ${collectionId}`
		);
		const accessToken = localStorage.getItem("accessToken");

		try {
			const response = await axios.post(
				`${config.apiBaseUrl}/post-collection/action/save-to-collection/${collectionId}/post/${selectedPostId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(
				`Post added to collection successfully: ${response.data}`
			);
		} catch (error) {
			console.error("Error adding post to collection:", error);
		} finally {
			closeModal();
		}
	};

	return (
		<>
			<div className="grid-container-groups">
				{currentPosts.map((post) => (
					<div
						key={post.id}
						className="grid-item-groups"
						onClick={() => onPostClick(post)}
					>
						<div className="image-container-groups">
							<img
								src={getImageUrl(post.images[0]?.fullFilename)}
								alt={post.title}
							/>
							<div className="overlay-groups">
								<div className="text-groups">{post.title}</div>
							</div>
							<button
								className="grid-item-button"
								onClick={(e) => handleButtonClick(e, post.id)}
							>
								···
							</button>
							{dropdownPostId === post.id && (
								<div
									className="dropdown-menu"
									ref={(ref) =>
										dropdownRefs.current.set(post.id, ref)
									}
								>
									<button
										className="dropdown-item"
										onClick={(e) =>
											handleAddToCollection(e, post.id)
										}
									>
										Добавить в коллекцию
									</button>
									<button
										className="dropdown-item"
										onClick={(e) =>
											handleDelete(e, post.id)
										}
									>
										Удалить
									</button>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
			{showModal && (
				<div className="modal-overlay">
					<div className="modal-content">
						<span className="close-button" onClick={closeModal}>
							&times;
						</span>
						<h2>Добавить в коллекцию</h2>
						<ul>
							{collections.map((collection) => (
								<li
									key={collection.id}
									onClick={() =>
										handleCollectionSelect(collection.id)
									}
								>
									{collection.title}
								</li>
							))}
						</ul>
						<button onClick={closeModal}>Готово</button>
					</div>
				</div>
			)}
		</>
	);
};

export default AddedGroups;
