import { useState } from 'preact/hooks';
import useFormValidator from './useFormValidator';
import usernameRegex from '../utils/valid/usernameRegex';

export default function() {
	const [username, setUsername] = useState("");
	const usernameStatus = useFormValidator(username, (value, setStatus) => {
		if(value.length === 0) {
			setStatus({
				validity: null,
				message: ""
			});
			return;
		}

		if(!Boolean(usernameRegex.test(value))) {
			setStatus({
				validity: false,
				message: "L'username che hai inserito non è valido."
			});
			return;
		}

		setStatus({
			validity: true,
			message: "Sembra OK!"
		});
	});

	return [username, setUsername, usernameStatus]
}
