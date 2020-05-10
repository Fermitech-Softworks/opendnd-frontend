import { Button, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function(props) {
	return (
		<Card>
			<Card.Body>
				<Card.Title>
					Logout
				</Card.Title>
				<Form>
					<Form.Group>
						<Button variant={"danger"} onClick={props.requestLogout}>
							Logout
						</Button>
					</Form.Group>
				</Form>
			</Card.Body>
		</Card>
	)
}
