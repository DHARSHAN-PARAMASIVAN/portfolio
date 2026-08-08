export const site = {
  name: "Dharshan Paramasivan",
  short: "DP",
  role: "Full-Stack Engineer · QA Automation · API Security",
  tagline: "Building systems. Breaking assumptions. Securing what ships.",
  mantra: ["BUILD", "VERIFY", "SECURE", "SHIP"] as const,
  email: "dharshanparamasivan@gmail.com",
  phone: "+91 96776 54288",
  location: "Coimbatore",
  github: "https://github.com/DHARSHAN-PARAMASIVAN",
  linkedin: "https://www.linkedin.com/in/dharshan-paramasivan/",
  resume: "/Dharshan-Resume.pdf",
  education: {
    degree: "M.Sc. Software Systems",
    school: "PSG",
    score: "82%",
  },
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  stack: string[];
  image: string;
  liveUrl: string | null;
  repoUrl: string | null;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "vortex",
    number: "01",
    title: "VORTEXIOT",
    category: "Industrial IoT",
    year: "2026",
    blurb:
      "Machinery health monitoring with real-time telemetry, anomaly detection and cloud deployment.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Kafka", "InfluxDB", "AWS", "Docker"],
    image: "/images/project-vortex.png",
    liveUrl: "https://machinary-one.vercel.app/",
    repoUrl: null,
    featured: true,
  },
  {
    id: "appointments",
    number: "02",
    title: "APPOINTMENTS",
    category: "Django · PostgreSQL",
    year: "2025",
    blurb: "Role-based booking system with secure access control and optimized scheduling.",
    stack: ["Django", "Python", "PostgreSQL"],
    image: "/images/project-appointments.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/Appoinment-Management-System",
  },
  {
    id: "security",
    number: "03",
    title: "API SECURITY LAB",
    category: "VAPT · API Security",
    year: "2024",
    blurb: "Endpoint discovery, auth testing, and hardening recommendations for APIs.",
    stack: ["Burp Suite", "OWASP ZAP", "Postman"],
    image: "/images/project-security.png",
    liveUrl: null,
    repoUrl:
      "https://github.com/DHARSHAN-PARAMASIVAN/Vulnerability-Assessment-and-Penetration-Testing-on-API",
  },
  {
    id: "grievances",
    number: "04",
    title: "GRIEVANCES CONNECT",
    category: "Full-stack portal",
    year: "2025",
    blurb: "Citizen grievance portal for submitting, tracking, and resolving complaints.",
    stack: ["Web", "Full-stack"],
    image: "/images/project-fullstack.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/Grievances-Connect",
  },
  {
    id: "grievances-portal",
    number: "05",
    title: "GRIEVANCES PORTAL",
    category: "Portal",
    year: "2025",
    blurb: "Personal grievances portal implementation and workflow tooling.",
    stack: ["Web", "Full-stack"],
    image: "/images/visual-build.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/Grievances_Portal_Mine",
  },
  {
    id: "study-sync",
    number: "06",
    title: "STUDY SYNC",
    category: "Learning platform",
    year: "2025",
    blurb: "Study collaboration and learning workflow platform.",
    stack: ["Web", "Product"],
    image: "/images/visual-verify.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/Study-Sync",
  },
  {
    id: "cinehub",
    number: "07",
    title: "CINEHUB",
    category: "Entertainment",
    year: "2025",
    blurb: "Movie and entertainment discovery experience.",
    stack: ["Web", "UI"],
    image: "/images/project-qa.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/CineHub",
  },
  {
    id: "skill-sync",
    number: "08",
    title: "SKILL SYNC AI",
    category: "AI · Skills",
    year: "2025",
    blurb: "AI-assisted skill matching and development workflows.",
    stack: ["AI", "Full-stack"],
    image: "/images/visual-ship.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/Skill-Sync-AI",
  },
  {
    id: "smart-allocation",
    number: "09",
    title: "SMART ALLOCATION",
    category: "PM Internship Scheme",
    year: "2025",
    blurb: "Smart allocation engine for the PM Internship Scheme.",
    stack: ["Algorithms", "Full-stack"],
    image: "/images/visual-secure.png",
    liveUrl: null,
    repoUrl:
      "https://github.com/DHARSHAN-PARAMASIVAN/Smart-Allocation-Engine-for-PM-Internship-Scheme-1",
  },
  {
    id: "baby-monitoring",
    number: "10",
    title: "BABY MONITORING",
    category: "IoT · Monitoring",
    year: "2024",
    blurb: "Monitoring system focused on real-time alerts and care workflows.",
    stack: ["IoT", "Monitoring"],
    image: "/images/project-iot.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/Baby-Monitoring-System",
  },
  {
    id: "coffee",
    number: "11",
    title: "THE COFFEE STORY",
    category: "Django reviews",
    year: "2024",
    blurb: "Review website built with the Django framework.",
    stack: ["Django", "Python"],
    image: "/images/project-appointments.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/THE-COFFEE-STORY",
  },
  {
    id: "code-for-life",
    number: "12",
    title: "CODE FOR LIFE",
    category: "Challenge",
    year: "2024",
    blurb: "Completed Code For Life programming challenge tasks.",
    stack: ["Programming"],
    image: "/images/project-automation.png",
    liveUrl: null,
    repoUrl: "https://github.com/DHARSHAN-PARAMASIVAN/Code-For-Life",
  },
];

export const journey = [
  {
    year: "2025",
    org: "Fulcrum Technologies",
    role: "Software Tester Intern",
    focus: "Selenium · Cucumber · Automation",
    highlight: "40% testing-time reduction",
  },
  {
    year: "2025",
    org: "Pinsphere Solutions",
    role: "Full-Stack Developer Intern",
    focus: "Django · PostgreSQL · REST APIs",
    highlight: "25% backend performance improvement",
  },
  {
    year: "2026",
    org: "VortexIoT",
    role: "Industrial IoT Platform",
    focus: "Next.js · FastAPI · Kafka · AWS",
    highlight: "Live production deployment",
  },
];

export const skills = [
  "JAVA",
  "PYTHON",
  "JAVASCRIPT",
  "REACT",
  "NEXT.JS",
  "DJANGO",
  "FASTAPI",
  "POSTGRESQL",
  "MONGODB",
  "KAFKA",
  "AWS",
  "DOCKER",
  "SELENIUM",
  "CUCUMBER",
  "BURP SUITE",
  "OWASP ZAP",
  "JMETER",
  "GIT",
];

export const interests = [
  "Full-stack engineering",
  "Cloud",
  "Cybersecurity",
  "QA automation",
  "Data",
  "IoT",
  "AI",
];
