import LoginCard from '../components/LoginCard';
import RegistrationCard from '../components/RegistrationCard';
import { Fragment } from 'preact';
import { Alert, Col, Row } from 'react-bootstrap';
import useFormInstanceUrl from '../hooks/useFormInstanceUrl';
import useFormUsername from '../hooks/useFormUsername';
import useFormEmail from '../hooks/useFormEmail';
import useFormPassword from '../hooks/useFormPassword';
import { useContext } from 'preact/hooks';
import LoginStatus from '../contexts/LoginStatus';
import InstanceUrl from '../contexts/InstanceUrl';

export default function(props) {
	const instanceUrl = useContext(InstanceUrl);
	const loginStatus = useContext(LoginStatus);
	const instanceUrlTrio = useFormInstanceUrl();
	const usernameTrio = useFormUsername();
	const emailTrio = useFormEmail();
	const passwordTrio = useFormPassword();

	if(loginStatus !== null) {
		return (
			<Alert variant={"danger"}>Sei già loggato come <b>{loginStatus.user.username}</b> sull'istanza <b>{instanceUrl}</b>. Se vuoi effettuare il logout, visita <a href={"/profile/me"}>il tuo profilo</a>!</Alert>
		)
	}

	return (
		<Fragment>
			<Row>
				<Col>
					<LoginCard
						onSuccessfulLogin={props.onSuccessfulLogin}
						instanceUrlTrio={instanceUrlTrio}
						usernameTrio={usernameTrio}
						passwordTrio={passwordTrio}
					/>
				</Col>
				<Col>
					<RegistrationCard
						onSuccessfulLogin={props.onSuccessfulLogin}
						instanceUrlTrio={instanceUrlTrio}
						usernameTrio={usernameTrio}
						emailTrio={emailTrio}
						passwordTrio={passwordTrio}
					/>
				</Col>
			</Row>
		</Fragment>
	)
}
