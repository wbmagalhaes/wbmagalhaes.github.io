import Button from '@common/Button';
import Card from '.';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

export default function CardContainer() {
	const dragConstraint = useRef<HTMLDivElement>(null);
	const [cards, setCards] = useState<number[]>([0, 1, 2, 3, 4, 5]);

	function sendToTop(index: number) {
		setCards((prev) => {
			const old = prev[index];
			const newCards = prev.map((z) => (z > old ? z - 1 : z));
			newCards[index] = 5;
			return newCards;
		});
	}

	return (
		<div ref={dragConstraint} className="grid grid-cols-1 md:grid-cols-3 items-start gap-8">
			<Card zIndex={cards[0]} rotation={0.015} dragConstraint={dragConstraint} onDragStart={() => sendToTop(0)}>
				<Card.Header
					title={'Teste Header'}
					bgColor="#f00"
					left={
						<Card.Thumbnail>
							<span className="p-1">
								<Icon icon="ic:outline-email" width={28} />
							</span>
						</Card.Thumbnail>
					}
					right={<Icon icon="ic:outline-email" width={22} />}
				/>
				<Card.Media>
					<img
						src="./images/placeholder.jpg"
						height="100"
						className="object-none object-center h-48 w-full"
					/>
				</Card.Media>
				<Card.Content>
					<p>
						Teste Content asd asd asd asdasdasdasd asd asda sda sdas dasdasdasd asd asd asd asda sdasdasd
						asd asdasd asdasd asd asd as asd asd asd asdas das das dasd asd as asd asasdasdasdasd asd asd as
						asd
					</p>
				</Card.Content>
				<Card.Footer>
					<div className="flex justify-end">
						<Button bgColor="#14e">
							<Icon icon="ic:outline-email" width={20} />
							<span>Button 1</span>
						</Button>
					</div>
				</Card.Footer>
			</Card>
			<Card
				zIndex={cards[1]}
				translation={[-3.25, -8.25]}
				dragConstraint={dragConstraint}
				onDragStart={() => sendToTop(1)}
			>
				<Card.Header
					title={'Teste Header really really long header and title'}
					subtitle={'Teste Subheader'}
					bgColor="#0f0"
					left={
						<div className="relative">
							<svg
								className="hard-shadow"
								width="44"
								height="44"
								viewBox="-24 -24 224 224"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g transform="translate(-12, -12)">
									<path
										d="M29.2893 29.2893C19.2658 39.3128 15.6458 53.315 18.4294 66.2123C7.34132 73.3638 0 85.8246 0 100C-1.74156e-06 114.175 7.34132 126.636 18.4294 133.788C15.6458 146.685 19.2658 160.687 29.2893 170.711C39.3129 180.734 53.315 184.354 66.2123 181.571C73.3639 192.659 85.8246 200 100 200C114.175 200 126.636 192.659 133.788 181.571C146.685 184.354 160.687 180.734 170.711 170.711C180.734 160.687 184.354 146.685 181.571 133.788C192.659 126.636 200 114.175 200 100C200 85.8246 192.659 73.3638 181.571 66.2123C184.354 53.315 180.734 39.3129 170.711 29.2893C160.687 19.2658 146.685 15.6458 133.788 18.4294C126.636 7.34133 114.175 0 100 0C85.8246 0 73.3638 7.34131 66.2123 18.4293C53.315 15.6458 39.3129 19.2658 29.2893 29.2893Z"
										fill="whitesmoke"
									></path>
								</g>
							</svg>
							<Icon className="absolute inset-0 m-auto" icon="ic:outline-email" width={28} />
						</div>
					}
					right={<Icon icon="ic:outline-email" width={22} />}
				/>
				<Card.Content>
					<p>
						Teste Content asd asd asd asdasdasdasd asd asda sda sdas dasdasdasd asd asd asd asda sdasdasd
						asd asdasd asdasd asd asd as asd asd asd asdas das das dasd asd as asd asasdasdasdasd asd asd as
						asd
					</p>
				</Card.Content>
				<Card.Footer>
					<div className="flex flex-wrap flex-row gap-2">
						<Button bgColor="#0ff">Button 1</Button>
						<Button bgColor="#ff0" translation={[-2.5, -2]}>
							Button 2
						</Button>
						<Button bgColor="#f0f">Button 3</Button>
					</div>
				</Card.Footer>
			</Card>
			<Card zIndex={cards[2]} dragConstraint={dragConstraint} onDragStart={() => sendToTop(2)}>
				<Card.Header
					title={'Teste Header'}
					bgColor="#00f"
					left={
						<Card.Thumbnail>
							<span className="p-1">
								<Icon icon="ic:outline-email" width={28} />
							</span>
						</Card.Thumbnail>
					}
					right={
						<div className="flex gap-2">
							<Icon icon="simple-icons:minutemailer" width={22} />
							<Icon icon="simple-icons:gmail" width={22} />
							<Icon icon="simple-icons:mailgun" width={22} />
						</div>
					}
				/>
				<Card.Content>
					<p>
						Teste Content asd asd asd asdasdasdasd asd asda sda sdas dasdasdasd asd asd asd asda sdasdasd
						asd asdasd asdasd asd asd as asd asd asd asdas das das dasd asd as asd asasdasdasdasd asd asd as
						asd
					</p>
				</Card.Content>
			</Card>
			<Card zIndex={cards[3]} dragConstraint={dragConstraint} onDragStart={() => sendToTop(3)}>
				<Card.Media>
					<img src="./images/placeholder.jpg" className="object-none object-center h-48 w-full" />
				</Card.Media>
				<Card.Header
					title={'Teste Header'}
					subtitle={'Teste Subheader'}
					bgColor="#0df"
					left={
						<Card.Thumbnail>
							<span className="p-1">
								<Icon icon="ic:outline-email" width={28} />
							</span>
						</Card.Thumbnail>
					}
				/>
				<Card.Content>
					<p>
						Teste Content asd asd asd asdasdasdasd asd asda sda sdas dasdasdasd asd asd asd asda sdasdasd
						asd asdasd asdasd asd asd as asd asd asd asdas das das dasd asd as asd asasdasdasdasd asd asd as
						asd
					</p>
				</Card.Content>
				<Card.Footer>
					<div className="flex flex-row items-center justify-between gap-2">
						<span className="text-sm">Texto de footer</span>
						<Button bgColor="#fe1">Button 3</Button>
					</div>
				</Card.Footer>
			</Card>
			<Card zIndex={cards[4]} rotation={-0.0125} dragConstraint={dragConstraint} onDragStart={() => sendToTop(4)}>
				<Card.Header
					title={'Teste Header'}
					subtitle={'Teste Subheader'}
					bgColor="#d0f"
					left={
						<div className="relative">
							<svg
								className="hard-shadow"
								width="44"
								height="44"
								viewBox="-24 -24 224 224"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g transform="translate(-12, -12)">
									<path
										d="M99.9937 200V184.439C49.0583 184.439 0 150.932 0 100H15.5495C15.5495 49.0678 49.0583 0 99.9937 0V15.5612C150.929 15.5612 200 49.0678 200 100H184.451C184.451 150.932 150.929 200 99.9937 200Z"
										fill="whitesmoke"
									></path>
								</g>
							</svg>
							<Icon className="absolute inset-0 m-auto" icon="ic:outline-email" width={28} />
						</div>
					}
				/>
				<Card.Content>
					<p>
						Teste Content asd asd asd asdasdasdasd asd asda sda sdas dasdasdasd asd asd asd asda sdasdasd
						asd asdasd asdasd asd asd as asd asd asd asdas das das dasd asd as asd asasdasdasdasd asd asd as
						asd
					</p>
				</Card.Content>
			</Card>
			<Card zIndex={cards[5]} dragConstraint={dragConstraint} onDragStart={() => sendToTop(5)}>
				<Card.Header
					title={'Teste Header'}
					subtitle={'Teste Subheader'}
					bgColor="#fd0"
					left={
						<Card.Thumbnail>
							<span className="p-1">
								<Icon icon="ic:outline-email" width={28} />
							</span>
						</Card.Thumbnail>
					}
				/>
				<Card.Content>
					<p>
						Teste Content asd asd asd asdasdasdasd asd asda sda sdas dasdasdasd asd asd asd asda sdasdasd
						asd asdasd asdasd asd asd as asd asd asd asdas das das dasd asd as asd asasdasdasdasd asd asd as
						asd
					</p>
				</Card.Content>
				<Card.Footer>
					<span className="text-sm">Texto de footer</span>
				</Card.Footer>
			</Card>
		</div>
	);
}
