import LogoutCard from '../components/LogoutCard';
import { Fragment } from 'preact';
import { useContext } from 'preact/hooks';
import LoginStatus from '../contexts/LoginStatus';

export default function(props) {
	const loginStatus = useContext(LoginStatus);

	return (
		<Fragment>
			<h1>
				{loginStatus.user.username}
			</h1>
			<LogoutCard requestLogout={props.requestLogout}/>
		</Fragment>
	)
}
