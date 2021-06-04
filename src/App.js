import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/home/home";
import CommitsPage from "./pages/commits/commits";
import { fetchRepositories } from "./logic/github-search";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.scss";

function App() {
	const [repositories, setRepositories] = useState(null);

	useEffect(() => {
		fetchRepositories().then((data) => {
			setRepositories(data.items);
		});
	}, []);

	return (
		<Router exact path="/" className="">
			<Redirect to="/home" />
			<div className="App">
				<Switch>
					<Route path="/home">
						{repositories !== null ? (
							<HomePage data={repositories} />
						) : ("")}
					</Route>
					<Route path="/commits">
						<CommitsPage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
