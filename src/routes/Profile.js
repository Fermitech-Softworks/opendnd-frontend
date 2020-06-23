import LogoutCard from '../components/LogoutCard';
import { Fragment } from 'preact';
import { useContext } from 'preact/hooks';
import LoginStatus from '../contexts/LoginStatus';
import RoyalnetUserInfoCard from '../components/RoyalnetUserInfoCard';

export default function(props) {
	const loginStatus = useContext(LoginStatus);

	let logoutCard = null;
	if(loginStatus !== null && loginStatus["uid"] === props.uid) {
		logoutCard = <LogoutCard requestLogout={props.requestLogout}/>
	}

	return (
		<Fragment>
			<h1>
				{loginStatus.user.username}
			</h1>
			<RoyalnetUserInfoCard uid={props.uid}/>
			{logoutCard}
		</Fragment>
	)
}
