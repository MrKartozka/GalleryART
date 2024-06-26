import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPicture.css";
import Dropzone from "react-dropzone";
import config from "../../config";
import axios from "axios";
import NavigationBarWithoutFind from "../NavigationBarWithoutFind/NavigationBarWithoutFind";

// Компонент AddPicture позволяет пользователю загружать изображения
const AddPicture = ({ userEmail, onLogout }) => {
	const [file, setFile] = useState(null);
	const [imageId, setImageId] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [groupName, setGroupName] = useState("");
	const [tags, setTags] = useState("");
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	// Функция для обработки загрузки файла
	const handleUpload = async (acceptedFiles) => {
		console.log("logging drop/selected file", acceptedFiles);
		setFile(URL.createObjectURL(acceptedFiles[0])); // Устанавливаем превью загруженного файла

		const formData = new FormData();
		formData.append("file", acceptedFiles[0]); // Добавляем файл в FormData для отправки на сервер

		try {
			const response = await axios.post(config.uploadImageUrl, formData); // Загружаем файл на сервер
			console.log("Successfully uploaded:", response.data);
			setImageId(response.data.id); // Сохраняем ID загруженного изображения
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	// Функция для обработки добавления изображения
	const handleAddPicture = async () => {
		if (!imageId) {
			console.error("Image ID is missing. Cannot create post.");
			return;
		}

		const accessToken = localStorage.getItem("accessToken");

		const pictureData = {
			title,
			description,
			tags: tags
				? tags.split(",").map((tag) => ({ name: tag.trim() }))
				: [], // Форматируем теги
			images: [{ id: imageId }], // Устанавливаем ID изображения
			owner: { name: username }, // Устанавливаем имя владельца
		};

		console.log("Creating post with data:", pictureData);

		try {
			const response = await axios.post(
				`${config.apiBaseUrl}/posts`,
				pictureData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log("Successfully created post:", response.data);
			navigate("/profile", { state: { group: "added" } }); // Перенаправляем пользователя на профиль
		} catch (error) {
			console.error("Error creating post:", error);
		}
	};

	// Хук для получения имени пользователя из localStorage при монтировании компонента
	useEffect(() => {
		const username = localStorage.getItem("username");
		setUsername(username);
	}, []);

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
									Автор: {username}
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
