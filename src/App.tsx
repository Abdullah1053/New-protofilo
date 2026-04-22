import { GitHubCalendar } from "react-github-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Globe, 
  Smartphone, 
  Terminal,
  Database,
  Phone,
  Activity,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";

const projects = [
  {
    title: "E-Commerce Platform (Doing)",
    description: "Contributed to the development of a scalable e-commerce platform with optimized performance.",
    fullDescription: "Contributed to the development of a scalable e-commerce platform. Developed dynamic frontend components and built and maintained backend features. Integrated payment systems and order management workflows. Optimized database queries and improved overall system performance.",
    features: [
      "Dynamic frontend component development",
      "Backend feature maintenance & scaling",
      "Payment system & order workflow integration",
      "Database query & performance optimization"
    ],
    tech: ["Laravel", "Vue.js", "PostgreSQL", "MySQL"],
    link: "https://github.com/Abdullah1053",
    type: "Full Stack"
  },
  {
    title: "On-Demand Delivery Platform",
    description: "Scaled delivery architecture with real-time tracking and AI-ready automation workflows.",
    fullDescription: "Designed and developed a scalable delivery platform architecture including admin dashboards and mobile apps, supporting real-time order tracking and system integrations. Designed systems that can be extended to support AI-driven decision-making and automation workflows.",
    features: [
      "Real-time order tracking & dashboards",
      "Mobile app development (Customer/Driver)",
      "AI-driven decision-making integration",
      "Automation workflow design"
    ],
    tech: ["Laravel", "MySQL", "Flutter"],
    link: "https://github.com/Abdullah1053",
    type: "Full Stack / Mobile"
  },
  {
    title: "Webhook-Based Integration Platform",
    description: "Orchestrated third-party delivery integrations via secure and scalable webhook architectures.",
    fullDescription: "Designed and developed a platform enabling third-party delivery services to integrate via webhooks. Built a full onboarding system for delivery providers (registration, API setup, and configuration). Implemented a review and approval workflow to validate integrations before publishing. Developed secure and scalable webhook handling for order dispatching and status updates.",
    features: [
      "Third-party webhook architecture",
      "Provider onboarding & API setup system",
      "Review & approval validation workflows",
      "Scalable order dispatching & updates"
    ],
    tech: ["Laravel", "Vue.js", "MySQL"],
    link: "https://github.com/Abdullah1053",
    type: "Backend / Integration"
  }
];

const skillCategories = [
  {
    name: "Frontend",
    icon: <Globe className="w-5 h-5" />,
    skills: ["Blade", "Next.js", "Vue.js", "Tailwind CSS", "Responsive UI"]
  },
  {
    name: "Backend",
    icon: <Terminal className="w-5 h-5" />,
    skills: ["Laravel", "Node.js", "RESTful APIs", "Webhook Architectures", "Real-time Systems"]
  },
  {
    name: "Mobile & AI",
    icon: <Smartphone className="w-5 h-5" />,
    skills: ["Flutter", "Dart", "AI/ML Integration", "Model Deployment", "Data-driven Apps"]
  },
  {
    name: "DB & DevOps",
    icon: <Database className="w-5 h-5" />,
    skills: ["PostgreSQL", "MySQL", "Nginx/Caddy", "PM2/Docker", "CI/CD Pipelines", "Linux Servers"]
  }
];

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    fullDescription: string;
    features: string[];
    tech: string[];
    link: string;
    type: string;
  };
  i: number;
  key?: any;
}

