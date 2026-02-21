import React from "react";
import { GlowCard } from "../components/GlowCard";
import IconButton from "../components/IconButton";
import { useContent } from "../context/ContentContext";
import { getIcon } from "../utils/iconMap";
import CertificationBadge from "../components/CertificationBadge";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import {
  MoreVertical,
  ArrowRight,
  Download,
  MessageSquare,
} from "lucide-react";

import RoleSwitcher from "../components/RoleSwitcher";

function Index() {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const { content, loading } = useContent();

  // Close menu when clicking outside
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
    <main className="min-h-[100svh] animated-gradient-bg noise-overlay lg:pb-0 pb-[80px]">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Global Header / Role Switcher */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 lg:px-16 flex justify-end pointer-events-none">
        <div className="pointer-events-auto scale-90 lg:scale-100 origin-right">
          <RoleSwitcher />
        </div>
      </header>

      <div className="orb orb-coral w-[170px] h-[170px] lg:w-96 lg:h-96 -top-18 -left-8 lg:-top-48 lg:-left-48 animate-float-slow" />
      <div className="orb orb-violet w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] top-1/3 -right-12 lg:-right-64 lg:-top-1/4 animate-float-delayed" />
      <div className="orb orb-sky w-[200px] h-[200px] lg:w-72 lg:h-72 bottom-0 right-30 lg:bottom-1/4 lg:left-1/4 animate-float-delayed-2" />

      <div className="max-w-7xl mx-auto grid relative z-10 min-h-[100dvh]  px-6 py-10 md:py-12 lg:py-0 lg:px-16">
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-10 lg:gap-15 page-enter">
          <div className="lg:w-1/2">
            <div className="home-greeting animate-slide-up relative flex flex-wrap items-center gap-2.5 px-3 py-1.5 bg-black/[0.05] border border-white/10 rounded-full mb-6 lg:mb-0 w-fit backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-green-500/80">
                {home.greeting.label}
                <span className="mx-2 text-white/30">/</span>
                <span className="text-white/90">{home.greeting.intro}</span>
              </p>
            </div>

            <div className="relative mb-4 lg:mb-8">
              <h1 className="type-hero">
                <span className="text-foreground text-8xl lg:text-9xl">
                  {home.name.first}
                </span>
                <span className="last-name text-5xl lg:text-6xl">
                  {home.name.last}
                </span>
              </h1>
            </div>

            <h2 className="home-subtitle text-xl lg:text-2xl text-white/90 mt-12 lg:mt-6 mb-3 lg:mb-4 font-medium leading-tight">
              {home.subtitle.intro}
              <span className="block text-shimmer text-3xl font-bold mt-1">
                {home.subtitle.highlight}
              </span>
            </h2>

            <p className="text-md lg:text-lg text-muted-foreground/80 mb-6 max-w-lg leading-relaxed">
              {home.description}
            </p>

            <div className="flex flex-col gap-8">
              {home.certifications && (
                <div className="flex gap-3 animate-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards] mb-0 w-[calc(100svw-3rem)] lg:w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                  {home.certifications.map((cert) => (
                    <CertificationBadge key={cert.id} {...cert} />
                  ))}
                </div>
              )}

              <div className="mobile-sticky-bar">
                <PrimaryButton
                  href="/portfolio"
                  theme={
                    home.navigation.find((n) => n.page === "projects")?.theme ||
                    "violet"
                  }
                  containerClass="flex-1 lg:flex-none"
                  icon={<ArrowRight className="w-4 h-4" />}
                  tooltipTitle={home.cta.tooltipTitle}
                  tooltipDesc={home.cta.tooltipDesc}
                >
                  {home.cta.label}
                </PrimaryButton>

                <div className="relative" ref={menuRef}>
                  <IconButton
                    icon={MoreVertical}
                    theme="neutral"
                    onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
                    aria-label={global.labels.moreOptions}
                    size="lg"
                    className={
                      isSocialMenuOpen ? "!bg-secondary !border-white/20" : ""
                    }
                  />

                  {isSocialMenuOpen && (
                    <div className="absolute bottom-full mb-3 right-0 lg:left-0 lg:right-auto min-w-[200px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-300 z-[110]">
                      <div className="flex flex-col gap-1">
                        <div className="mb-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                            {global.labels.quickLinks}
                          </p>
                        </div>
                        <a
                          href={global.resume.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/6 lg:hover:border-red-500/15 bg-white/5 hover:!bg-red-300/10 transition-all group animate-in fade-in slide-in-from-right-2 duration-300 delay-75"
                          onClick={() => setIsSocialMenuOpen(false)}
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20 group-hover:scale-110 transition-transform">
                            <Download size={18} />
                          </div>
                          <span className="text-[15px] font-semibold text-white/90 group-hover:text-white">
                            {global.resume.label}
                          </span>
                        </a>

                        <div className="h-px bg-white/5 my-2 mx-2" />

                        <div className="mb-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                            {global.labels.socialProfiles}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pb-2">
                          {global.socialLinks.map((link, idx) => {
                            const SocialIcon = getIcon(link.icon);
                            return (
                              <IconButton
                                key={link.id}
                                icon={SocialIcon}
                                theme="neutral"
                                href={link.url}
                                aria-label={link.label}
                                size="sm"
                                className={`!w-12 !h-12 !rounded-xl !border-white/6 hover:!bg-white/10 animate-in fade-in zoom-in-75 duration-300`}
                                style={{
                                  animationDelay: `${150 + idx * 50}ms`,
                                }}
                                onClick={() => setIsSocialMenuOpen(false)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-5 lg:gap-4 max-w-md mx-auto lg:max-w-none">
              {home.navigation.map(function (item, index) {
                let size = "normal";
                if (index < 2) {
                  size = "large";
                }

                const isHovered = hoveredIndex === index;
                let isDimmed = false;
                if (hoveredIndex !== null) {
                  if (hoveredIndex !== index) {
                    isDimmed = true;
                  }
                }
                const NavIcon = getIcon(item.icon);

                return (
                  <div
                    key={item.page}
                    onMouseEnter={function () {
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={function () {
                      setHoveredIndex(null);
                    }}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Index;
