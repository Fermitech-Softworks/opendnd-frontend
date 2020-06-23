import useRoyalnetData from '../hooks/useRoyalnetData';
import { Card } from 'react-bootstrap';

export default function (props) {
	const data = useRoyalnetData("GET", "/api/user/get/v1", {
		"id": props.uid
	});

	if(data === null) return "Loading...";

	const roles = data["roles"].join(" ,");
	const aliases = data["aliases"].join(" ,");

	return (
		<Card>
			<Card.Body>
				<Card.Title>
					Royalnet Data
				</Card.Title>
				<ul>
					<li>ID: <b>{data["uid"]}</b></li>
					<li>Username: <b>{data["username"]}</b></li>
					<li>Email: <b>{data["email"]}</b></li>
					<li>Ruoli: <b>{roles}</b></li>
					<li>Aliases: <b>{aliases}</b></li>
				</ul>
			</Card.Body>
		</Card>
	)

}
