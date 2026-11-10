export interface IdentityProfile {
  name: string;
  monogram: string;
  title: string;
  shortTitle: string;
  location: string;
  email: string;
  phone: string;
  githubUrl: string;
  githubUsername: string;
  linkedinUrl: string;
  resumeUrl: string;
  summary: string;
}

export interface HeroMetric {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface ExperienceBullet {
  id: string;
  text: string;
  highlights: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  contextLabel: string;
  bullets: ExperienceBullet[];
}

export interface CaseStudyBullet {
  id: string;
  text: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  headlineMetric: string;
  summary: string;
  bullets: CaseStudyBullet[];
  tech: string[];
  link: string;
}

export interface SkillCategory {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  items: string[];
}

export interface EducationCertEntry {
  id: string;
  type: "degree" | "certification";
  title: string;
  institution: string;
  period: string;
  distinction?: string;
  rawText: string;
}

export interface CareerKnowledgeBase {
  identity: IdentityProfile;
  heroMetrics: HeroMetric[];
  experience: ExperienceEntry[];
  projects: CaseStudy[];
  skills: SkillCategory[];
  educationAndCerts: EducationCertEntry[];
}

export const careerData: CareerKnowledgeBase = {
  identity: {
    name: "Abdullah Ademi",
    monogram: "AA",
    title: "Full-Stack Software Engineer & Cloud Systems Architect",
    shortTitle: "Systems Architect & Full-Stack Engineer",
    location: "Sana'a, Yemen / Remote",
    email: "abdullah.mughni1999@gmail.com",
    phone: "+967771882350",
    githubUrl: "https://github.com/Abdullah1053",
    githubUsername: "Abdullah1053",
    linkedinUrl: "https://linkedin.com/in/abdullah-ademi-788767257",
    resumeUrl:
      "https://drive.google.com/file/d/15K5aMWlpf0EJ2g3wjfjmWt19D5zyISLM/view?usp=drive_link",
    summary:
      "Full-Stack Software Engineer & Cloud Systems Architect delivering high-availability AWS infrastructure, sub-80ms indexed search pipelines, OAuth/Sanctum security layers, and 10+ interconnected production web and mobile platforms.",
  },

  heroMetrics: [
    {
      id: "metric_uptime",
      value: "99.9%",
      label: "AWS Cloud Uptime",
      detail: "EC2, RDS MySQL & S3 automated backups",
    },
    {
      id: "metric_latency",
      value: "<80ms",
      label: "Search Latency",
      detail: "Redis caching + SQL schema indexing",
    },
    {
      id: "metric_apps",
      value: "10+",
      label: "Production Systems",
      detail: "Interconnected web & mobile platforms",
    },
    {
      id: "metric_tenure",
      value: "Mar 2023 – Present",
      label: "Lead Engineering",
      detail: "Doing Platform",
    },
  ],

  experience: [
    {
      id: "exp_doing_platform",
      company: "Doing Platform",
      role: "Full-Stack Software Engineer & Cloud Systems Architect",
      period: "Mar 2023 - Present",
      contextLabel: "Doing Platform (Mar 2023 - Present)",
      bullets: [
        {
          id: "cb_exp_0_0",
          text: "Configured and managed AWS cloud environments (EC2, RDS MySQL, S3), ensuring 99.9% uptime, scalability, and automated data backups.",
          highlights: ["AWS EC2", "RDS MySQL", "AWS S3", "99.9% Uptime"],
        },
        {
          id: "cb_exp_0_1",
          text: "Developed dynamic, responsive user interfaces using ReactJS, integrating RESTful backend endpoints to optimize state management and client-side performance.",
          highlights: ["ReactJS", "RESTful APIs", "State Optimization"],
        },
        {
          id: "cb_exp_0_2",
          text: "Secured backend services and APIs using token-based authentication (OAuth, Laravel Sanctum) and implemented role-based access control with AWS IAM.",
          highlights: ["OAuth", "Laravel Sanctum", "AWS IAM RBAC"],
        },
        {
          id: "cb_exp_0_3",
          text: "Delivered and maintained 10+ production web and mobile applications, supporting multiple interconnected systems by contributing across backend, frontend, API, database, and mobile development.",
          highlights: ["10+ Production Apps", "Full-Stack & Mobile"],
        },
        {
          id: "cb_exp_0_4",
          text: "Improved production system reliability and operational efficiency by optimizing database operations, resolving critical production issues, and strengthening deployment, monitoring, and maintenance workflows.",
          highlights: ["DB Optimization", "Monitoring & Reliability"],
        },
        {
          id: "cb_exp_0_5",
          text: "Accelerated end-to-end product delivery across web and mobile platforms by implementing reusable APIs, third-party integrations, automated workflows, and streamlined release processes for Android and iOS applications.",
          highlights: ["Reusable APIs", "Android & iOS Pipelines"],
        },
      ],
    },
  ],

  projects: [
    {
      id: "proj_doing_ecommerce",
      index: "01",
      title: "Doing Scalable E-Commerce Platform",
      subtitle: "Sub-80ms Search & Cloud-Native Commerce Engine",
      category: "Cloud Architecture / Full-Stack",
      headlineMetric: "<80ms Search Latency",
      summary:
        "High-throughput e-commerce architecture engineered with indexed MySQL/PostgreSQL schemas, Redis caching, TypeScript/Node.js & ReactJS/Next.js services, and containerized AWS deployments.",
      bullets: [
        {
          id: "cb_proj_0_0",
          text: "Optimized MySQL/PostgreSQL queries, schema indexing, and caching with Redis to achieve sub-80ms search latency.",
        },
        {
          id: "cb_proj_0_1",
          text: "Designed and implemented scalable APIs and backend services using modern TypeScript, Node.js, and ReactJS/Next.js.",
        },
        {
          id: "cb_proj_0_2",
          text: "Improved development and deployment workflows using containerization, process management, and AWS cloud deployment tools.",
        },
        {
          id: "cb_proj_0_3",
          text: "Participated in code reviews, Git-based collaboration, feature development, debugging, and production support.",
        },
      ],
      tech: [
        "TypeScript",
        "Node.js",
        "ReactJS",
        "Next.js",
        "MySQL",
        "PostgreSQL",
        "Redis",
        "Docker",
        "PM2",
        "AWS",
      ],
      link: "https://github.com/Abdullah1053",
    },
    {
      id: "proj_yalla_fast",
      index: "02",
      title: "Yalla Fast Platform",
      subtitle: "Omnichannel Logistics, Webhooks & App Store Delivery",
      category: "Backend / Mobile Release Pipeline",
      headlineMetric: "Web + Android + iOS",
      summary:
        "Production web and mobile platform powered by PHP Laravel backend logic and webhooks, direct AWS S3 media pipelines, AWS RDS persistence, and end-to-end Google Play & Apple App Store releases.",
      bullets: [
        {
          id: "cb_proj_1_0",
          text: "Built robust backend logic and webhooks using PHP Laravel, deploying media assets directly to AWS S3 and managing database instances via AWS RDS.",
        },
        {
          id: "cb_proj_1_1",
          text: "Worked with REST APIs and third-party integrations to connect mobile and web applications with backend services.",
        },
        {
          id: "cb_proj_1_2",
          text: "Supported application deployment, troubleshooting, maintenance, and production releases across web and mobile platforms.",
        },
        {
          id: "cb_proj_1_3",
          text: "Managed and supported mobile application releases and publishing workflows for Google Play Store and Apple App Store.",
        },
      ],
      tech: [
        "PHP",
        "Laravel",
        "AWS S3",
        "AWS RDS",
        "REST APIs",
        "Webhooks",
        "Google Play",
        "App Store",
      ],
      link: "https://github.com/Abdullah1053",
    },
    {
      id: "proj_webhook_delivery",
      index: "03",
      title: "Webhook-Based Delivery Integration Platform",
      subtitle: "Third-Party Provider Onboarding & Event Dispatching",
      category: "Backend / Integration Architecture",
      headlineMetric: "Real-Time Webhooks",
      summary:
        "Orchestrated third-party delivery provider onboarding, API setup, review/approval validation workflows, and high-throughput webhook dispatching in Laravel, Vue.js, and MySQL.",
      bullets: [
        {
          id: "proj_wh_0",
          text: "Built a full onboarding system for third-party delivery providers covering registration, API setup, and configuration.",
        },
        {
          id: "proj_wh_1",
          text: "Implemented a review and approval validation workflow to verify partner integrations prior to production publishing.",
        },
        {
          id: "proj_wh_2",
          text: "Developed secure and scalable webhook dispatching for real-time order routing and delivery status updates.",
        },
        {
          id: "proj_wh_3",
          text: "Delivered partner management interfaces and real-time operational visibility across Laravel, Vue.js, and MySQL.",
        },
      ],
      tech: [
        "Laravel",
        "Vue.js",
        "MySQL",
        "Webhook Architectures",
        "RESTful APIs",
        "Real-Time Systems",
      ],
      link: "https://github.com/Abdullah1053",
    },
  ],

  skills: [
    {
      id: "cb_skill_0",
      index: "01",
      name: "Languages",
      subtitle: "Core Systems & Web",
      items: [
        "PHP",
        "TypeScript",
        "JavaScript (ES6+)",
        "SQL",
        "Dart",
        "C++",
        "HTML5/CSS3",
      ],
    },
    {
      id: "cb_skill_1",
      index: "02",
      name: "Frameworks & Libraries",
      subtitle: "Full-Stack & Cross-Platform",
      items: [
        "Laravel",
        "ReactJS",
        "Next.js",
        "Node.js",
        "Express",
        "Vue.js",
        "Flutter",
        "TailwindCSS",
      ],
    },
    {
      id: "cb_skill_2",
      index: "03",
      name: "Databases & Caching",
      subtitle: "Persistence & Sub-80ms Indexing",
      items: [
        "MySQL",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "Query Optimization",
      ],
    },
    {
      id: "cb_skill_3",
      index: "04",
      name: "DevOps & Cloud",
      subtitle: "99.9% Uptime Infrastructure",
      items: [
        "AWS (EC2, S3, RDS, IAM)",
        "Docker",
        "CI/CD Pipelines",
        "Linux Server Administration",
        "Nginx",
        "Caddy",
        "PM2",
      ],
    },
    {
      id: "cb_skill_4",
      index: "05",
      name: "Architecture & Concepts",
      subtitle: "Security, Scale & Delivery",
      items: [
        "OAuth",
        "Token-based Auth (Sanctum/JWT)",
        "SSL/TLS",
        "AWS IAM",
        "RESTful APIs",
        "Webhook Architectures",
        "Real-Time Systems",
        "Microservices",
        "System Architecture",
        "Agile/Scrum",
        "Git Workflow",
      ],
    },
  ],

  educationAndCerts: [
    {
      id: "cb_edu_0",
      type: "degree",
      title: "Bachelor's Degree in Computer Science & Software Engineering",
      institution: "University of Science and Technology, Faculty of Computer Science",
      period: "Jan 2018 – Jan 2022",
      distinction: "Grade: Very Good",
      rawText:
        "Bachelor's Degree in Computer Science in Computer Science & Software Engineering (Jan 2018 - Jan 2022) — Grade: Very Good.",
    },
    {
      id: "cb_cert_0",
      type: "certification",
      title: "Full-Stack Web Development & System Architecture",
      institution: "Professional Certification",
      period: "2023",
      rawText:
        "Full-Stack Web Development & System Architecture (Professional Certification, 2023).",
    },
  ],
};

