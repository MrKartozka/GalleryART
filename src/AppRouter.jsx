import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import Profile from "./Components/Profile/Profile";
import GalleryList from "./Components/GalleryList/GalleryList";
import AddPicture from "./Components/AddPicture/AddPicture";
import Settings from "./Components/Settings/Settings";
import AccountManagement from "./Components/Settings/AccountManagement/AccountManagement";
import ProfileVisibility from "./Components/Settings/ProfileVisibility/ProfileVisibility";

function AppRouter({
	isAuthenticated,
	setIsAuthenticated,
	setUserEmail,
	userEmail,
	handleLogout,
}) {
	const location = useLocation();

	useEffect(() => {
		localStorage.setItem("lastPath", location.pathname);
	}, [location]);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Navigate
						to={localStorage.getItem("lastPath") || "/gallery"}
					/>
				}
			/>
			<Route
				path="/register"
				element={
					isAuthenticated ? (
						<Navigate to="/gallery" />
					) : (
						<RegistrationForm />
					)
				}
			/>
			<Route
				path="/login"
				element={
					isAuthenticated ? (
						<Navigate
							to={localStorage.getItem("lastPath") || "/gallery"}
						/>
					) : (
						<LoginForm
							setIsAuthenticated={setIsAuthenticated}
							setUserEmail={setUserEmail}
						/>
					)
				}
			/>
			<Route
				path="/profile"
				element={
					isAuthenticated ? (
						<Profile
							userEmail={userEmail}
							onLogout={handleLogout}
						/>
					) : (
						<Navigate to="/login" />
					)
				}
			/>
			<Route
				path="/gallery"
				element={
					<GalleryList
						userEmail={userEmail}
						onLogout={handleLogout}
						isAuthenticated={isAuthenticated}
					/>
				}
			/>
			<Route
				path="/add-picture"
				element={
					isAuthenticated ? <AddPicture /> : <Navigate to="/login" />
				}
			/>
			<Route
				path="/settings"
				element={
					isAuthenticated ? <Settings /> : <Navigate to="/login" />
				}
			/>
			<Route
				path="/account-management"
				element={
					isAuthenticated ? (
						<AccountManagement />
					) : (
						<Navigate to="/login" />
					)
				}
			/>
			<Route
				path="/profile-visibility"
				element={
					isAuthenticated ? (
						<ProfileVisibility />
					) : (
						<Navigate to="/login" />
					)
				}
			/>
		</Routes>
	);
}

export default AppRouter;
