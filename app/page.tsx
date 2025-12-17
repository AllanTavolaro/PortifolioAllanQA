"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence
} from "framer-motion";
import {
  Terminal,
  Cpu,
  Code2,
  Database,
  TestTube2,
  ShieldCheck,
  Zap,
  Globe,
  Server,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  ExternalLink,
  Download
} from "lucide-react";

// --- Components ---

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-purple-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-2 text-cyan-400 font-mono text-sm tracking-widest uppercase">
        <span className="w-8 h-[1px] bg-cyan-500"></span>
        {subtitle}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
        {title}
      </h2>
    </div>
  );
};

const SkillCard = ({ icon: Icon, title, skills }: { icon: any, title: string, skills: string[] }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/30 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-4 font-mono">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-md bg-zinc-800/80 text-xs font-mono text-zinc-400 border border-zinc-700/50 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ title, desc, tech, type, link }: { title: string, desc: string, tech: string[], type: string, link?: string }) => {
  const CardContent = () => (
    <div className="group relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/30 h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      <div className="relative z-20 p-8 h-full flex flex-col justify-between min-h-[400px]">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              {type}
            </div>
            <ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
          </div>

          <h3 className="text-3xl font-bold mb-3 font-mono text-white group-hover:text-cyan-200 transition-colors">
            {title}
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            {desc}
          </p>
        </div>

        <div>
          <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent mb-6" />
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <div key={t} className="flex items-center gap-1 text-xs font-mono text-zinc-500">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.01 }}
        className="block h-full cursor-pointer"
      >
        <CardContent />
      </motion.a>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.01 }} className="h-full">
      <CardContent />
    </motion.div>
  );
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeSection, setActiveSection] = useState("home");

  // Parallax / Mouse effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left z-50 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      />

      {/* Dynamic Background Noise/Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url('${process.env.NODE_ENV === "production" ? "/PortifolioAllanQA" : ""}/noise.svg')`
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div
          className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-6 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-xl font-bold tracking-tighter">
            <HexagonIcon className="text-cyan-500 w-6 h-6 animate-pulse" />
            <span>Allan<span className="text-cyan-500">.QA</span></span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-mono text-zinc-400">
            {['Início', 'Projetos', 'Habilidades', 'Contato'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="hover:text-cyan-400 transition-colors uppercase tracking-widest relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <a href="#contato" className="px-4 py-2 text-xs font-mono font-bold bg-zinc-900 border border-zinc-700 hover:border-cyan-500 text-white rounded hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all">
            INICIAR_CONTATO
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SISTEMA ONLINE // V2.0.24
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 md:mb-6">
              ALLAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                TAVOLARO
              </span>
            </h1>

            <p className="text-base md:text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed font-light">
              <strong className="text-white">QA Engineer Pleno</strong> & <strong className="text-white">Arquiteto de Automação</strong> criando sistemas de validação de alta performance e infraestrutura escalável de testes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto px-4 sm:px-0">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projetos"
                className="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
              >
                <Terminal className="w-5 h-5" />
                VER_PROJETOS
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/AllanTavolaro"
                target="_blank"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                PERFIL_GITHUB
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Abstract Tech Globe/Shape */}
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-10 border border-zinc-700/50 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-20 border border-dashed border-cyan-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 shadow-2xl relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded bg-cyan-500/10 flex items-center justify-center">
                      <Code2 className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="h-2 w-24 bg-zinc-700 rounded mb-1" />
                      <div className="h-2 w-16 bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2 font-mono text-xs text-green-400">
                    <p>{'>'} const qa = new QA_Engineer();</p>
                    <p>{'>'} qa.experiencia = "Pleno";</p>
                    <p>{'>'} qa.stack = ["C#", "Cypress", "PW"];</p>
                    <p>{'>'} qa.status = "Disponivel";</p>
                    <p className="animate-pulse">{'>'} _</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 md:py-32 relative text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <SectionTitle title="Log de Missões" subtitle="Experiência Profissional" />

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="relative z-10 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl max-w-2xl mx-auto text-left hover:border-purple-500/50 transition-colors shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <ShieldCheck className="w-20 h-20" />
              </div>
              <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-mono rounded mb-4 border border-purple-500/30">
                ATIVO AGORA
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">QA Engineer</h3>
              <p className="text-cyan-400 font-mono mb-4">@ Mutant</p>

              <ul className="space-y-3 text-zinc-400 text-sm">
                <li className="flex gap-3">
                  <span className="text-purple-500">▹</span>
                  Estratégias em testes automatizados, testes manuais e criação de cenários de teste.
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500">▹</span>
                  Desenvolvimento de ferramentas internas em C# para mineração de dados (Caça Massa).
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500">▹</span>
                  Validação de APIs mantendo verificações de qualidade com 99.9% de uptime.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 md:py-32 bg-zinc-900/20 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle title="Módulos Implantados" subtitle="Projetos em Destaque" />

          <div className="grid md:grid-cols-2 gap-8 justify-center">
            <ProjectCard
              title="Caça_Massa.exe"
              desc="Aplicação desktop de alta performance construída em C# WPF para consultas e processamento massivo de dados. Possui operações multi-thread e capacidades de exportação."
              tech={["C#", "WPF", ".NET 8", "SQL"]}
              type="Desktop App"
              link="https://www.linkedin.com/feed/update/urn:li:activity:7388659499882082304/"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Arquitetura Técnica" subtitle="Capacidades do Sistema" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard
              icon={Code2}
              title="Linguagens"
              skills={["C#", "TypeScript", "JavaScript", "Python", "SQL"]}
            />
            <SkillCard
              icon={TestTube2}
              title="Automação"
              skills={["Cypress", "Playwright", "Selenium", "K6", "JMeter"]}
            />
            <SkillCard
              icon={Server}
              title="Backend & API"
              skills={["Node.js", ".NET", "REST", "GraphQL", "Postman"]}
            />
            <SkillCard
              icon={Zap}
              title="Ferramentas"
              skills={["Git", "Docker", "Jenkins", "Azure DevOps", "Jira"]}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 md:py-32 relative overflow-hidden">
        {/* Decorative background for contact */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10" />

        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-black border border-zinc-800 shadow-[0_0_50px_rgba(6,182,212,0.1)]"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono text-white">PRONTO PARA COLABORAR?</h2>
            <p className="text-base md:text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
              Inicialize um canal de comunicação para discutir estratégias de automação, cenários de teste e engenharia de qualidade.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:allantavolaro@hotmail.com"
                className="group relative px-8 py-4 bg-cyan-500 rounded-lg font-bold text-black overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="w-5 h-5" /> ENVIAR_EMAIL
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </a>

              <a
                href="https://www.linkedin.com/in/allan--tavolaro/"
                target="_blank"
                className="group px-8 py-4 bg-zinc-900 border border-zinc-700 rounded-lg font-bold text-white hover:border-cyan-500 transition-colors flex items-center justify-center gap-2"
              >
                <Linkedin className="w-5 h-5" /> LINKEDIN
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-900 text-center text-zinc-600 font-mono text-xs">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Terminal className="w-4 h-4" />
        </div>
        <p>&copy; 2025 Allan Tavolaro. Todos os sistemas operacionais.</p>
      </footer>

    </div>
  );
}

// Simple Hexagon Icon Component since Lucide might not have a filled one
const HexagonIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.9 12.21 21.95 12 21.95C11.79 21.95 11.59 21.9 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.1 11.79 2.05 12 2.05C12.21 2.05 12.41 2.1 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
  </svg>
);