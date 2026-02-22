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
  CERTIFICATIONS,
  RD_PROJECT,
  WASH_DEMOS
} from '../constants';

const SectionHeading = ({ children, subtitle, light = true }: { children: React.ReactNode; subtitle?: string; light?: boolean }) => (
  <div className="mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-4"
    >
      <div className="h-px w-12 bg-brand-gold" />
      <p className="text-brand-gold font-mono uppercase tracking-[0.3em] text-xs font-bold">
        {subtitle}
      </p>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={cn(
        "text-4xl md:text-6xl font-serif font-bold leading-tight",
        light ? "text-white" : "text-brand-navy"
      )}
    >
      {children}
    </motion.h2>
  </div>
);

const ExpertiseCard = ({ title, icon: Icon, desc }: { title: string; icon: any; desc: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-card p-10 rounded-[2.5rem] group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-brand-gold/10 transition-all duration-500" />
    <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-brand-navy transition-all duration-500 shadow-lg">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed mb-8 font-light">{desc}</p>
    <div className="h-1 w-0 bg-brand-gold group-hover:w-full transition-all duration-700" />
  </motion.div>
);

const WashDemoCard = ({ demo }: { demo: typeof WASH_DEMOS[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card rounded-[3rem] overflow-hidden group border border-white/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={demo.imageBefore} 
          alt={`${demo.title} Before`}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            isHovered ? "opacity-0" : "opacity-100"
          )}
        />
        <img 
          src={demo.imageAfter} 
          alt={`${demo.title} After`}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div className="glass-morphism px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-gold">
            {isHovered ? "After Effect" : "Raw Fabric"}
          </div>
        </div>
      </div>
      <div className="p-10">
        <p className="text-brand-gold font-mono text-xs uppercase tracking-[0.2em] mb-3">{demo.subtitle}</p>
        <h4 className="text-3xl font-serif font-bold text-white mb-4">{demo.title}</h4>
        <p className="text-slate-400 font-light leading-relaxed">{demo.description}</p>
      </div>
    </motion.div>
  );
};

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
    <div className="font-sans bg-brand-navy">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-brand-gold/20 rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
              x: [0, -30, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-accent/10 rounded-full blur-[120px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-12 bg-brand-gold" />
              <span className="text-brand-gold font-mono uppercase tracking-[0.4em] text-xs font-bold">
                {formatTimeGreeting()}, I'm
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-serif font-bold text-white mb-8 leading-[0.9] tracking-tighter">
              Md Naimur <br />
              <span className="text-gradient italic">Rashid</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-light">
              Executive – Washing | Textile Engineer | Sustainable Wet Processing Specialist. 
              Driving Innovation in Garment Washing, Sustainable Dyeing & Industrial Process Optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/certifications" className="bg-brand-gold text-brand-navy px-10 py-5 rounded-full font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 group shadow-2xl shadow-brand-gold/20">
                Explore Portfolio <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://wa.me/8801984154464" target="_blank" rel="noopener noreferrer" className="glass-morphism text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-3">
                Hire Me <Mail size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.1)] border border-white/10 aspect-[4/5] max-w-lg mx-auto">
              <img 
                src="/api/profile-image" 
                alt="Md Naimur Rashid"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/professional-man/800/1000";
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-60" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-10 left-10 glass-morphism p-6 rounded-2xl border-white/20"
              >
                <p className="text-brand-gold font-serif text-3xl font-bold">3+</p>
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Years of Excellence</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section - Bento Style */}
      <section id="expertise" className="py-32 bg-brand-navy relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Core Expertise">Mastering the Art of <br /> Textile Engineering</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
            {EXPERTISE.washing.slice(0, 3).map((item, i) => (
              <ExpertiseCard 
                key={i}
                title={item.name} 
                icon={i === 0 ? Droplets : i === 1 ? Flask : Leaf} 
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Wash Demos */}
      <section className="py-32 bg-brand-slate/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Interactive Demos">Visualizing the <br /> Transformation</SectionHeading>
          <div className="grid md:grid-cols-3 gap-10">
            {WASH_DEMOS.map((demo) => (
              <WashDemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Minimalist */}
      <section id="about" className="py-32 bg-brand-slate/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10">
                <img src="https://picsum.photos/seed/textile-lab/800/800" alt="Lab" className="w-full h-full object-cover opacity-50" />
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 glass-morphism rounded-3xl p-10 flex flex-col justify-center">
                <p className="text-brand-gold text-5xl font-serif font-bold mb-2">3.6</p>
                <p className="text-white/60 text-sm uppercase tracking-widest font-bold">BSc CGPA</p>
              </div>
            </div>
            
            <div>
              <SectionHeading subtitle="My Story">Driving Innovation in <br /> Sustainable Textiles</SectionHeading>
              <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-light">
                <p>
                  With a solid background in Textile Engineering and a focus on sustainable wet processing, 
                  I specialize in delivering high-quality fashion effects while minimizing environmental impact.
                </p>
                <p>
                  My career is built on a foundation of technical excellence, from mastering complex washing 
                  technologies to leading production for global brands. I am passionate about R&D and 
                  implementing cutting-edge solutions.
                </p>
                <div className="pt-8 flex gap-12">
                  <div>
                    <p className="text-white font-bold text-2xl mb-1">15+</p>
                    <p className="text-brand-gold text-xs uppercase tracking-widest">Projects</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-2xl mb-1">100%</p>
                    <p className="text-brand-gold text-xs uppercase tracking-widest">Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <SectionHeading subtitle="Portfolio">Highlighted Projects</SectionHeading>
            <Link to="/certifications" className="text-brand-gold font-bold flex items-center gap-2 hover:gap-4 transition-all mb-4">
              View All Work <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Natural Mordant Development", seed: "research", cat: "R&D" },
              { title: "Vintage Wash Denim", seed: "denim", cat: "Production" },
              { title: "Sustainable Dyeing", seed: "eco-dye", cat: "Innovation" }
            ].map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10"
              >
                <img src={`https://picsum.photos/seed/${p.seed}/800/1000`} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-brand-gold font-mono text-xs uppercase tracking-widest mb-3">{p.cat}</p>
                  <h4 className="text-2xl font-serif font-bold text-white mb-4">{p.title}</h4>
                  <div className="w-12 h-px bg-white/20 group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gold/5" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-12 leading-tight"
          >
            Let's build the <br /> <span className="text-gradient italic">future of fashion.</span>
          </motion.h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <a href="https://wa.me/8801984154464" className="bg-brand-gold text-brand-navy px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all duration-500 shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
              Start a Conversation
            </a>
            <a href="/api/download-cv" className="glass-morphism text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-500">
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-brand-slate/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Contact Me">Let's Connect</SectionHeading>
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <p className="text-xl text-slate-400 mb-12 font-light">
                Ready to discuss your next project or industrial optimization? 
                Reach out through any of the channels below.
              </p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 glass-morphism rounded-2xl flex items-center justify-center text-brand-gold"><Phone size={24} /></div>
                  <div><p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">Call Me</p><p className="text-lg font-bold text-white">01984154464</p></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 glass-morphism rounded-2xl flex items-center justify-center text-brand-gold"><Mail size={24} /></div>
                  <div><p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">Email Me</p><p className="text-lg font-bold text-white">mdnaimurrashid752@gmail.com</p></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 glass-morphism rounded-2xl flex items-center justify-center text-brand-gold"><MapPin size={24} /></div>
                  <div><p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">Location</p><p className="text-lg font-bold text-white">Savar, Dhaka 1341</p></div>
                </div>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-gold transition-colors outline-none" />
                <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-gold transition-colors outline-none" />
              </div>
              <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-gold transition-colors outline-none" />
              <textarea placeholder="Your Message" rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-gold transition-colors outline-none resize-none"></textarea>
              <button className="w-full bg-brand-gold text-brand-navy py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 group">
                Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* R&D Project */}
      <section id="projects-rd" className="py-32 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <SectionHeading subtitle="Featured Achievement">{RD_PROJECT.title}</SectionHeading>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10 mb-12">
                <p className="text-slate-300 leading-relaxed italic text-lg">"{RD_PROJECT.summary}"</p>
              </div>
              
              <div className="space-y-6">
                {RD_PROJECT.phases.map((phase, i) => (
                  <details key={i} className="group glass-card rounded-2xl border border-white/5">
                    <summary className="p-6 cursor-pointer flex justify-between items-center font-bold text-brand-gold list-none">
                      <span className="text-xl font-serif">{phase.title}</span>
                      <ChevronRight className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-6 pt-0 text-slate-400 leading-relaxed">{phase.content}</div>
                  </details>
                ))}
              </div>

              {/* Project Timeline */}
              <div className="mt-16 pt-16 border-t border-white/5">
                <h4 className="text-brand-gold font-mono text-xs uppercase tracking-widest mb-10">Project Milestones</h4>
                <div className="space-y-8">
                  {RD_PROJECT.timeline.map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                        {i !== RD_PROJECT.timeline.length - 1 && <div className="w-px h-full bg-white/10 my-2" />}
                      </div>
                      <div>
                        <p className="text-brand-gold font-mono text-[10px] uppercase tracking-widest mb-1">{item.date}</p>
                        <h5 className="text-white font-bold mb-1">{item.title}</h5>
                        <p className="text-slate-400 text-sm font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-32">
              <div className="glass-card rounded-[3rem] p-12 shadow-2xl border border-white/10">
                <h3 className="text-white text-3xl font-serif font-bold mb-12 text-center">Impact Analysis</h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={RD_PROJECT.impact} 
                        innerRadius={80} 
                        outerRadius={130} 
                        paddingAngle={10} 
                        dataKey="value"
                      >
                        {RD_PROJECT.impact.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#050A15', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  {RD_PROJECT.impact.map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-3xl font-bold text-white">{item.value}%</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="glass-card p-8 rounded-3xl text-center">
                  <p className="text-brand-gold text-4xl font-serif font-bold mb-2">65%</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Synthetic Reduction</p>
                </div>
                <div className="glass-card p-8 rounded-3xl text-center">
                  <p className="text-brand-gold text-4xl font-serif font-bold mb-2">35%</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Cost Optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Work Experience">Professional Timeline</SectionHeading>
          <div className="max-w-4xl mx-auto space-y-12">
            {WORK_EXPERIENCE.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-12 border-l border-white/10"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                <p className="text-brand-gold font-mono text-sm mb-2">{exp.period}</p>
                <h4 className="text-2xl font-serif font-bold text-white mb-2">{exp.role}</h4>
                <p className="text-white/60 font-bold mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-slate-400 flex items-start gap-3 text-sm">
                      <CheckCircle2 size={14} className="text-brand-gold mt-1 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-32 bg-brand-slate/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Academic Background">Education</SectionHeading>
          <div className="grid md:grid-cols-2 gap-10">
            {EDUCATION.map((edu, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="glass-card p-8 rounded-[2rem]">
                <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-6">
                  <BookOpen size={28} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-2">{edu.degree}</h4>
                <p className="text-brand-gold font-medium mb-4">{edu.institution}</p>
                <div className="flex gap-4 text-sm text-slate-500 font-mono">
                  <span>{edu.year}</span>
                  {edu.result && <span>• {edu.result}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Research */}
      <section className="py-32 bg-brand-slate/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Continuous Learning">Training & Research</SectionHeading>
          <div className="max-w-4xl mx-auto space-y-6">
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
              <details key={idx} className="group glass-card rounded-[2rem] overflow-hidden border border-white/5">
                <summary className="p-8 cursor-pointer flex justify-between items-center font-bold text-white list-none">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                      <FlaskConical size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif">{item.title}</h4>
                      <p className="text-xs text-brand-gold font-mono uppercase tracking-widest mt-1">{item.period}</p>
                    </div>
                  </div>
                  <ChevronRight className="group-open:rotate-90 transition-transform text-slate-500" />
                </summary>
                <div className="px-8 pb-8 pt-2 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                  {item.content}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Language & Career Info */}
      <section className="py-32 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <SectionHeading subtitle="Communication">Language Proficiency</SectionHeading>
              <div className="grid grid-cols-2 gap-10">
                {[
                  { name: "Bangla", level: 100, desc: "Native" },
                  { name: "English", level: 85, desc: "Professional" }
                ].map((lang) => (
                  <motion.div 
                    key={lang.name}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card p-10 rounded-[2.5rem] text-center"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-8">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <motion.circle 
                          cx="50" cy="50" r="45" 
                          fill="none" stroke="#D4AF37" strokeWidth="6" 
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          whileInView={{ strokeDashoffset: 283 - (283 * lang.level) / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          strokeLinecap="round"
                          className="origin-center -rotate-90"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{lang.level}%</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-white mb-2">{lang.name}</h4>
                    <p className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">{lang.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading subtitle="Availability">Career Information</SectionHeading>
              <div className="glass-card p-10 rounded-[3rem] border border-white/5">
                <div className="relative aspect-video bg-white/5 rounded-2xl overflow-hidden mb-10 group">
                  {/* Simulated Map of Bangladesh */}
                  <svg viewBox="0 0 200 300" className="w-full h-full opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                    <path d="M100,20 L120,40 L140,80 L150,120 L140,180 L120,240 L100,280 L80,240 L60,180 L50,120 L60,80 L80,40 Z" fill="currentColor" className="text-brand-gold" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-4 h-4 bg-brand-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,1)]"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8">
                      <p className="glass-morphism px-4 py-2 rounded-lg text-[10px] font-bold text-white whitespace-nowrap border border-white/20">
                        Current: Savar, Dhaka
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Looking For", value: "Top-Level Position", icon: Briefcase },
                    { label: "Available For", value: "Full Time", icon: CheckCircle2 },
                    { label: "Preferred Sector", value: "Textile / Garments Factory", icon: Globe },
                    { label: "Preferred Location", value: "Anywhere in Bangladesh", icon: MapPin }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-colors">
                      <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold shadow-inner">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-lg font-bold text-white">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-32 bg-brand-slate/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Endorsements">Professional References</SectionHeading>
          <div className="grid md:grid-cols-2 gap-10">
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
                className="p-10 rounded-[3rem] glass-card flex flex-col sm:flex-row gap-8 items-center sm:items-start"
              >
                <div className="w-24 h-24 rounded-3xl bg-brand-gold flex items-center justify-center text-brand-navy text-4xl font-serif font-bold shrink-0 shadow-xl shadow-brand-gold/20">
                  {ref.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-white mb-2">{ref.name}</h4>
                  <p className="text-brand-gold font-bold text-sm mb-6 uppercase tracking-widest">{ref.role}</p>
                  <div className="space-y-3">
                    <a href={`tel:${ref.phone}`} className="flex items-center gap-3 text-slate-400 hover:text-brand-gold transition-colors">
                      <Phone size={18} /> {ref.phone}
                    </a>
                    <a href={`mailto:${ref.email}`} className="flex items-center gap-3 text-slate-400 hover:text-brand-gold transition-colors">
                      <Mail size={18} /> {ref.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-32 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Achievements">Professional Certifications</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="glass-card p-8 rounded-[2.5rem] flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-8">
                  <Award size={32} />
                </div>
                <h4 className="text-xl font-serif font-bold text-white mb-2 leading-tight">{cert.title}</h4>
                <p className="text-brand-gold font-bold text-sm mb-4">{cert.issuer}</p>
                <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{cert.issueDate}</span>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-white transition-colors">
                      <Plus size={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-brand-gold/5" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-12 leading-tight"
          >
            Let's Work Together to Create <br /> <span className="text-brand-gold italic">Sustainable Textiles!</span>
          </motion.h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <a href="https://wa.me/8801984154464" className="bg-brand-gold text-brand-navy px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all duration-500 shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
              Start a Conversation
            </a>
            <a href="/api/download-cv" className="glass-morphism text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-500">
              Download CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
