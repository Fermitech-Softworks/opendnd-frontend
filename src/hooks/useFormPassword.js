import { useState } from 'preact/hooks';
import useFormValidator from './useFormValidator';

export default function() {
	const [password, setPassword] = useState("");
	const passwordStatus = useFormValidator(password, (value, setStatus) => {
		if(value.length === 0) {
			setStatus({
				validity: null,
				message: ""
			});
			return;
		}

		if(value.length < 12) {
			setStatus({
				validity: false,
				message: "Le password di Rasanahal in genere hanno almeno 12 caratteri..."
			});
			return;
		}

		setStatus({
			validity: true,
			message: "Sembra OK!"
		});
	});

	return [password, setPassword, passwordStatus]
}
