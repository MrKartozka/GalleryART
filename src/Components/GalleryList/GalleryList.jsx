import ProfileNavigationBar from "../ProfileNavigationBar/ProfileNavigationBar";
import "./GalleryList.css";
import config from "../../config";
import NavigationBar from "./../NavigationBar/NavigationBar";

function GalleryList({ userEmail, onLogout, isAuthenticated }) {
	const url = `${config.apiBaseUrl}/image/default/20240502214901.jpg`;
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
				<div className="grid-item">
					<img src={url} alt="" />
				</div>
				<div className="grid-item">
					<img src="burger.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="background.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="gallery-3.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="burger.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="burger.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="route.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="gallery-3.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="gallery-3.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="route.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="gallery-3.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="burger.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="background.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="background.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="gallery-3.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="gallery-3.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="burger.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="burger.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="route.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="route.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="gallery-3.jpg" alt="" />
				</div>
				<div className="grid-item">
					<img src="route.jpg" alt="" />
				</div>
			</div>
		</>
	);
}

export default GalleryList;
