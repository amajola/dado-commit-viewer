import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SearchBar from "../../components/search_bar/search_bar";
import "./home.scss";

function Home(props) {
	return (
		<div>
			<header className="container-header">
				<div className="container-item title">
					<h2>CommitViewer</h2>
				</div>

				<div className="container-item links">
					<h5>About</h5>
					<h5>Contact</h5>
				</div>
			</header>
			<main className="container-main">
				<div className="container-item container-title">
					<h1 className="title">Discover the world of code</h1>
				</div>
				<div className="container-item welcome-text">
					<h6 className="text">
						Explore open source projects from GitHub, and read their
						commit history to see the story of how they were built.
					</h6>
				</div>
				<SearchBar className="search-padding" />
				<div className="repository-container">
					<div className="repository-text-container">
						<p className="repository-container-text">
							Or pick one of these suggested repos
						</p>
					</div>
					<div className="repository-items-container">
						{props.data != null
							? props.data.slice(0, 4).map((element) => {
									return (
										<div className="repository-items" key={element.full_name}>
											<Link
												className="repository-items-text"
												to={{
													pathname: "/commits",
													hash: element.full_name,
												}}>
												{element.full_name}
											</Link>
										</div>
									);
							  })
							: ""}
					</div>
				</div>
			</main>
		</div>
	);
}

Home.propTypes = {
	data: PropTypes.array
}

export default Home;
