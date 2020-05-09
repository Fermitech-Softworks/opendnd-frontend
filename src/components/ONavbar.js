import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'preact/hooks';
import LoginStatus from '../contexts/LoginStatus';
import InstanceUrl from '../contexts/InstanceUrl';

export default function() {
	const loginStatus = useContext(LoginStatus);
	const instanceUrl = useContext(InstanceUrl);

	return (
		<Navbar bg={"dark"} variant={"dark"} expand={"lg"}>
			<Navbar.Brand href={"/"}>Rasanahal</Navbar.Brand>
			<Navbar.Toggle/>
			<Navbar.Collapse>
				<Nav className="mr-auto">
				</Nav>
				<Nav>
					<Nav.Link href={"/me"}>
						{String(loginStatus)}
					</Nav.Link>
					<Navbar.Text>
						@
					</Navbar.Text>
					<Nav.Link href={"/instance"}>
						{instanceUrl}
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