const ProjectCard = ({ project, i }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all flex flex-col"
    >
      <div className="p-8 md:p-12 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/60">
            {project.type}
          </span>
          <a href={project.link} target="_blank" className="p-3 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <h4 className="text-3xl font-bold mb-4">{project.title}</h4>
        
        <div className="relative">
          <p className={`text-white/60 mb-6 transition-all duration-300 ${isExpanded ? "" : "line-clamp-2"}`}>
            {isExpanded ? project.fullDescription : project.description}
          </p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-8">
                  <h5 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Key Features</h5>
                  <ul className="space-y-3">
                    {project.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.tech.map((t: string) => (
            <span key={t} className="text-xs font-mono text-white/40">{t}</span>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 bg-white/5 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
      >
        {isExpanded ? (
          <>Show Less <ChevronUp className="w-4 h-4" /></>
        ) : (
          <>Read More <ChevronDown className="w-4 h-4" /></>
        )}
      </button>
    </motion.div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter"
          >
            ABDULLAH<span className="text-orange-500">.</span>
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
            {["About", "Projects", "Skills", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            href="https://drive.google.com/file/d/1XnoBuRhbLahyD9ICzNYvONwJczwJ4UYB/view?usp=drivesdk"
            target="_blank"
            className="px-5 py-2 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Resume
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-orange-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">Software Engineer</h2>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              ABDULLAH <br />
              <span className="text-white/40">ADEMI</span>
            </h1>
            <p className="max-w-xl text-lg text-white/60 leading-relaxed mb-10">
              Full-Stack Software Engineer with experience building scalable web applications, APIs, and real-time systems using Laravel, Vue.js, and modern web technologies. Expert in designing production-ready architectures and automation workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-orange-500 transition-colors">
                View Projects
              </a>
              <a href="#contact" className="px-8 py-4 border border-white/20 font-bold rounded-full hover:bg-white/5 transition-colors">
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-orange-500 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 tracking-tight">Crafting digital experiences with precision.</h3>
            <p className="text-white/60 leading-relaxed mb-6">
              Full-Stack Software Engineer with expertise in designing production-ready architectures, managing deployments, and collaborating across teams to deliver reliable, high-performance systems.
            </p>
            <p className="text-white/60 leading-relaxed">
              Strong focus on AI-driven systems and backend infrastructure, with extensive experience integrating external services, automation workflows, and scalable data-driven applications.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Experience", val: "5+ Years" },
              { label: "Projects", val: "20+ Completed" },
              { label: "Frameworks", val: "Vue, Laravel, Flutter" },
              { label: "Location", val: "Remote / Yemen" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">{stat.label}</div>
                <div className="text-lg font-bold">{stat.val}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Contributions Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-mono text-orange-500 tracking-[0.3em] uppercase mb-1">Open Source</h2>
              <h3 className="text-3xl font-bold tracking-tight">GitHub Contributions</h3>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-black border border-white/10 rounded-3xl overflow-hidden flex justify-center"
          >
            <div className="w-full overflow-x-auto flex justify-center py-4">
              <GitHubCalendar 
                username="Abdullah1053" 
                colorScheme="dark"
                theme={{
                  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  dark: ['#161b22', '#451a03', '#9a3412', '#ea580c', '#f97316'],
                }}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-sm font-mono text-orange-500 tracking-[0.3em] uppercase mb-4">Selected Work</h2>
              <h3 className="text-5xl font-bold tracking-tight">Featured Projects</h3>
            </div>
            <a href="https://github.com/Abdullah1053" target="_blank" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">
              View all on GitHub <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-sm font-mono text-orange-500 tracking-[0.3em] uppercase mb-4">Expertise</h2>
            <h3 className="text-5xl font-bold tracking-tight">Technical Arsenal</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className="p-8 bg-black border border-white/10 rounded-3xl hover:border-orange-500/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                  {cat.icon}
                </div>
                <h4 className="text-xl font-bold mb-6 group-hover:text-orange-500 transition-colors">{cat.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span 
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i * 0.1) + (j * 0.05) + 0.3 }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/5 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-orange-500 text-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-sm font-mono tracking-[0.3em] uppercase mb-8">Let's work together</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
            HAVE A PROJECT IN MIND?
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:abdullah.mughni1999@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" /> Email Me
            </a>
            <a href="tel:+967771882350" className="flex items-center gap-3 px-8 py-4 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition-all">
              <Phone className="w-5 h-5" /> Call Me
            </a>
          </div>

          <div className="mt-24 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-sm font-bold tracking-tighter">ABDULLAH ADEMI © 2026</div>
            <div className="flex gap-8">
              <a href="https://github.com/Abdullah1053" target="_blank" className="hover:opacity-60 transition-opacity"><Github className="w-6 h-6" /></a>
              <a href="https://linkedin.com/in/abdullah-ademi-788767257" target="_blank" className="hover:opacity-60 transition-opacity"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
