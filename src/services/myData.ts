import { type Social } from 'types/social';
import { type TechList } from 'types/tech';
import { type Work } from 'types/work';

const email = 'william.b.magalhaes@gmail.com';

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
];

const techStack: TechList[] = [
  {
    title: 'Languages',
    list: [
      { name: 'Go', icon: 'simple-icons:go', color: '#00ADD8', level: 5 },
      { name: 'Rust', icon: 'simple-icons:rust', color: '#181818', level: 4 },
      { name: 'TypeScript/JavaScript', icon: 'simple-icons:typescript', color: '#3178C6', level: 5 },
      { name: 'Python', icon: 'simple-icons:python', color: '#3776AB', level: 5 },
      { name: 'C#', icon: 'simple-icons:csharp', color: '#239120', level: 5 },
      { name: 'HTML/CSS', icon: 'simple-icons:html5', color: '#E34F26', level: 5 },
      { name: 'Lua', icon: 'simple-icons:lua', color: '#2C2D72', level: 3 },
    ],
  },
  {
    title: 'Frontend',
    list: [
      { name: 'React', icon: 'simple-icons:react', color: '#61DAFB', level: 5 },
      { name: 'TailwindCSS', icon: 'simple-icons:tailwindcss', color: '#06B6D4', level: 5 },
      { name: 'Angular', icon: 'simple-icons:angular', color: '#DD0031', level: 4 },
      { name: 'Astro', icon: 'simple-icons:astro', color: '#BC52EE', level: 3 },
      { name: 'THREE.js', icon: 'simple-icons:threedotjs', color: '#FFFFFF', level: 3 },
    ],
  },
  {
    title: 'Backend',
    list: [
      { name: 'Gin', icon: 'simple-icons:gin', color: '#008ECF', level: 4 },
      { name: 'Axum', icon: 'simple-icons:tokio', color: '#000000', level: 4 },
      { name: 'Django', icon: 'simple-icons:django', color: '#092E20', level: 4 },
      { name: 'Postman', icon: 'simple-icons:postman', color: '#FF6C37', level: 4 },
      { name: 'Swagger', icon: 'simple-icons:swagger', color: '#85EA2D', level: 4 },
      { name: 'FastAPI', icon: 'simple-icons:fastapi', color: '#009688', level: 3 },
      { name: 'Firebase', icon: 'simple-icons:firebase', color: '#FFCA28', level: 3 },
    ],
  },
  {
    title: 'Data',
    list: [
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql', color: '#4169E1', level: 4 },
      { name: 'Pandas', icon: 'simple-icons:pandas', color: '#150458', level: 4 },
      { name: 'NumPy', icon: 'simple-icons:numpy', color: '#013243', level: 4 },
      { name: 'ClickHouse', icon: 'simple-icons:clickhouse', color: '#FFCC01', level: 3 },
      { name: 'Redis', icon: 'simple-icons:redis', color: '#FF4438', level: 3 },
      { name: 'MQTT', icon: 'simple-icons:mqtt', color: '#660066', level: 3 },
      { name: 'MySQL', icon: 'simple-icons:mysql', color: '#4479A1', level: 3 },
      { name: 'SQLite', icon: 'simple-icons:sqlite', color: '#003B57', level: 3 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    list: [
      { name: 'Git', icon: 'simple-icons:git', color: '#F05032', level: 5 },
      { name: 'Docker', icon: 'simple-icons:docker', color: '#2496ED', level: 4 },
      { name: 'Linux', icon: 'simple-icons:linux', color: '#FCC624', level: 4 },
      { name: 'Kubernetes', icon: 'simple-icons:kubernetes', color: '#326CE5', level: 3 },
      { name: 'AWS', icon: 'simple-icons:amazonwebservices', color: '#FF9900', level: 3 },
      { name: 'GitHub Actions', icon: 'simple-icons:githubactions', color: '#2088FF', level: 3 },
    ],
  },
  {
    title: 'Game Dev & Hardware',
    list: [
      { name: 'Unity3D', icon: 'simple-icons:unity', color: '#FFFFFF', level: 4 },
      { name: 'Arduino', icon: 'simple-icons:arduino', color: '#00979D', level: 4 },
      { name: 'Godot', icon: 'simple-icons:godotengine', color: '#478CBF', level: 3 },
      { name: 'RaspberryPi', icon: 'simple-icons:raspberrypi', color: '#A22846', level: 3 },
    ],
  },
];

const work: Work[] = [
  {
    name: 'Greenole',
    at: 'Greenole',
    atURL: 'https://greenole.com/',
    title: 'Full-stack developer',
    date: 'Jan 2023 - Present',
    description: `
			Developed dynamic dashboards using HTML, CSS, JavaScript and Angular. Simultaneously, I've used my proficiency in Python, PostgreSQL and Redis to build a Django RESTful API backend and microservices, such as an user customizable alert system.
			Throughout these projects, I collaborated actively with cross-functional teams, ensuring seamless integration between frontend and backend components.
		`,
    activities: [
      'Full-stack development',
      'Angular',
      'Django',
      'Docker',
      'Redis',
    ],
  },
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
			Our dataset was composed of 5000 images of raw Arabica coffee beans, classified as perfect
			and 9 types of common defects found in coffees sold in the Brazilian internal market.
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

export const getEmail = (): string => email;
export const getSocials = (): Social[] => socials;
export const getTechStacks = (): TechList[] => techStack;
export const getWorks = (): Work[] => work;
