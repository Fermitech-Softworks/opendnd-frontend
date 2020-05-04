import 'bootstrap/dist/css/bootstrap.min.css';
import './style';
import { Component, Fragment } from 'preact';
import { Router } from 'preact-router';
import ONavbar from './components/ONavbar';
import { createHashHistory } from 'history';
import Login from './routes/Login';
import { Container } from 'react-bootstrap';

// noinspection JSUnusedGlobalSymbols
export default class App extends Component {
	constructor() {
		super();
		this.state = {
			"login": null
		}
	}

	handleLogin = (json) => {
		this.setState({
			"login": json
		})
	};

	render() {
		return (
			<Fragment>
				<ONavbar login={this.state.login}/>
				<Container>
					<Router history={createHashHistory()}>
						<Login path={"/login"} onLogin={this.handleLogin}/>
						<div default>You ended up in an empty demiplane. It sucks, doesn't it?</div>
					</Router>
				</Container>
			</Fragment>
		);
	}
}
