import LoginCard from './LoginCard';
import RegistrationCard from './RegistrationCard';
import { Fragment } from 'preact';
import { Col, Row } from 'react-bootstrap';
import useFormInstanceUrl from '../hooks/useFormInstanceUrl';
import useFormUsername from '../hooks/useFormUsername';
import useFormEmail from '../hooks/useFormEmail';
import useFormPassword from '../hooks/useFormPassword';

export default function(props) {
	const instanceUrlTrio = useFormInstanceUrl();
	const usernameTrio = useFormUsername();
	const emailTrio = useFormEmail();
	const passwordTrio = useFormPassword();

	return (
		<Fragment>
			<Row>
				<Col>
					<LoginCard
						setInstanceUrl={props.setInstanceUrl}
						setLoginStatus={props.setLoginStatus}
						instanceUrlTrio={instanceUrlTrio}
						usernameTrio={usernameTrio}
						passwordTrio={passwordTrio}
					/>
				</Col>
				<Col>
					<RegistrationCard
						setInstanceUrl={props.setInstanceUrl}
						setLoginStatus={props.setLoginStatus}
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
