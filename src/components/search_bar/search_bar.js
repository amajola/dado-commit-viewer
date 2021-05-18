import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search_bar.scss";
import { Link } from "react-router-dom";

function SearchBar(params) {
	const [searchValue, setSearchValue] = useState("");

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<div
			className={`search-container ${
				params.className !== undefined ? params.className : ""
			}`}>
			<div className="search-container-grow">
				<FontAwesomeIcon
					icon={faSearch}
					color="blue"
					className="search-icon"
				/>
				<input
					type="text"
					id="search-input"
					className="search-field"
					value={searchValue}
					onChange={handleChange}
					placeholder="Eg. facebook/react"></input>
			</div>
			<Link
				className="on-click"
				to={{
					pathname: "/commits",
					hash: searchValue !== "" ? searchValue : "No Repository Provided",
				}}>
				See commits 🚀
			</Link>
		</div>
	);
}

export default SearchBar;
