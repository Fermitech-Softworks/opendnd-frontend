import { useContext, useState } from 'preact/hooks';
import InstanceUrl from '../contexts/InstanceUrl';
import useFormValidator from './useFormValidator';
import instanceUrlRegex from '../utils/valid/instanceUrlRegex';
import apiRequest from '../utils/apiRequest';

export default function() {
	const defaultInstanceUrl = useContext(InstanceUrl);
	const [instanceTesterAbort, setInstanceTesterAbort] = useState(null);
	const [instanceUrl, setInstanceUrl] = useState(defaultInstanceUrl);
	const instanceUrlStatus = useFormValidator(instanceUrl, (value, setStatus) => {
		if(value.length === 0) {
			setStatus({
				validity: null,
				message: ""
			});
			return;
		}

		if(!Boolean(instanceUrlRegex.test(value))) {
			setStatus({
				validity: false,
				message: "L'URL che hai inserito non è valido."
			});
			return;
		}

		if(instanceTesterAbort !== null) {
			instanceTesterAbort.abort();
		}
		let abort = new AbortController();
		setInstanceTesterAbort(abort);

		apiRequest(value, "GET", "/api/royalnet/version/v1", undefined, abort.signal).then((data) => {
			if(value === instanceUrl) {
				setStatus({
					validity: true,
					message: `Royalnet ${data["semantic"]}`
				});
			}
			else {
				console.log("wtf?")
			}
		}).catch((err) => {
			if(value === instanceUrl) {
				setStatus({
					validity: false,
					message: "Non sembra esserci nessuna istanza a quell'URL... Sei sicuro che quella sia un'istanza di Royalnet?"
				});
			}
		});
		setStatus({
			validity: null,
			message: ""
		});
	});

	return [instanceUrl, setInstanceUrl, instanceUrlStatus];
}
