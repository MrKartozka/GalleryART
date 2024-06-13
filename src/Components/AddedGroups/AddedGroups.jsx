import React from "react";
import "./AddedGroups.css";
import config from "../../config";

const AddedGroups = ({ posts = [], onPostClick }) => {
	const getImageUrl = (fullFilename) => {
		const filenameParts = fullFilename.split("/");
		const bucketName = filenameParts[0];
		const keyName = filenameParts.slice(1).join("/");
		return `${config.apiBaseUrl}/image/${bucketName}/${keyName}`;
	};

	return (
		<div className="grid-container-groups">
			{posts.map((post, index) => (
				<div
					key={index}
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
					</div>
				</div>
			))}
		</div>
	);
};

export default AddedGroups;
