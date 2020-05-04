import { Component } from 'preact';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import {emailRegex, passwordRegex} from '../utils/validation';
import { ApiError, apiRequest } from '../utils/apirequest';

export default class LoginCard extends Component {
	constructor() {
		super();
		this.state = {
			"email": "",
			"password": "",
			"status": "waiting",
			"error": null
		}
	}

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
		formdata.append("email", this.state.email);
		formdata.append("password", this.state.password);
		apiRequest("POST", "/api/login", formdata).then((json) => {
			this.props.onLogin(json);
		});
		return false;
	};

	render() {
		return (
			<Card>
				<Card.Body>
					<Card.Title>Login</Card.Title>
					<Form onSubmit={this.handleSubmit}>
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
							<Form.Control.Feedback type="invalid">Le password normalmente sono lunghe almeno 12 caratteri.</Form.Control.Feedback>
						</Form.Group>
						<Button variant={"primary"} type="submit" disabled={this.state.status !== "waiting"}>
							Login
						</Button>
					</Form>
				</Card.Body>
			</Card>
		);
	}
}
