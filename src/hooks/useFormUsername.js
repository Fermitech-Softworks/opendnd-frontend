import { useState } from 'preact/hooks';
import useFormValidator from './useFormValidator';
import usernameRegex from '../utils/valid/usernameRegex';

export default function() {
	const [username, setUsername] = useState("");

	let lowerUsername = username.toLowerCase();
	let filteredUsername = lowerUsername.replace(/[^a-z]/g, "");

	const usernameStatus = useFormValidator(filteredUsername, (value, setStatus) => {
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

	return [filteredUsername, setUsername, usernameStatus]
}
