import { useState } from 'react';
interface Props {}

export default function Teste2({}: Props) {
	const [clicks, setClicks] = useState(0);

	function onClick() {
		setClicks(clicks + 2);
	}

	return <button onClick={onClick}>{clicks}</button>;
}
