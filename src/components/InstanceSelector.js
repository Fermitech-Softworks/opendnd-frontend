import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import getEventValue from '../utils/getEventValue';
import instanceUrlRegex from '../utils/valid/instanceUrlRegex';
import apiRequest from '../utils/apiRequest';
import { useEffect, useState } from 'preact/hooks';

export default function(props) {
	const [instanceStatus, setInstanceStatus] = useState({
		validity: null,
		message: null
	});

	useEffect(() => {
		if(!Boolean(instanceUrlRegex.test(props.value))) {
			setInstanceStatus({
				validity: false,
				message: "L'URL che hai inserito non è valido."
			});
			return;
		}

		apiRequest(props.value, "GET", "/api/royalnet/version/v1").then((data) => {
			setInstanceStatus({
				validity: true,
				message: `Royalnet ${data["semantic"]}`
			});
		}).catch((err) => {
			setInstanceStatus({
				validity: false,
				message: "Non sembra esserci nessuna istanza a quell'URL... Sei sicuro che quella sia un'istanza di Royalnet?"
			});
		});
		setInstanceStatus({
			validity: null,
			message: ""
		});
	}, [props.value]);

	return (
		<Card>
			<Card.Body>
				<Card.Title>
					Seleziona un'istanza
				</Card.Title>
				<Form>
					<Form.Group>
						<Form.Label>
							URL
						</Form.Label>
						<Form.Control
							type={"text"}
							placeholder={"https://example.org"}
							value={props.value}
							onChange={getEventValue(props.setValue)}
							isInvalid={instanceStatus.validity === false}
							isValid={instanceStatus.validity === true}
						/>
						<Form.Control.Feedback>{instanceStatus.message}</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">{instanceStatus.message}</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</Card.Body>
		</Card>
	)
}
