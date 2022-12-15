import { DownArrow } from '../atoms/DownArrow';

export default function Hero() {
	return (
		<section className="h-full min-h-screen flex flex-col px-4 pb-8 sm:px-8 pt-32">
			<div className="flex flex-col">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none">William Magalhães</h1>
				<h2 className="text-1xl sm:text-2xl md:text-3xl font-semibold py-2">Full-stack Developer</h2>
				<p className="max-w-lg text-justify py-2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur.
				</p>
			</div>

			<div className="flex-grow flex flex-col justify-end items-center">
				<DownArrow />
			</div>
		</section>
	);
}
