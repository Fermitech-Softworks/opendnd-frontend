import InstanceUrl from '../contexts/InstanceUrl';
import { useContext, useEffect, useState } from 'preact/hooks';
import apiRequest from '../utils/apiRequest';

export default function(method, path, body) {
	const instanceUrl = useContext(InstanceUrl);
	const [data, setData] = useState(null);

	useEffect(() => {
		apiRequest(instanceUrl, method, path, body).then(d => setData(d));
	});

	if(data === null) return "Loading...";
	else return data.toString();
}
