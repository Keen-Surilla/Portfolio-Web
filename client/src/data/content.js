// All the text on your portfolio lives here. Edit freely.
const img = (name) => `${process.env.PUBLIC_URL}/${name}`;

export const profile = {
  name: 'Keen Draylin Surilla',
  email: 'keendraylinsurilla@gmail.com',
  location: 'Iloilo City, Philippines',
  photo: img('me.jpg'),
  links: [
    { label: 'github', href: 'https://github.com/Keen-Surilla' },
    { label: 'facebook', href: 'https://www.facebook.com/share/1A5rAmA7nP/' },
    { label: 'email', href: 'mailto:keendraylinsurilla@gmail.com' },
  ],
};

// In the intro, words wrapped in [[double brackets]] show as chips.
export const hero = {
  intro: 'I’m a [[full-stack]] developer. I build [[web]] & [[mobile apps]], and I design them in Figma first.',
  now: 'I’m a 4th-year IT student looking for an OJT. Right now I’m building a document management system for school athletics, and I love turning rough ideas into things people actually use.',
};

export const stats = [
  { value: '3', label: 'featured projects' },
  { value: '4th', label: 'year BS Information Technology' },
  { value: 'OJT', label: 'open to internship opportunities' },
];

export const nav = [
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

// The middle card (2nd in the list) is the featured one.
export const projects = [
  {
    title: 'Carsada',
    badges: ['Mobile app', 'UI/UX'],
    description: 'Shows Iloilo City commuters which jeepney to ride and the best route to their destination.',
    technologies: ['Flutter', 'Dart', 'Figma'],
    image: img('carsada.jpg'),
    link: 'https://carsadawebsite.vercel.app/',
  },
  {
    title: 'ILOPRISAA Document Management',
    badges: ['Web app', 'Full-stack'],
    description: 'Verifies athlete eligibility across member schools in Iloilo, with role-based access and multi-slot document uploads.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
    image: img('iloprisaa.png'),
    link: 'https://iloprisaa.vercel.app/',
  },
  {
    title: 'Arduino Leveling System',
    badges: ['Embedded', 'Hardware'],
    description: 'Reads sensors in real time and drives servo motors to level a surface automatically.',
    technologies: ['Arduino IDE', 'C++', 'Servo motors'],
    image: img('arduino-project.jpg'),
    link: 'https://github.com/Keen-Surilla/Leveling-sensor---Arduino-Uno/tree/main',
  },
];

// Shown when "View all projects" is clicked.
export const moreProjects = [
  {
    title: 'Boteco',
    badges: ['UI/UX', 'Design system'],
    description: 'Brand logo, component library and interactive prototype for a fintech recycling rewards dashboard.',
    technologies: ['Figma', 'Prototyping', 'Design system'],
    image: img('project2.png'),
    link: 'https://www.figma.com/design/5ubN5RoLgjlHjOJ5JjJkuq/Prototype-Boteco?node-id=0-1&t=n5eENYjZPjDNt1bg-1',
  },
  {
    title: 'Awesome Todos',
    badges: ['Web app', 'UI design'],
    description: 'A modern todo app designed in Figma, with task organization and priority levels.',
    technologies: ['Figma', 'UI design'],
    image: img('todos-project.png'),
    link: 'https://surilla-keen.onrender.com/',
  },
];

export const stack = [
  'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Flutter', 'Dart',
  'Supabase', 'PostgreSQL', 'Git', 'GitHub', 'Figma', 'Arduino (C++)',
];