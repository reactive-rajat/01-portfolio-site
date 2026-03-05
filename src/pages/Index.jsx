import React from "react";
import { GlowCard } from "../components/GlowCard";
import { useContent } from "../context/ContentContext";
import { getIcon } from "../utils/iconMap";
import PrimaryButton from "../components/PrimaryButton";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { fadeInUp, staggerContainer, CardHover } from "../utils/motionVariants";

function Index() {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const { content, loading } = useContent();

  const { scrollY, scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 600) {
      if (!isScrolled) setIsScrolled(true);
    } else {
      if (isScrolled) setIsScrolled(false);
    }
  });

  // Unique animation for the dynamic sticky header
  const headerVariants = {
    hidden: { y: -80, opacity: 0, scale: 0.85, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
    exit: {
      y: -80,
      opacity: 0,
      scale: 0.85,
      filter: "blur(10px)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

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

  const { home, global } = content;

  return (
    <main className="min-h-[100svh] animated-gradient-bg noise-overlay lg:pb-0 overflow-hidden flex flex-col items-center justify-center">
      {/* Background layer moving subtly with scroll */}
      <motion.div
        className="fixed inset-0 grid-bg opacity-30 pointer-events-none"
        style={{ y: backgroundY }}
      />

      <div className="orb orb-coral w-[170px] h-[170px] lg:w-96 lg:h-96 -top-18 -left-8 lg:-top-48 lg:-left-48 animate-float-slow" />
      <div className="orb orb-violet w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] top-1/3 -right-12 lg:-right-64 lg:-top-1/4 animate-float-delayed" />
      <div className="orb orb-sky w-[200px] h-[200px] lg:w-72 lg:h-72 bottom-0 right-30 lg:bottom-1/4 lg:left-1/4 animate-float-delayed-2" />

      {/* ─────────────────────────────────────────────────────────
          STICKY NAV (Dynamic Island inspired)
          ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
          >
            <div className="flex items-center gap-4 lg:gap-6 px-4 py-2.5 lg:px-6 lg:py-3 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-violet-500/10 mix-blend-luminosity">
              <motion.div
                variants={navItemVariants}
                className="text-white font-bold tracking-[0.2em] uppercase text-xs lg:text-sm border-r border-white/20 pr-4 lg:pr-6 mr-1 lg:mr-2 hidden md:block"
              >
                {home.name.first} {home.name.last}
              </motion.div>

              <div className="flex items-center gap-1 sm:gap-2">
                {home.navigation.map((item, index) => {
                  const NavIcon = getIcon(item.icon);
                  const isHovered = hoveredIndex === `sticky-${index}`;

                  return (
                    <motion.a
                      href={item.route}
                      key={item.page}
                      variants={navItemVariants}
                      onMouseEnter={() => setHoveredIndex(`sticky-${index}`)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                        isHovered
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {NavIcon && (
                        <NavIcon
                          size={16}
                          className={isHovered ? `text-${item.theme}-400` : ""}
                        />
                      )}
                      <span className="text-sm font-medium hidden sm:block">
                        {item.label}
                      </span>

                      {isHovered && (
                        <motion.div
                          layoutId="nav-pill"
                          className={`absolute inset-0 rounded-xl bg-${item.theme}-500/20 shadow-[0_0_15px_var(--${item.theme}-500)] opacity-20 border border-${item.theme}-500/50 -z-10`}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────
          HERO (First Fold)
          ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto grid relative z-10 px-6 lg:px-16 items-center">
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
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative mb-4 lg:mb-6">
              <h1 className="type-hero">
                <span className="text-foreground text-8xl lg:text-[7.25rem]">
                  {home.name.first}
                </span>
                <span className="last-name font-normal text-[2.15rem] uppercase tracking-[1.65rem] ml-1">
                  {home.name.last}
                </span>
              </h1>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="home-subtitle text-xl lg:text-2xl text-white/90 mt-12 lg:mt-0 mb-6 lg:mb-8"
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

    </main>
  );
}

export default Index;
