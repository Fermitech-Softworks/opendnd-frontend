import { Component } from 'preact';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import {usernameRegex, emailRegex, passwordRegex} from '../utils/validation';
import { apiRequest } from '../utils/apirequest';

export default class RegistrationCard extends Component {
	constructor() {
		super();
		this.state = {
			"username": "",
			"email": "",
			"password": "",
			"status": "waiting"
		}
	}

	handleChangeUsername = (e) => {
		this.setState({
			"username": e.target.value
		})
	};

	handleChangeEmail = (e) => {
		this.setState({
			"email": e.target.value
		})
	};

	handleChangePassword = (e) => {
		this.setState({
			"password": e.target.value
		})
	};

	handleSubmit = (e) => {
		this.setState({
			"status": "running"
		});
		let formdata = new FormData();
		formdata.append("username", this.state.username);
		formdata.append("email", this.state.email);
		formdata.append("password", this.state.password);
		apiRequest("POST", "/api/register", formdata).then((json) => {
			let formdata = new FormData();
			formdata.append("email", this.state.email);
			formdata.append("password", this.state.password);
			apiRequest("POST", "/api/login", formdata).then((json) => {
				this.props.onLogin(json);
			});
		});
		return false;
	};

	render() {
		return (
			<Card>
				<Card.Body>
					<Card.Title>Registrati</Card.Title>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Username</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type={"text"}
									placeholder={"sungod"}
									value={this.state.username}
									onChange={this.handleChangeUsername}
									isValid={usernameRegex.test(this.state.username)}
									isInvalid={this.state.username !== "" && !usernameRegex.test(this.state.username)}
								/>
								<Form.Control.Feedback>Ok!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">Gli username possono contenere solo lettere minuscole.</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type={"text"}
								placeholder={"pelor@pianoastrale.com"}
								value={this.state.email}
								onChange={this.handleChangeEmail}
								isValid={emailRegex.test(this.state.email)}
								isInvalid={this.state.email !== "" && !emailRegex.test(this.state.email)}
							/>
							<Form.Control.Feedback>Ok!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">Hai inserito una email non valida.</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type={"password"}
								placeholder={"hunter2"}
								value={this.state.password}
								onChange={this.handleChangePassword}
								isValid={passwordRegex.test(this.state.password)}
								isInvalid={this.state.password !== "" && !passwordRegex.test(this.state.password)}
							/>
							<Form.Control.Feedback>Ok!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">Le password devono essere lunghe almeno 12 caratteri.</Form.Control.Feedback>
						</Form.Group>
						<Button variant="primary" type="submit" disabled={this.state.status !== "waiting"}>
							Registrati
						</Button>
					</Form>
				</Card.Body>
			</Card>
		);
	}
}
