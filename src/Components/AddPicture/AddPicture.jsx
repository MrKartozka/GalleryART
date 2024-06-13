import React, { useState } from "react";
import "./AddPicture.css";
import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import Dropzone from "react-dropzone";
import config from "../../config";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";

const AddPicture = ({ userEmail, onLogout }) => {
	const [file, setFile] = useState(null);
	const [imageId, setImageId] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [groupName, setGroupName] = useState("");
	const [tags, setTags] = useState("");
	const [posts, setPosts] = useState([]);

	const handleUpload = (acceptedFiles) => {
		console.log("logging drop/selected file", acceptedFiles);
		setFile(URL.createObjectURL(acceptedFiles[0]));

		const formData = new FormData();
		formData.append("file", acceptedFiles[0]);

		fetch(config.uploadImageUrl, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Successfully uploaded:", data);
				setImageId(data.id);
			})
			.catch((error) => {
				console.error("Error uploading file:", error);
			});
	};

	const handleAddPicture = () => {
		if (!imageId) {
			console.error("Image ID is missing. Cannot create post.");
			return;
		}

		const pictureData = {
			title,
			description,
			tags: tags
				? tags.split(",").map((tag) => ({ name: tag.trim() }))
				: [],
			images: [
				{
					id: imageId,
					previewFilename: file,
					fullFilename: file,
				},
			],
		};

		const accessToken = localStorage.getItem("accessToken"); // Получение токена из localStorage

		fetch(`${config.apiBaseUrl}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`, // Добавление токена в заголовок запроса
			},
			body: JSON.stringify(pictureData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Successfully created post:", data);
				setPosts([...posts, data]); // Обновление списка постов в интерфейсе
			})
			.catch((error) => {
				console.error("Error creating post:", error);
			});
	};

	return (
		<>
			<NavigationBarWithoutFind
				userEmail={userEmail}
				onLogout={onLogout}
			/>
			<div className="wrapper">
				<div className="container">
					<div className="addpicture-block">
						{!file ? (
							<Dropzone onDrop={handleUpload}>
								{({
									getRootProps,
									getInputProps,
									isDragActive,
								}) => (
									<div
										className="addpicture__drag-field"
										{...getRootProps()}
									>
										<div className="drag-field__main">
											<input {...getInputProps()} />
											<img
												className="drag-field__main-img"
												src="../../../addpicture.svg"
												alt=""
												style={{
													width: "50px",
													height: "50px",
												}}
											/>
											{isDragActive ? (
												<p>Поместите сюда</p>
											) : (
												<p>
													Выберите файл или перетащите
													из системы сюда
												</p>
											)}
										</div>
										<div className="drag-field__footer">
											<p className="choose-format">
												Выбирайте только формат{" "}
												<strong>
													.png / .jpg / .jpeg
												</strong>{" "}
												и размером меньше{" "}
												<strong>10MB</strong>
											</p>
										</div>
									</div>
								)}
							</Dropzone>
						) : (
							<div className="addpicture__drag-field">
								<img
									className="uploaded-image"
									src={file}
									alt="Uploaded"
								/>
							</div>
						)}

						<div className="addpicture__table">
							<div className="table-name">
								<h3>
									<em>Название:</em>
								</h3>
								<input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Добавьте название..."
								/>
							</div>
							<div className="table-description">
								<h3>
									<em>Описание:</em>
								</h3>
								<textarea
									type="text"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									placeholder="Добавьте описание..."
								/>
							</div>
							<div className="table-groupname">
								<h3>
									<em>Группа:</em>
								</h3>
								<input
									type="text"
									value={groupName}
									onChange={(e) =>
										setGroupName(e.target.value)
									}
									placeholder="Выберите группу..."
								/>
							</div>
							<div className="table-tags">
								<h3>
									<em>Теги:</em>
								</h3>
								<input
									type="text"
									value={tags}
									onChange={(e) => setTags(e.target.value)}
									placeholder="Укажите теги..."
								/>
							</div>
							<div className="table-footer">
								<div className="table-footer__author">
									Автор: Maestro52
								</div>
								<button
									className="table-footer_add-btn"
									onClick={handleAddPicture}
								>
									Добавить
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddPicture;
