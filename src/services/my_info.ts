type TechProps = {
	name: string;
	icon: string;
	color: string;
};

type TechListProps = {
	title: string;
	list: TechProps[];
};

const techStack: TechListProps[] = [
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

export const getTechStack = () => techStack;
