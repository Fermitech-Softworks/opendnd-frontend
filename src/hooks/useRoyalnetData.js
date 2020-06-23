import InstanceUrl from '../contexts/InstanceUrl';
import { useContext, useEffect, useState } from 'preact/hooks';
import apiRequest from '../utils/apiRequest';
import LoginStatus from '../contexts/LoginStatus';

export default function(method, path, body) {
	const instanceUrl = useContext(InstanceUrl);
	const loginStatus = useContext(LoginStatus);
	const [data, setData] = useState(null);

	if(loginStatus["token"] === null) return null;
	body["token"] = loginStatus["token"];

	useEffect(() => {
		apiRequest(instanceUrl, method, path, body).then(d => setData(d));
	}, [instanceUrl, method, path, body]);

	return data;
}
