import { DownArrow } from '../atoms/DownArrow';

export default function Hero() {
	return (
		<section className="h-full min-h-screen flex flex-col pt-32">
			<div className="flex flex-col p-4 md:p-8 lg:p-16">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none">William Magalhães</h1>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold py-2">Full-stack Developer</h2>
				<p className="max-w-xl lg:max-w-2xl text-justify py-2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur.
				</p>
			</div>

			<div className="flex-grow flex flex-col justify-end items-center">
				<DownArrow href="#about" />
			</div>
		</section>
	);
}
