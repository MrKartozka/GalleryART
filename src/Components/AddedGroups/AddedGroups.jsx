import React, { useState } from "react";
import "./AddedGroups.css";

const AddedGroups = ({ posts = [] }) => {
	return (
		<div className="added-groups">
			{posts.map((post, index) => (
				<div key={index} className="post">
					<h3>{post.title}</h3>
					<p>{post.description}</p>
					{post.images.map((image, imgIndex) => (
						<img
							key={imgIndex}
							src={image.fullFilename}
							alt={post.title}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default AddedGroups;
