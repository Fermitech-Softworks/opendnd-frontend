// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class ApiError extends Error {
	constructor(errorCode, errorType, errorArgs, ...params) {
		// noinspection JSCheckFunctionSignatures
		super(...params);
		if(Error.captureStackTrace) Error.captureStackTrace(this, ApiError);

		this.name = "ApiError";
		this.errorCode = errorCode;
		this.errorType = errorType;
		this.errorArgs = errorArgs;
		this.message = `${errorCode} | ${errorType} | ${errorArgs.join("|")}`;
	}
}


async function apiRequest(baseUrl, method, path, args) {
	if(args === undefined || args === null) {
		args = {};
	}

	let body;
	let url;
	if(method === "GET") {
		body = undefined;
		//Create a query string
		let params = new URLSearchParams();
		//Use the items in the args object as key-value pairs for the query string
		Object.keys(args).forEach(key => {
			let arg = args[key];
			params.append(key, arg);
		});
		url = `${baseUrl}${path}?${params.toString()}`;
	}
	else {
		body = JSON.stringify(args);
		url = `${baseUrl}${path}`;
	}

	//Make the request
	let response = await fetch(url, {
		method: method,
		body: body
	});
	//Parse the response as JSON
	let json = await response.json();
	//Check if the request was a success
	if(json["success"] === false) {
		throw new ApiError(json["error_code"], json["error_type"], json["error_args"])
	}
	return json["data"]
}

export default apiRequest;

export {apiRequest, ApiError};
