import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import getEventValue from '../utils/getEventValue';
import instanceUrlRegex from '../utils/valid/instanceUrlRegex';
import apiRequest from '../utils/apiRequest';
import useFormValidator from '../hooks/useFormValidator';

export default function(props) {
	const instanceStatus = useFormValidator(props.value, (value, setStatus) => {
		if(!Boolean(instanceUrlRegex.test(value))) {
			setStatus({
				validity: false,
				message: "L'URL che hai inserito non è valido."
			});
			return;
		}

		apiRequest(value, "GET", "/api/royalnet/version/v1").then((data) => {
			if(value === props.value) {
				setStatus({
					validity: true,
					message: `Royalnet ${data["semantic"]}`
				});
			}
		}).catch((err) => {
			if(value === props.value) {
				setStatus({
					validity: false,
					message: "Non sembra esserci nessuna istanza a quell'URL... Sei sicuro che quella sia un'istanza di Royalnet?"
				});
			}
		});
		setStatus({
			validity: null,
			message: ""
		});
	});

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
							placeholder={"https://lo.steffo.eu:8080"}
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
