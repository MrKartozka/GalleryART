import React from "react";
import "./PostDetail.css";
import config from "../../config";

const PostDetail = ({ post, onClose }) => {
	const getImageUrl = (fullFilename) => {
		const filenameParts = fullFilename.split("/");
		const bucketName = filenameParts[0];
		const keyName = filenameParts.slice(1).join("/");
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`;
	};

	return (
		<div className="post-detail-wrapper">
			<div className="post-detail-container">
				<div className="post-detail-block">
					<button onClick={onClose} className="post-detail-back-btn">
						Назад
					</button>
					<div className="post-detail-image">
						{post.images.map((image, index) => (
							<img
								key={index}
								src={getImageUrl(image.fullFilename)}
								alt={post.title}
							/>
						))}
					</div>
					<div className="post-detail-table">
						<div className="table-name">
							<h3>
								<em>Название:</em>
							</h3>
							<p>{post.title}</p>
						</div>
						<div className="table-description">
							<h3>
								<em>Описание:</em>
							</h3>
							<p>{post.description}</p>
						</div>
						<div className="table-footer">
							<div className="table-footer__author">
								Автор: Maestro52
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
