import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Social } from '@services/my_info';

type Props = {
	email: string;
	socials: Social[];
};

export default function ContactList({ email, socials }: Props) {
	return (
		<div className="flex flex-wrap justify-center gap-4 my-4">
			<Item key="email" link={`mailto:${email}`} icon="ic:outline-email" name="Email" />

			{socials.map(({ link, icon, name }, i) => (
				<Item key={i} link={link} icon={icon} name={name} />
			))}
		</div>
	);
}

function Item({ link, icon, name }: Social) {
	return (
		<motion.a
			className="inline-flex align-text-bottom gap-1 bg-wm-oxygen hover:bg-wm-oxygen-300 text-wm-hydrogen rounded-full p-2"
			href={link}
			target="_blank"
			aria-label={name}
		>
			<Icon className="w-6 h-6" icon={icon} />
		</motion.a>
	);
}
