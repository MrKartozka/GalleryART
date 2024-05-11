import React from "react";
import "./AddPicture.css";

const AddPicture = () => {
	return (
		<div className="wrapper">
			<div className="container">
				<div className="addpicture-block">
					<div className="addpicture__drag-field">
						<div className="drag-field__main">
							<img src="../../../addpicture.svg" alt="" />
							<p>Выберите файл или перетащите из системы сюда</p>
						</div>
						<div className="drag-field__footer">
							<p className="choose-format">
								Выбирайте только формат{" "}
								<strong>.png / .jpg / .jpeg</strong> и размером
								меньше <strong>10MB</strong>
							</p>
						</div>
					</div>
					<div className="addpicture__table">
						<div className="table-name">
							<h3>
								<em>Название:</em>
							</h3>
							<input
								type="text"
								name=""
								id=""
								placeholder="Добавьте название..."
							/>
						</div>
						<div className="table-description">
							<h3>
								<em>Описание:</em>
							</h3>
							<textarea
								type="text"
								name=""
								id=""
								placeholder="Добавьте описание..."
							/>
						</div>
						<div className="table-groupname">
							<h3>
								<em>Группа:</em>
							</h3>
							<input
								type="text"
								name=""
								id=""
								placeholder="Выберите группу..."
							/>
						</div>
						<div className="table-tags">
							<h3>
								<em>Теги:</em>
							</h3>
							<input
								type="text"
								name=""
								id=""
								placeholder="Укажите теги..."
							/>
						</div>
						<div className="table-footer">
							<div className="table-footer__author">
								Автор: Maestro52
							</div>
							<button className="table-footer_add-btn">
								Добавить
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPicture;
