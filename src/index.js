import 'bootstrap/dist/css/bootstrap.min.css';
import './style';
import { useState } from 'preact/hooks';
import InstanceUrl from './contexts/InstanceUrl';
import ONavbar from './components/ONavbar';
import LoginStatus from './contexts/LoginStatus';
import Router from 'preact-router';
import { Container } from 'react-bootstrap';
import InstanceSelector from './components/InstanceSelector';

export default function() {
	const [instanceUrl, setInstanceUrl] = useState("https://rygapi.steffo.eu");
	const [loginStatus, setLoginStatus] = useState(null);

	return (
		<InstanceUrl.Provider value={instanceUrl}>
			<LoginStatus.Provider value={loginStatus}>
				<ONavbar/>
				<Container>
					<Router>
						<InstanceSelector value={instanceUrl} setValue={setInstanceUrl} path={"/instance"}>instance</InstanceSelector>
						<div path={"/me"}>profile/login</div>
						<div default>default</div>
					</Router>
				</Container>
			</LoginStatus.Provider>
		</InstanceUrl.Provider>
	);
};
