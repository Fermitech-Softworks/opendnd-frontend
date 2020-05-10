import { Alert, Button, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import getEventValue from '../utils/getEventValue';
import apiRequest from '../utils/apiRequest';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import useFormInstanceUrl from '../hooks/useFormInstanceUrl';
import useFormUsername from '../hooks/useFormUsername';
import useFormPassword from '../hooks/useFormPassword';
import useFormEmail from '../hooks/useFormEmail';

export default function(props) {
	const [instanceUrl, setInstanceUrl, instanceUrlStatus] = useFormInstanceUrl();
	const [username, setUsername, usernameStatus] = useFormUsername();
	const [email, setEmail, emailStatus] = useFormEmail();
	const [password, setPassword, passwordStatus] = useFormPassword();

	const [loginWorking, setLoginWorking] = useState(false);
	const [loginError, setLoginError] = useState(null);
	function login() {
		setLoginWorking(true);
		apiRequest(instanceUrl, "POST", "/api/user/create/v1", {
			username: username,
			email: email,
			password: password
		}).then((data) => {
			apiRequest(instanceUrl, "POST", "/api/login/royalnet/v1", {
				username: username,
				password: password
			}).then((data) => {
				props.setInstanceUrl(instanceUrl);
				props.setLoginStatus(data);
				route("/");
			}).catch((err) => {
				setLoginError(err);
			}).finally(() => {
				setLoginWorking(false);
			})
		}).catch((err) => {
			setLoginError(err);
			setLoginWorking(false);
		})
	}
	let loginErrorComponent = null;
	if(loginError !== null) {
		loginErrorComponent = <Alert variant={"danger"}>{loginError.toString()}</Alert>
	}


	return (
		<Card>
			<Card.Body>
				<Card.Title>
					Registrati
				</Card.Title>
				<Form>
					<Form.Group>
						<Form.Label>
							Istanza
						</Form.Label>
						<Form.Control
							type={"text"}
							placeholder={"https://pelor.pianoastrale.dom"}
							value={instanceUrl}
							onChange={getEventValue(setInstanceUrl)}
							isValid={instanceUrlStatus.validity === true}
							isInvalid={instanceUrlStatus.validity === false}
						/>
						<Form.Control.Feedback>{instanceUrlStatus.message}</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">{instanceUrlStatus.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Username
						</Form.Label>
						<Form.Control
							type={"text"}
							placeholder={"pelor"}
							value={username}
							onChange={getEventValue(setUsername)}
							isValid={usernameStatus.validity === true}
							isInvalid={usernameStatus.validity === false}
						/>
						<Form.Control.Feedback>{usernameStatus.message}</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">{usernameStatus.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Email
						</Form.Label>
						<Form.Control
							type={"text"}
							placeholder={"pelor@pianoastrale.dom"}
							value={email}
							onChange={getEventValue(setEmail)}
							isValid={emailStatus.validity === true}
							isInvalid={emailStatus.validity === false}
						/>
						<Form.Control.Feedback>{emailStatus.message}</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">{emailStatus.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Password
						</Form.Label>
						<Form.Control
							type={"password"}
							placeholder={"d1v1n3_r3tr1but10n"}
							value={password}
							onChange={getEventValue(setPassword)}
							isValid={passwordStatus.validity === true}
							isInvalid={passwordStatus.validity === false}
						/>
						<Form.Control.Feedback>{passwordStatus.message}</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">{passwordStatus.message}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Button disabled={loginWorking || instanceUrlStatus.validity !== true || usernameStatus.validity !== true || passwordStatus.validity !== true} onClick={login}>
							Login
						</Button>
					</Form.Group>
					<Form.Group>
						{loginErrorComponent}
					</Form.Group>
				</Form>
			</Card.Body>
		</Card>
	)
}
