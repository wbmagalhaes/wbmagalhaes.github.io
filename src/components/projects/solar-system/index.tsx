import { Suspense } from 'react';
import Loading from '@atoms/Loading';

export function SolarSystem() {
	return (
		<div className="container">
			<div className="canvas-holder">
				<Suspense fallback={<Loading />}>
					<Loading />
				</Suspense>
			</div>
		</div>
	);
}
