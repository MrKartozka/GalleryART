import React from "react";
import "./PostDetail.css";
import config from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const PostDetail = () => {
	const location = useLocation();
	const post = location.state?.post;
	const navigate = useNavigate();

	const getImageUrl = (fullFilename) => {
		const filenameParts = fullFilename.split("/");
		const bucketName = filenameParts[0];
		const keyName = filenameParts.slice(1).join("/");
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`;
	};

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<div className="post-detail-wrapper">
			<div className="post-detail-container">
				<div className="post-detail-block">
					<button
						onClick={() => navigate(-1)}
						className="post-detail-back-btn"
					>
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
								Автор: {post.owner.name}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
