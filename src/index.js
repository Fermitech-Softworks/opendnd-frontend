import 'bootstrap/dist/css/bootstrap.min.css';
import './style';
import useRoyalnetData from './hooks/useRoyalnetData';

export default function() {
	const royalnetData = useRoyalnetData("GET", "/api/diario/get/v1", {"id": 5000});

	return (
		<div>
			{royalnetData}
		</div>
	);
};
