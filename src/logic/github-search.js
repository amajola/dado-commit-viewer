const headers = new Headers(
	{ Accept: "application/vnd.github.v3+json" },
	{ authorization: "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" }
);

function createQuery(queries) {
	if (typeof queries !== "object") throw new Error("Only Array Are Use");
	return queries
		.reduce((parameters, element) => {
			return parameters.concat(
				`${element.query.selector}:${
					element.condition !== undefined ? element.condition : ""
				}${element.query.value}&`
			);
		}, "?q=")
		.slice(0, -1);
}

function createDynamicDate(action = undefined, daysDiff = 0) {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month =
		currentDate.getMonth() < 10
			? "0" + currentDate.getMonth()
			: currentDate.getMonth();
	const date =
		currentDate.getDate() < 10
			? "0" + currentDate.getDate()
			: currentDate.getDate();
	switch (action) {
		case undefined:
			return `${year}-${month}-${date}`;
		case "ADD":
			return `${year}-${month}-${date + daysDiff}`;
		case "SUB":
			return `${year}-${month}-${date - daysDiff}`;
		default:
			throw new Error("Action Unknown");
	}
}

function fetchRepositories() {
	const url = new URL("https://api.github.com/search/repositories");
	url.search = createQuery([
		{
			query: { selector: "created", value: createDynamicDate("ADD", 7) },
			condition: ">",
		},
		{ query: { selector: "sort", value: "stars" } },
	]);
	const request = new Request(url, { method: "GET", headers: headers });

	return fetch(request)
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((err) => {
			throw new Error(
				"Failed to Fetch Repositories (Connection Failure)"
			);
		});
}

function searchRepository(repositoryName) {
	const url = new URL("https://api.github.com/search/repositories");
	url.search = createQuery([
		{ query: { selector: "repo", value: repositoryName } },
	]);
	const request = new Request(url, { method: "GET", headers: headers });
	return fetch(request)
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((err) => {
			throw new Error(
				"Failed to Fetch Repositories (Connection Failure)"
			);
		});
}

function fetchCommits(repositoryName) {
	const [ownerName, projectName] = repositoryName.split("/");
	const url = new URL(
		`https://api.github.com/repos/${ownerName}/${projectName}/commits`
	);

	const request = new Request(url, { method: "GET", headers: headers });
	return fetch(request)
		.then((response) => response.json())
		.then((data) => {
			if (data.message === "Not Found") return undefined;
			return data;
		})
		.catch((err) => {
			throw new Error(
				"Failed to Fetch Repositories (Connection Failure)"
			);
		});
}

export { fetchRepositories, searchRepository, fetchCommits };
