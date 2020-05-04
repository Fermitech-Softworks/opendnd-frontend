import { Component } from 'preact';
import RegistrationCard from '../components/RegistrationCard';
import { Col, Row } from 'react-bootstrap';
import LoginCard from '../components/LoginCard';

export default class Login extends Component {
	render() {
		return (
			<div>
				<Row>
					<Col>
						<LoginCard onLogin={this.props.onLogin}/>
					</Col>
					<Col>
						<RegistrationCard onLogin={this.props.onLogin}/>
					</Col>
				</Row>
			</div>
		);
	}
}
