import 'bootstrap/dist/css/bootstrap.min.css';
import './style';
import InstanceUrl from './contexts/InstanceUrl';
import ONavbar from './components/ONavbar';
import LoginStatus from './contexts/LoginStatus';
import Router from 'preact-router';
import { Container } from 'react-bootstrap';
import LoginAndRegistration from './routes/LoginAndRegistration';
import Profile from './routes/Profile';
import useLoginDataStorage from './hooks/useLoginDataStorage';

export default function() {
	const [instanceUrl, loginStatus, onSuccessfulLogin, requestLogout] = useLoginDataStorage();

	return (
		<InstanceUrl.Provider value={instanceUrl}>
			<LoginStatus.Provider value={loginStatus}>
				<ONavbar/>
				<Container>
					<Router>
						<LoginAndRegistration path={"/login"} onSuccessfulLogin={onSuccessfulLogin}/>
						<Profile path={"/profile/me"} requestLogout={requestLogout}/>
						<div default><span style={"font-family: 'Impact', sans-serif; font-size: 72px;"}>TESTO DI SOPRA<br/><br/><br/>TESTO DI SOTTO</span></div>
					</Router>
				</Container>
			</LoginStatus.Provider>
		</InstanceUrl.Provider>
	);
};
