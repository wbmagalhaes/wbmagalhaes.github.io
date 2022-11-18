import HUD from './HUD';

export function HudAnim() {
	return (
		<div className="container">
			<div className="canvas-holder bg-indigo-900 grid place-items-center">
				<svg className="max-w-[95%] max-h-[95%]" viewBox="0 0 997.4 699.66" strokeLinecap="round">
					<HUD.Top />
					<HUD.Border />
					<HUD.Grad />
					<HUD.Arrows />
					<HUD.Map />
					<HUD.Bottom />
				</svg>
			</div>
		</div>
	);
}
