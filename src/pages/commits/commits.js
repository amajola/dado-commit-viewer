import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchCommits } from "../../logic/github-search";
import SearchBar from "../../components/search_bar/search_bar";
import "./commits.scss";

function Commits(props) {
	const location = useLocation();
	const [commits, setCommits] = useState(null);

	useEffect(() => {
		fetchCommits(location.hash.replace(/#/g, "")).then((data) => {
			if (data != null) {
				setCommits(data);
			}
		});
	}, [location.hash]);

	return (
		<div className="container">
			<header>
				<div className="container-item title">
					<Link to="/home" className="logo">
						<h2>CommitViewer</h2>
					</Link>
				</div>
				<SearchBar className="search-padding" />
			</header>
			<div className="container-header">
				<h1>{location.hash.replace(/#/g, "")}</h1>
			</div>
			<div className="mapped-container">
				{commits !== null ? (
					commits.slice(0, 10).map((element) => {
						return (
							<div className="container-commit" key={element.sha}>
								<div className="avatar-container">
									<div className="dot">
										<img
											alt="committer-avatar"
											src={
												element.author.avatar_url
											}></img>
									</div>
									<p className="owner-name">
										{element.commit.author.name}
									</p>
								</div>
								<div className="commit-message-text">
									{element.commit.message.slice(0, 50)}
								</div>
								<div className="commit-message-text">
									<p>
										{new Date(
											element.commit.author.date
										).toDateString()}
									</p>
								</div>
							</div>
						);
					})
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}

export default Commits;
