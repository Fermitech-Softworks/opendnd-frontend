const apiUrl = "http://172.30.0.3:8000";

export class ApiError extends Error {}

export async function apiRequest(method, path, body) {
	let response;
	try {
		response = await fetch(`${apiUrl}${path}`, {
			method: method,
			body: body
		});
	} catch(error) {
		throw new ApiError(`API request threw error ${error}`)
	}
	if (response.status !== 200) {
		throw new ApiError(`API request returned HTTP ${response.status}`)
	}

	let json = await response.json();
	if(json.result !== "success") {
		throw new ApiError(`API request returned result ${json.result}`)
	}
	return json;
}
