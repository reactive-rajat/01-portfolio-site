import React from "react";
import { GlowCard } from "../components/GlowCard";
import IconButton from "../components/IconButton";
import { useContent } from "../context/ContentContext";
import { getIcon } from "../utils/iconMap";
import CertificationBadge from "../components/CertificationBadge";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MoreVertical,
  ArrowRight,
  Download,
  MessageSquare,
  ChevronRight,
  Quote,
} from "lucide-react";

// --- Framer Motion variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const CardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

function Index() {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const { content, loading } = useContent();

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSocialMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        {content?.global?.labels?.loading || "Loading..."}
      </div>
    );
  }

  const { home, global, skills, portfolio } = content;

  return (
    <main className="min-h-[100svh] animated-gradient-bg noise-overlay lg:pb-0 overflow-hidden">
      {/* Background layer moving subtly with scroll */}
      <motion.div
        className="fixed inset-0 grid-bg opacity-30 pointer-events-none"
        style={{ y: backgroundY }}
      />

      <div className="orb orb-coral w-[170px] h-[170px] lg:w-96 lg:h-96 -top-18 -left-8 lg:-top-48 lg:-left-48 animate-float-slow" />
      <div className="orb orb-violet w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] top-1/3 -right-12 lg:-right-64 lg:-top-1/4 animate-float-delayed" />
      <div className="orb orb-sky w-[200px] h-[200px] lg:w-72 lg:h-72 bottom-0 right-30 lg:bottom-1/4 lg:left-1/4 animate-float-delayed-2" />

      {/* ─────────────────────────────────────────────────────────
          HERO (First Fold)
          ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto grid relative z-10 min-h-[100dvh] px-6 py-20 lg:py-0 lg:px-16 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-10 lg:gap-15"
        >
          <div className="lg:w-1/2">
            <motion.div
              variants={fadeInUp}
              className="home-greeting relative flex flex-wrap items-center gap-2.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 lg:mb-0 w-fit backdrop-blur-md"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-green-400">
                {home.greeting.label}
                <span className="mx-2 text-white/30">/</span>
                <span className="text-white/90">{home.greeting.intro}</span>
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative mb-4 lg:mb-6">
              <h1 className="type-hero">
                <span className="text-foreground text-8xl lg:text-[7.25rem]">
                  {home.name.first}
                </span>
                <span className="last-name text-5xl">{home.name.last}</span>
              </h1>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="home-subtitle text-xl lg:text-xl text-white/90 mt-12 lg:mt-0 mb-6 lg:mb-8"
            >
              <span className="block text-shimmer text-3xl lg:text-4xl font-bold mt-1 mb-2">
                {home.subtitle.highlight}
              </span>
              {home.subtitle.intro}
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="text-md lg:text-lg text-white/70 mb-6 max-w-lg leading-relaxed space-y-4"
            >
              {home.description
                .split("\n")
                .filter((p) => p.trim())
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-8 mt-2"
            >
              <div className="flex items-center gap-3 text-sm text-white/50 font-medium flex-wrap">
                <span>Design Systems</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>React</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>TypeScript</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Accessibility</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <PrimaryButton
                  href={home.cta.route || "/portfolio"}
                  theme={
                    home.navigation?.find((n) => n.page === "projects")
                      ?.theme || "violet"
                  }
                  containerClass="flex-1 lg:flex-none"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {home.cta.label}
                </PrimaryButton>

                <a
                  href={global.resume?.file || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all font-semibold text-white/90 group"
                >
                  <Download
                    size={18}
                    className="group-hover:-translate-y-1 transition-transform"
                  />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-5 lg:gap-4 max-w-md mx-auto lg:max-w-none">
              {home.navigation.map(function (item, index) {
                let size = index < 2 ? "large" : "normal";
                const isHovered = hoveredIndex === index;
                const isDimmed =
                  hoveredIndex !== null && hoveredIndex !== index;
                const NavIcon = getIcon(item.icon);

                return (
                  <motion.div
                    key={item.page}
                    variants={CardHover}
                    initial="rest"
                    whileHover="hover"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="min-w-0"
                  >
                    <GlowCard
                      variant={item.theme}
                      letter={item.letter}
                      title={item.label}
                      description={item.description}
                      to={item.route}
                      icon={NavIcon}
                      size={size}
                      isHovered={isHovered}
                      isDimmed={isDimmed}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          WHAT I DELIVER
          ───────────────────────────────────────────────────────── */}
      {home.whatIDeliver && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 py-24 lg:px-16 relative z-10"
        >
          <motion.div
            variants={fadeInUp}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <p className="text-sm font-mono tracking-widest text-violet-400 mb-2 uppercase">
                Core Principles
              </p>
              <h3 className="text-4xl font-bold text-white tracking-tight">
                {home.whatIDeliver.title}
              </h3>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {home.whatIDeliver.blocks.map((block, i) => {
              const BlockIcon = getIcon(block.icon);
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 group-hover:bg-violet-500/20 group-hover:text-violet-300 transition-all duration-300 shadow-[0_0_20px_transparent] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                      {BlockIcon && <BlockIcon size={26} />}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-violet-100 transition-colors">
                      {block.title}
                    </h4>
                    <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                      {block.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────
          FEATURED SKILLS (New)
          ───────────────────────────────────────────────────────── */}
      {home.featuredSkills && skills?.categories && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 py-24 lg:px-16 relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div variants={fadeInUp} className="max-w-2xl">
              <p className="text-sm font-mono tracking-widest text-sky-400 mb-2 uppercase">
                Technical Arsenal
              </p>
              <h3 className="text-4xl font-bold text-white tracking-tight mb-4">
                {home.featuredSkills.title}
              </h3>
              <p className="text-lg text-white/50">
                {home.featuredSkills.subtitle}
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <PrimaryButton
                theme="sky"
                href="/skills"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {home.featuredSkills.ctaLabel}
              </PrimaryButton>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.categories.slice(0, 2).map((cat, idx) => (
              <motion.div
                key={cat.title}
                variants={fadeInUp}
                className="p-8 rounded-3xl border border-sky-500/20 bg-sky-500/[0.03] backdrop-blur-md relative overflow-hidden group hover:border-sky-500/40 transition-colors"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon
                    name={idx === 0 ? "Zap" : "Wrench"}
                    className="w-32 h-32 text-sky-400"
                  />
                </div>

                <h4 className="text-lg font-bold uppercase tracking-[0.15em] text-sky-400 mb-6 relative z-10">
                  {cat.title}
                </h4>
                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white/90 hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-300 transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────
          EXPERIENCE SNAPSHOT & DIFFERENTIATOR (Combined Layout)
          ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-24 lg:px-16 relative z-10 border-y border-white/5 bg-white/[0.01]">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Experience Column */}
          {home.experience && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-5"
            >
              <motion.p
                variants={fadeInUp}
                className="text-sm font-mono tracking-widest text-emerald-400 mb-2 uppercase"
              >
                Background
              </motion.p>
              <motion.h3
                variants={fadeInUp}
                className="text-3xl font-bold mb-4 text-white"
              >
                {home.experience.title}
              </motion.h3>
              <motion.p
                variants={fadeInUp}
                className="text-white/50 text-lg mb-10"
              >
                {home.experience.subtitle}
              </motion.p>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {home.experience.items.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-black bg-emerald-500 shadow-[0_0_0_2px_hsl(var(--emerald)/0.3)] md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10" />
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-5 rounded-2xl border border-white/5 bg-white/5 group-hover:border-emerald-500/30 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        <time className="font-mono text-xs text-emerald-400">
                          {item.date}
                        </time>
                      </div>
                      <div className="text-sm text-white/50">
                        {item.subtitle}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={fadeInUp}
                className="mt-10 flex justify-center"
              >
                <PrimaryButton
                  theme="emerald"
                  href="/about"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full"
                >
                  Read Full Journey
                </PrimaryButton>
              </motion.div>
            </motion.div>
          )}

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Differentiator Column */}
          {home.differentiator && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <div className="p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />

                <motion.p
                  variants={fadeInUp}
                  className="text-sm font-mono tracking-widest text-emerald-400 mb-2 uppercase relative z-10"
                >
                  Secret Sauce
                </motion.p>
                <motion.h3
                  variants={fadeInUp}
                  className="text-3xl font-bold mb-10 text-white relative z-10"
                >
                  {home.differentiator.title}
                </motion.h3>

                <div className="space-y-6 text-lg text-white/70 font-medium leading-relaxed relative z-10">
                  {home.differentiator.points.map((pt, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="flex gap-4"
                    >
                      <span className="text-emerald-500 mt-1">
                        <ChevronRight className="w-5 h-5" />
                      </span>
                      <p className={i >= 3 ? "text-white" : ""}>{pt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          FEATURED PROJECTS (New)
          ───────────────────────────────────────────────────────── */}
      {home.featuredProjects && portfolio?.projects && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 py-24 lg:px-16 relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div variants={fadeInUp} className="max-w-2xl">
              <p className="text-sm font-mono tracking-widest text-violet-400 mb-2 uppercase">
                Case Studies
              </p>
              <h3 className="text-4xl font-bold text-white tracking-tight mb-4">
                {home.featuredProjects.title}
              </h3>
              <p className="text-lg text-white/50">
                {home.featuredProjects.subtitle}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.projects.slice(0, 2).map((project, i) => (
              <motion.a
                href={project.url || "#"}
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-black flex flex-col h-[400px]"
              >
                {/* Image Area */}
                <div className="relative h-[65%] w-full overflow-hidden bg-white/5">
                  <div className="absolute inset-0 bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Area */}
                <div className="relative h-[35%] p-6 flex flex-col justify-center bg-white/[0.02] backdrop-blur-md border-t border-white/10">
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h4>
                      <div className="flex gap-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-violet-500 group-hover:border-violet-500 group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-12 flex justify-center">
            <PrimaryButton
              theme="violet"
              href="/portfolio"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {home.featuredProjects.ctaLabel}
            </PrimaryButton>
          </motion.div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────
          TESTIMONIALS (New)
          ───────────────────────────────────────────────────────── */}
      {home.testimonials && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 py-24 lg:px-16 relative z-10 border-t border-white/5"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.p
              variants={fadeInUp}
              className="text-sm font-mono tracking-widest text-sky-400 mb-2 uppercase"
            >
              Recommendations
            </motion.p>
            <motion.h3
              variants={fadeInUp}
              className="text-4xl font-bold text-white tracking-tight mb-4"
            >
              {home.testimonials.title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-lg text-white/50">
              {home.testimonials.subtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {home.testimonials.items.map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] relative group hover:border-sky-500/30 transition-colors"
              >
                <div className="absolute top-6 right-6 text-white/10 group-hover:text-sky-500/20 transition-colors">
                  <Quote size={40} />
                </div>

                <p className="text-white/80 leading-relaxed mb-8 relative z-10 text-sm md:text-base">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{testimonial.name}</h5>
                    <p className="text-xs text-sky-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────
          FINAL CTA (New)
          ───────────────────────────────────────────────────────── */}
      {home.finalCta && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto px-6 py-24 lg:px-16 relative z-10 mb-24"
        >
          <div className="relative rounded-[3rem] overflow-hidden border border-emerald-500/30 bg-emerald-500/[0.05] p-12 lg:p-20 text-center backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10" />

            <div className="relative z-10 flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-500/40 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <MessageSquare size={32} />
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 max-w-2xl">
                {home.finalCta.title}
              </h3>
              <p className="text-xl text-white/60 mb-10 max-w-xl">
                {home.finalCta.subtitle}
              </p>

              <PrimaryButton
                theme="emerald"
                href="/contact"
                icon={<ArrowRight className="w-5 h-5" />}
                className="!px-10 !h-16 !text-lg !rounded-2xl"
              >
                {home.finalCta.ctaLabel}
              </PrimaryButton>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}

export default Index;
