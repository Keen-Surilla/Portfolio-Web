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
  intro: 'I’m a [[full-stack]] developer building [[web]] and [[mobile]] applications with a focus on practical, user-friendly solutions.',
  now: 'I’m a 4th-year IT student seeking a web developer OJT. I’m currently developing a document management system for PRISAA athletics and enjoy turning ideas into functional applications.',
};

export const stats = [
  { value: '3', label: 'featured projects' },
  { value: '4th', label: 'year BS Information Technology' },
  { value: 'OJT', label: 'open to internship opportunities' },
];

export const nav = [
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'certificates', label: 'Training & Events' },
];

// The middle card (2nd in the list) is the featured one.
export const projects = [
  {
    title: 'Carsada',
    badges: ['Mobile app', 'UI/UX'],
    description: 'Developed Flutter navigation interfaces and helped resolve route calculation and jeepney recommendation errors to support commuters in finding suitable routes across Iloilo City.',
    technologies: ['Flutter', 'Dart', 'Figma'],
    image: img('carsada.jpg'),
    link: 'https://carsadawebsite.vercel.app/',
  },
  {
    title: 'ILOPRISAA Document Management',
    badges: ['Web app', 'Full-stack'],
    description: 'Developing a document management system for athlete eligibility verification across member institutions, featuring role-based access control and multi-slot document uploads.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'RBAC'],
    image: img('iloprisaa.png'),
    link: 'https://iloprisaa.vercel.app/',
  },
  {
    title: 'Arduino Surface Leveling System',
    badges: ['Embedded', 'Hardware'],
    description: 'Built a surface leveling indicator using an MPU-9250 sensor, LEDs, and a buzzer to provide visual and audible feedback when a surface is not level.',
    technologies: ['Arduino IDE', 'C++', 'MPU-9250', 'LEDs', 'Buzzer'],
    image: img('arduino-project.jpg'),
    link: 'https://github.com/Keen-Surilla/Leveling-sensor---Arduino-Uno/tree/main',
  },
];

// Shown when "View all projects" is clicked.
export const moreProjects = [
  {
    title: 'Boteco',
    badges: ['Branding', 'Logo design'],
    description: 'Designed the logo for a recycling rewards platform, establishing an initial visual identity for the project.',
    technologies: ['Figma', 'Logo Design', 'UI/UX Design'],
    image: img('project2.png'),
    link: 'https://www.figma.com/design/5ubN5RoLgjlHjOJ5JjJkuq/Prototype-Boteco?node-id=0-1&t=n5eENYjZPjDNt1bg-1',
  },
  {
    title: 'Awesome Todos',
    badges: ['Web app', 'UI design'],
    description: 'Designed a task management interface in Figma with task organization and priority levels to support a clear and structured workflow.',
    technologies: ['Figma', 'Render'],
    image: img('todos-project.png'),
    link: 'https://surilla-keen.onrender.com/',
  },
];

export const stack = [
  { group: 'Frontend', items: ['React', 'TypeScript','Vite', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { group: 'Backend & Database', items: ['Supabase', 'PostgreSQL', 'Node.js', 'RBAC', 'RLS'] },
  { group: 'Security & Identity', items: ['Supabase Auth', 'JWT', 'SHA'] },
  { group: 'Developer Tools', items: ['Git', 'GitHub', 'Visual Studio Code', 'ClickUp'] },
  { group: 'UI/UX Design', items: ['Figma', 'Google Stitch'] },
  { group: 'Mobile & Embedded', items: ['Flutter', 'Dart', 'Arduino', 'C++'] },
];

// Training & Events. On the homepage: the `featured` training entries + every event.
// The "all" page shows everything, grouped by `category`.
//  - issuer: provider, shown in small caps (leave out if unknown).
//  - icon:   optional small logo, e.g. img('certificates/icons/aws.png'); otherwise a letter badge shows.
//  - link:   ONLY add this when you have a real, working certificate URL (or a picture you put in
//            client/public/certificates/, e.g. img('certificates/aws.jpg')). No link = no "view certificate" shown.
// Check every title and date against your actual certificate before publishing.
export const certificates = [
  {
    title: 'AWS Technical Essentials',
    category: 'Training',
    featured: true,
    issuer: 'AWS Training & Certification',
    type: 'Course Completion',
    date: 'July 2026',
    icon: img('certificates/icons/aws.svg'),
    link: img('certificates/Aws%20Technical%20Essentials.pdf'),
  },
  {
    title: 'Implement Continuous Integration and Continuous Delivery (CI/CD) in Microsoft Fabric',
    category: 'Training',
    featured: true,
    issuer: 'Microsoft',
    type: 'Course Completion',
    date: 'July 2026',
    icon: img('certificates/icons/microsoft.svg'),
    link: 'https://learn.microsoft.com/api/achievements/share/en-us/KeenDraylinSurilla-9942/XPJR32SY?sharingId=33A8E48EF1BAB32B',
  },
  {
    title: 'Design Thinking for Beginners',
    category: 'Training',
    featured: true,
    issuer: 'Simplilearn',
    type: 'Course Completion',
    date: 'July 2026',
    icon: img('certificates/icons/simplilearn.svg'),
    link: 'https://simpli-web.app.link/e/9PsaTn2Eq8b',
  },
  {
    title: 'Introduction to End-to-End Analytics Using Microsoft Fabric',
    category: 'Training',
    issuer: 'Microsoft',
    type: 'Course Completion',
    date: 'July 2026',
    icon: img('certificates/icons/microsoft.svg'),
    link: 'https://learn.microsoft.com/api/achievements/share/en-us/KeenDraylinSurilla-9942/FEDYGWLX?sharingId=33A8E48EF1BAB32B',
  },
  {
    title: 'Exploring Internet of Things with Cisco Packet Tracer',
    category: 'Training',
    issuer: 'Cisco Networking Academy',
    type: 'Course Completion',
    date: 'August 2026',
    icon: img('certificates/icons/cisco.svg'),
    link: 'https://www.netacad.com/recognitions/verify/f17a047a-0d29-44f4-b7b8-6f1dbf104639',
  },
  {
    title: 'Build. Think. Automate.',
    subtitle: 'Real Apps, Real AI, Real Automation, Live',
    category: 'Technical events',
    type: 'Event Support',
    date: 'September 17, 2026',
    description: 'Delivered the opening remarks, designed the event poster, and assisted with the organization of the technical webinar.',
  },
  {
    title: 'Internet of Things (IoT) and Smart Systems',
    category: 'Technical events',
    type: 'Webinar Participation',
    date: 'October 25, 2024',
    description: 'Participated in a webinar covering IoT, smart devices, and their integration into everyday life and industrial applications.',
    link: img('certificates/Keen%20Draylin%20Samar%20Surilla%20IOT%20and%20Smart%20Systems%20Webinar%20Certificate.pdf'),
  },
];