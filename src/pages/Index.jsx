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
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-green-500/80">
                {home.greeting.label}
                <span className="mx-2 text-white/30">/</span>
                <span className="text-white/90">{home.greeting.intro}</span>
              </p>
            </div>

            <div className="relative mb-4 lg:mb-6">
              <h1 className="type-hero">
                <span className="text-foreground text-8xl lg:text-[7.25rem]">
                  {home.name.first}
                </span>
                <span className="last-name text-5xl">{home.name.last}</span>
              </h1>
            </div>

            <h2 className="home-subtitle text-xl lg:text-xl text-white/90 mt-12 lg:mt-0 mb-6 lg:mb-8">
              <span className="block text-shimmer text-3xl lg:text-4xl font-bold mt-1 mb-2">
                {home.subtitle.highlight}
              </span>
              {home.subtitle.intro}
            </h2>

            <div className="text-md lg:text-lg text-muted-foreground/80 mb-6 max-w-lg leading-relaxed space-y-4">
              {home.description
                .split("\n")
                .filter((p) => p.trim())
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>

            <div className="flex flex-col gap-8 mt-2">
              <div className="flex items-center gap-3 text-sm text-white/50 font-medium flex-wrap">
                <span>Design Systems</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>React</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>TypeScript</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Accessibility</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>AI-Assisted Workflows</span>
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
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all font-semibold text-white/90 hover:text-white"
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </a>
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

      {/* What I Deliver */}
      {home.whatIDeliver && (
        <div className="max-w-7xl mx-auto px-6 py-20 lg:px-16 relative z-10">
          <h3 className="text-3xl font-bold mb-10 text-white">
            {home.whatIDeliver.title}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {home.whatIDeliver.blocks.map((block, i) => {
              const BlockIcon = getIcon(block.icon);
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-6">
                    {BlockIcon && <BlockIcon size={24} />}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {block.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {block.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Experience Snapshot */}
      {home.experience && (
        <div className="max-w-7xl mx-auto px-6 py-20 lg:px-16 relative z-10 border-t border-white/5">
          <div className="max-w-3xl">
            <h3 className="text-3xl font-bold mb-4 text-white">
              {home.experience.title}
            </h3>
            <p className="text-gray-400 text-lg mb-12">
              {home.experience.subtitle}
            </p>

            <div className="space-y-8">
              {home.experience.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-l-2 border-emerald-500/30 pl-6"
                >
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="text-emerald-400 mt-1">{item.subtitle}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Differentiator */}
      {home.differentiator && (
        <div className="max-w-7xl mx-auto px-6 py-20 lg:px-16 relative z-10 border-t border-white/5 mb-20">
          <h3 className="text-3xl font-bold mb-10 text-white">
            {home.differentiator.title}
          </h3>
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20">
            <div className="space-y-6 text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-4xl">
              {home.differentiator.points.map((pt, i) => (
                <p key={i} className={i >= 3 ? "text-sky-400 font-bold" : ""}>
                  {pt}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Index;
