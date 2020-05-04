import { Component } from 'preact';
import { Nav, Navbar } from 'react-bootstrap';

export default class ONavbar extends Component {
	render() {
		let login;
		if(this.props.login === null) {
			login = <Nav.Link href={"/login"}>Login</Nav.Link>
		}
		else {
			login = <Navbar.Text>Logged in as {this.props.login.username}</Navbar.Text>
		}

		return (
			<Navbar bg={"dark"} variant={"dark"} expand={"lg"}>
				<Navbar.Brand href={"/"}>OpenDnD</Navbar.Brand>
				<Navbar.Toggle/>
				<Navbar.Collapse>
					<Nav className="mr-auto">
					</Nav>
					<Nav>
						{login}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
