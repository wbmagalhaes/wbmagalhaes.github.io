const email = 'william.b.magalhaes@gmail.com';

export type Social = {
	name: string;
	link: string;
	icon: string;
};

const socials: Social[] = [
	{
		name: 'GitHub',
		link: 'https://github.com/wbmagalhaes/',
		icon: 'ri:github-line',
	},
	{
		name: 'LinkedIn',
		link: 'https://www.linkedin.com/in/wbmagalhaes/',
		icon: 'eva:linkedin-outline',
	},
	{
		name: 'Instagram',
		link: 'https://www.instagram.com/wbmagalhaes/',
		icon: 'ri:instagram-line',
	},
];

type Tech = {
	name: string;
	icon: string;
	color: string;
};

export type TechList = {
	title: string;
	list: Tech[];
};

export type Work = {
	name: string;
	at: string;
	atURL: string;
	title: string;
	date: string;
	description: string;
	activities: string[];
};

const techStack: TechList[] = [
	{
		title: 'Languages',
		list: [
			{ name: 'C#', icon: 'simple-icons:csharp', color: '#239120' },
			{ name: 'Python', icon: 'simple-icons:python', color: '#3776AB' },
			{ name: 'JavaScript', icon: 'simple-icons:javascript', color: '#F7DF1E' },
			{ name: 'TypeScript', icon: 'simple-icons:typescript', color: '#3178C6' },
			{ name: 'CSS3', icon: 'simple-icons:css3', color: '#1572B6' },
			{ name: 'HTML5', icon: 'simple-icons:html5', color: '#E34F26' },
		],
	},
	{
		title: 'Frameworks, Platforms & Libraries',
		list: [
			{ name: 'Unity3D', icon: 'simple-icons:unity', color: '#FFFFFF' },
			{ name: '.NET', icon: 'simple-icons:dotnet', color: '#512BD4' },
			{ name: 'React', icon: 'simple-icons:react', color: '#61DAFB' },
			{ name: 'TailwindCSS', icon: 'simple-icons:tailwindcss', color: '#06B6D4' },
			{ name: 'jQuery', icon: 'simple-icons:jquery', color: '#0769AD' },
			{ name: 'THREE.js', icon: 'simple-icons:threedotjs', color: '#FFFFFF' },
			{ name: 'Bootstrap', icon: 'simple-icons:bootstrap', color: '#7952B3' },
		],
	},
	{
		title: 'Databases',
		list: [
			{ name: 'MySQL', icon: 'simple-icons:mysql', color: '#4479A1' },
			{ name: 'MariaDB', icon: 'simple-icons:mariadb', color: '#003545' },
			{ name: 'SQLite', icon: 'simple-icons:sqlite', color: '#003B57' },
			{ name: 'PostgreSQL', icon: 'simple-icons:postgresql', color: '#4169E1' },
			{ name: 'SQL Server', icon: 'simple-icons:microsoftsqlserver', color: '#CC2927' },
		],
	},
	{
		title: 'Machine Learning & Deep Learning',
		list: [
			{ name: 'Pandas', icon: 'simple-icons:pandas', color: '#150458' },
			{ name: 'Plotly', icon: 'simple-icons:plotly', color: '#3F4F75' },
			{ name: 'NumPy', icon: 'simple-icons:numpy', color: '#013243' },
			{ name: 'Keras', icon: 'simple-icons:keras', color: '#D00000' },
			{ name: 'TensorFlow', icon: 'simple-icons:tensorflow', color: '#FF6F00' },
		],
	},
	{
		title: 'Other',
		list: [
			{ name: 'Git', icon: 'simple-icons:git', color: '#F05032' },
			{ name: 'Docker', icon: 'simple-icons:docker', color: '#2496ED' },
			{ name: 'Postman', icon: 'simple-icons:postman', color: '#FF6C37' },
			{ name: 'Arduino', icon: 'simple-icons:arduino', color: '#00979D' },
			{ name: 'RaspberryPi', icon: 'simple-icons:raspberrypi', color: '#A22846' },
		],
	},
];

const work: Work[] = [
	{
		name: 'Space Wizard Studios',
		at: 'SpaceWizard',
		atURL: 'https://spacewiz.dev/',
		title: 'Freelance full-stack developer',
		date: 'Aug 2020 - Present',
		description: `
			Development of applications and games written in C# in the Unity3D framework.
			Development of websites using HTML, CSS, JavaScript and React.
			Maintenance and configuration of git platform and repositories.
			Modeling and support of SQL and NoSQL databases.
		`,
		activities: ['Full-stack development', 'JavaScript', 'C#', 'Python'],
	},
	{
		name: 'Master in Chemistry',
		at: 'UEL',
		atURL: 'https://portal.uel.br/home/',
		title: 'Arabica coffee defect detection by CNN',
		date: 'Jan 2018 - Dec 2020',
		description: `
			Built and trained a convolutional neural network model with the Python framework TensorFlow,
			to classify images of coffee beans.
			Our dataset was composed by 5000 images of raw Arabica coffee beans, classified as perfect
			and 9 types of common defects found in coffees sold in the Brazilian internal market.
			After training, the neural network had a ~80% accuracy on the testing data.
		`,
		activities: ['Machine Learning', 'Python', 'TensorFlow'],
	},
	{
		name: 'Bachelor in Chemistry',
		at: 'UEL',
		atURL: 'https://portal.uel.br/home/',
		title: 'Low cost Arduino colorimeter',
		date: 'Jan - Dec 2014',
		description: `
			Developed an Arduino colorimeter using LED and photodiode with an op-amp in transimpedance mode.
			All the instrument parts were developed by myself, including the circuitry and the user interface in C#.
			Validation was made against a commercial spectrometer by the phenanthroline method for iron quantification
			in fortified wheat flour, and the low-cost colorimeter showed good sensitivity.
		`,
		activities: ['Analytical Instrumentation', 'Arduino', 'C#'],
	},
];

export type Project = {
	url?: string;
	cover?: string;
	title?: string;
	description?: string;
	tags?: [string];
	date?: string;
	draft?: boolean;
	featured?: boolean;
};

export const getEmail = () => email;
export const getSocials = () => socials;
export const getTechStacks = () => techStack;
export const getWorks = () => work;
