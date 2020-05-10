import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'preact/hooks';
import LoginStatus from '../contexts/LoginStatus';
import InstanceUrl from '../contexts/InstanceUrl';

export default function() {
	const instanceUrl = useContext(InstanceUrl);
	const loginStatus = useContext(LoginStatus);

	let loginElements;
	if(loginStatus === null) {
		loginElements = [
			<Nav.Link href={"/register"}>
				Registrati
			</Nav.Link>,
			<Nav.Link href={"/login"}>
				Login
			</Nav.Link>
		];
	}
	else {
		loginElements = (
			<Navbar.Text href={"/"}>
				{loginStatus.user.username} @ {instanceUrl}
			</Navbar.Text>
		)
	}

	return (
		<Navbar bg={"dark"} variant={"dark"} expand={"lg"}>
			<Navbar.Brand href={"/"}>Rasanahal</Navbar.Brand>
			<Navbar.Toggle/>
			<Navbar.Collapse>
				<Nav className="mr-auto">
				</Nav>
				<Nav>
					{loginElements}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
