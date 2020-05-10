import LoginCard from './LoginCard';
import RegistrationCard from './RegistrationCard';
import { Fragment } from 'preact';
import { Col, Row } from 'react-bootstrap';

export default function(props) {
	return (
		<Fragment>
			<Row>
				<Col>
					<LoginCard setInstanceUrl={props.setInstanceUrl} setLoginStatus={props.setLoginStatus}/>
				</Col>
				<Col>
					<RegistrationCard setInstanceUrl={props.setInstanceUrl} setLoginStatus={props.setLoginStatus}/>
				</Col>
			</Row>
		</Fragment>
	)
}
