import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  FlaskConical, 
  Globe, 
  Send,
  CheckCircle2,
  Plus,
  FlaskConical as Flask,
  Droplets,
  Leaf
} from 'lucide-react';
import { 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { cn, formatTimeGreeting } from '../lib/utils';
import { 
  SKILLS, 
  EXPERTISE, 
  WORK_EXPERIENCE, 
  EDUCATION,
  CERTIFICATIONS
} from '../constants';

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode; subtitle?: string; light?: boolean }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "text-4xl md:text-5xl font-serif font-bold mb-4",
        light ? "text-white" : "text-brand-navy"
      )}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-brand-gold font-medium uppercase tracking-widest text-sm"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-20 h-1 bg-brand-gold mt-4" />
  </div>
);

const ExpertiseCard = ({ title, icon: Icon, imageSeed }: { title: string; icon: any; imageSeed: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center group"
  >
    <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-slate-50">
      <img 
        src={`https://picsum.photos/seed/${imageSeed}/400/400?blur=1`} 
        alt={title}
        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-gold">
          <Icon size={24} />
        </div>
      </div>
    </div>
    <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-gold transition-colors">{title}</h3>
  </motion.div>
);

const TimelineItem = ({ exp, index }: { exp: any; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-12 border-l-2 border-brand-gold/30 last:pb-0"
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand-gold border-4 border-white shadow-sm" />
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
      <h3 className="text-2xl font-bold text-brand-navy">{exp.company}</h3>
      <span className="text-brand-gold font-mono text-sm font-medium bg-brand-gold/10 px-3 py-1 rounded-full">
        {exp.period}
      </span>
    </div>
    <p className="text-lg font-medium text-brand-gold mb-4 italic">{exp.role}</p>
    <ul className="space-y-2">
      {exp.responsibilities.map((resp: string, idx: number) => (
        <li key={idx} className="flex items-start gap-3 text-slate-600">
          <CheckCircle2 size={18} className="text-brand-gold mt-1 shrink-0" />
          <span>{resp}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function Home() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="font-sans bg-[#fdfcf8]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
        {/* Artistic Splatters */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-gold/10 rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-navy/5 rounded-full blur-[100px] mix-blend-multiply" />
          <div className="absolute top-20 right-[40%] w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-40 left-[30%] w-48 h-48 bg-brand-navy/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-navy mb-6 leading-tight">
              Innovating <br />
              <span className="text-brand-gold italic">Garments</span> <br />
              Dyeing & Washing
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-lg leading-relaxed border-l-4 border-brand-gold pl-6">
              I'm a Textile Engineer Specialized in Garments Dyeing & Washing, driving sustainable innovation in the fashion industry.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/certifications" className="bg-gradient-to-r from-brand-navy to-[#1e3a8a] text-white px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-brand-navy/30 transition-all flex items-center gap-2 group">
                View My Work <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#contact" className="bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-brand-navy px-10 py-4 rounded-xl font-bold hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all shadow-sm">
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-[12px] border-white transform rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[3/4]">
              <img 
                src="/api/profile-image" 
                alt="Md Naimur Rashid"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/professional-man/800/1000";
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="bg-white text-brand-navy p-4 rounded-full cursor-pointer shadow-xl hover:scale-110 transition-transform">
                  <Plus size={24} />
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      formData.append('category', 'profile');
                      try {
                        const res = await fetch('/api/upload', { method: 'POST', body: formData });
                        if (res.ok) window.location.reload();
                      } catch (err) {
                        alert('Upload failed');
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-navy/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* About & Expertise Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <SectionHeading subtitle="About Me">Driving Innovation in Textile Dyeing</SectionHeading>
              <div className="text-lg text-slate-600 leading-relaxed mb-10">
                <p className="text-3xl font-serif font-bold text-brand-navy mb-6">
                  <span className="text-brand-gold">3+</span> Years of Expertise in Garment Processing
                </p>
                <p className="mb-6">
                  Specializing in sustainable wet processing and industrial optimization. I deliver high-quality fashion effects while minimizing environmental impact through cutting-edge R&D.
                </p>
                <button className="bg-brand-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-gold transition-all shadow-lg">
                  Read More
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-bold text-brand-navy">My Expertise</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <ExpertiseCard title="Garment Dyeing" icon={Droplets} imageSeed="dyeing-art" />
                <ExpertiseCard title="Garment Washing" icon={Flask} imageSeed="washing-art" />
                <ExpertiseCard title="Sustainability" icon={Leaf} imageSeed="eco-art" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Projects */}
      <section id="projects" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Portfolio">Highlighted Projects</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Eco-Friendly Dyeing Techniques", seed: "eco-dye", desc: "Sustainable natural mordant development." },
              { title: "Vintage Wash Denim Collection", seed: "denim-wash", desc: "Advanced enzyme and ozone wash effects." },
              { title: "Tie-Dye Design Series", seed: "tie-dye", desc: "Creative manual dyeing for high-fashion." }
            ].map((project, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${project.seed}/600/400`} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-brand-navy mb-2">{project.title}</h4>
                  <p className="text-sm text-slate-500">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Project */}
      <section id="projects" className="py-24 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-gold font-mono uppercase tracking-widest mb-4">Featured Achievement</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Industrial-Scale Natural Mordant Development</h2>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 mb-8">
                <p className="text-slate-300 leading-relaxed italic">"A BUET Certified research project focused on developing sustainable natural mordants to replace synthetic chemicals in the textile dyeing process."</p>
              </div>
              <div className="space-y-4">
                {['Research Phase', 'Development', 'Implementation'].map((phase, i) => (
                  <details key={phase} className="group bg-white/5 rounded-xl border border-white/10">
                    <summary className="p-4 cursor-pointer flex justify-between items-center font-bold text-brand-gold">
                      {phase}
                      <ChevronRight className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-4 pt-0 text-slate-400 text-sm">Detailed analysis and execution of the {phase.toLowerCase()} stage, ensuring compliance with industrial standards and environmental goals.</div>
                  </details>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-brand-navy text-xl font-bold mb-6 text-center">Impact Analysis</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: 'Natural Mordant', value: 65 }, { name: 'Synthetic Reduction', value: 35 }]} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      <Cell fill="#C5A059" />
                      <Cell fill="#0A192F" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-gold" />
                  <span className="text-xs font-bold text-slate-600">Sustainability Increase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-navy" />
                  <span className="text-xs font-bold text-slate-600">Chemical Reduction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Work Experience">Professional Timeline</SectionHeading>
          <div className="max-w-4xl mx-auto">
            {WORK_EXPERIENCE.map((exp, idx) => <TimelineItem key={idx} exp={exp} index={idx} />)}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Academic Background">Education</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            {EDUCATION.map((edu, idx) => (
              <motion.div key={idx} whileHover={{ x: 10 }} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex gap-6">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy">{edu.degree}</h4>
                  <p className="text-brand-gold font-medium">{edu.institution}</p>
                  <div className="flex gap-4 mt-2 text-sm text-slate-500 font-mono">
                    <span>{edu.year}</span>
                    {edu.result && <span>• {edu.result}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Research */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Continuous Learning">Training & Research</SectionHeading>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                title: "Academic Internship – Anowara Knit Composite Ltd.",
                period: "2023 (2 Months)",
                content: "Focused on industrial wet processing, quality control, and production management in a composite knit environment. Gained hands-on experience with dyeing machines and finishing processes."
              },
              {
                title: "Research Experience – Elsevier",
                period: "2021 – 2023 (2 Years)",
                content: "Conducted extensive research on sustainable textile materials and processes. Contributed to data analysis and documentation for high-impact industrial research projects."
              }
            ].map((item, idx) => (
              <details key={idx} className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <summary className="p-6 cursor-pointer flex justify-between items-center font-bold text-brand-navy list-none">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold">
                      <FlaskConical size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg">{item.title}</h4>
                      <p className="text-xs text-brand-gold font-mono uppercase tracking-widest">{item.period}</p>
                    </div>
                  </div>
                  <ChevronRight className="group-open:rotate-90 transition-transform text-slate-400" />
                </summary>
                <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-200/50 mt-2">
                  {item.content}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Language & Career Info */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <SectionHeading subtitle="Communication">Language Proficiency</SectionHeading>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { name: "Bangla", level: 100, desc: "Native", color: "#C5A059" },
                  { name: "English", level: 85, desc: "Professional", color: "#0A192F" }
                ].map((lang) => (
                  <motion.div 
                    key={lang.name}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center group"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <motion.circle 
                          cx="50" cy="50" r="45" 
                          fill="none" stroke={lang.color} strokeWidth="8" 
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          whileInView={{ strokeDashoffset: 283 - (283 * lang.level) / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          strokeLinecap="round"
                          className="origin-center -rotate-90"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-brand-navy">{lang.level}%</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-brand-navy">{lang.name}</h4>
                    <p className="text-xs font-bold text-brand-gold uppercase tracking-widest">{lang.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading subtitle="Availability">Career Information</SectionHeading>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Looking For", value: "Top-Level Position", icon: Briefcase },
                  { label: "Available For", value: "Full Time", icon: CheckCircle2 },
                  { label: "Preferred Sector", value: "Textile / Garments / Dyeing Factory", icon: Globe },
                  { label: "Preferred Location", value: "Anywhere in Bangladesh", icon: MapPin }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-bold text-brand-navy">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Endorsements">Professional References</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Md. Shahabuddin",
                role: "Assistant Manager, Anowara Knit Composite Ltd.",
                phone: "01754571864",
                email: "shahabuddinmon1441@gmail.com"
              },
              {
                name: "Md Raijul Islam",
                role: "Lecturer, BGMEA University of Fashion Technology",
                phone: "01841129449",
                email: "raijul@buft.edu.bd"
              }
            ].map((ref, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start"
              >
                <div className="w-20 h-20 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold text-3xl font-serif font-bold shrink-0">
                  {ref.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-navy mb-1">{ref.name}</h4>
                  <p className="text-brand-gold font-medium text-sm mb-4">{ref.role}</p>
                  <div className="space-y-2">
                    <a href={`tel:${ref.phone}`} className="flex items-center gap-2 text-slate-500 hover:text-brand-gold transition-colors text-sm">
                      <Phone size={14} /> {ref.phone}
                    </a>
                    <a href={`mailto:${ref.email}`} className="flex items-center gap-2 text-slate-500 hover:text-brand-gold transition-colors text-sm">
                      <Mail size={14} /> {ref.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Let's Work Together to Create <span className="text-brand-gold">Sustainable Textiles!</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#contact" className="bg-brand-gold text-brand-navy px-10 py-4 rounded-xl font-bold hover:bg-white transition-all shadow-xl">
              Get in Touch
            </a>
            <a href="/api/download-cv" className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-navy transition-all">
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <SectionHeading subtitle="Get In Touch">Let's Connect</SectionHeading>
              <p className="text-lg text-slate-600 mb-12">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-gold"><Phone size={24} /></div>
                  <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Call Me</p><p className="text-lg font-bold text-brand-navy">01984154464</p></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-gold"><Mail size={24} /></div>
                  <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Me</p><p className="text-lg font-bold text-brand-navy">mdnaimurrashid752@gmail.com</p></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-gold"><MapPin size={24} /></div>
                  <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p><p className="text-lg font-bold text-brand-navy">Savar, Dhaka, Bangladesh</p></div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold outline-none" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold outline-none" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy">Subject</label>
                  <input required type="text" placeholder="Project Inquiry" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold outline-none" value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy">Message</label>
                  <textarea required rows={4} placeholder="How can I help you?" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold outline-none resize-none" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} />
                </div>
                <button disabled={isSubmitting} className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold hover:bg-brand-gold transition-all flex items-center justify-center gap-2 group disabled:opacity-50">
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                </button>
                {submitStatus === 'success' && <p className="text-emerald-600 text-center font-medium">Message sent successfully!</p>}
                {submitStatus === 'error' && <p className="text-rose-600 text-center font-medium">Failed to send message. Please try again.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
