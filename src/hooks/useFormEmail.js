import { useState } from 'preact/hooks';
import useFormValidator from './useFormValidator';
import emailRegex from '../utils/valid/emailRegex';

export default function() {
	const [email, setEmail] = useState("");
	const emailStatus = useFormValidator(email, (value, setStatus) => {
		if(value.length === 0) {
			setStatus({
				validity: null,
				message: ""
			});
			return;
		}

		if(!Boolean(emailRegex.test(value))) {
			setStatus({
				validity: false,
				message: "L'email che hai inserito non è valida."
			});
			return;
		}

		setStatus({
			validity: true,
			message: "Sembra OK!"
		});
	});

	return [email, setEmail, emailStatus]
}
