import { useState } from 'react';

export function HudAnim() {
	const [active, setActive] = useState(true);

	return (
		<div className="container">
			<div className="canvas-holder bg-gray-900 grid place-items-center">
				<div className="w-24 h-24"></div>
			</div>
		</div>
	);
}
