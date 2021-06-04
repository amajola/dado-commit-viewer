import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search_bar.scss";
import { Link } from "react-router-dom";

function SearchBar(params) {
	const [searchValue, setSearchValue] = useState("");
	const inputEl = useRef();

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	const focus = () => {
		if (inputEl !== null) {
			inputEl.current.focus();
		}
	};

	return (
		<div
			className={`search-container ${
				params.className !== undefined ? params.className : ""
			}`}>
			<form className="search-container-grow">
				<div className="search-field-container">
					<FontAwesomeIcon
						icon={faSearch}
						color="blue"
						className="search-icon"
						onClick={focus}
					/>
					<input
						type="text"
						id="search-input"
						className="search-field"
						value={searchValue}
						onChange={handleChange}
						ref={inputEl}
						placeholder="Eg. facebook/react"></input>
				</div>
				<Link
					className="on-click"
					to={{
						pathname: "/commits",
						hash:
							searchValue !== ""
								? searchValue
								: "No Repository Provided",
					}}>
					<button type="submit">See commits 🚀</button>
				</Link>
			</form>
		</div>
	);
}

export default SearchBar;
