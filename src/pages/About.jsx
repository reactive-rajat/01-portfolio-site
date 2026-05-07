import React from "react";
import { PageLayout } from "../components/PageLayout";
import IconButton from "../components/IconButton";
import {
  Download,
  Calendar,
  MoreVertical,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  GraduationCap,
  ChevronRight,
  Quote,
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import { getIcon } from "../utils/iconMap";
import PrimaryButton from "../components/PrimaryButton";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motionVariants";

// ── Card wrapper ─────────────────────────────────────────────────────────────
function SimpleCard({ children, className = "", isActive, isClickable, onClick }) {
  return (
    <div
      onClick={onClick}
      className={
        `simple-card transition-all duration-500 ${isClickable ? "cursor-pointer group/card" : ""} ${
          isActive
            ? "border-[hsl(var(--theme-base)/0.5)] bg-[hsl(var(--theme-base)/0.05)] shadow-[0_0_30px_-10px_hsl(var(--theme-base)/0.3)] -translate-y-1"
            : "border-white/10 hover:border-[hsl(var(--theme-base)/0.3)] hover:-translate-y-0.5"
        } ` + className
      }
    >
      {children}
    </div>
  );
}

function TimelineItem({ title, subtitle, date, percentage, points, link, isLast, itemIcon: ItemIcon, isActive, onMouseEnter }) {
  return (
    <div className="group relative flex gap-4 lg:gap-6 pb-8 last:pb-0" onMouseEnter={onMouseEnter}>
      {/* Dot + connector line */}
      <div className="flex flex-col items-center mt-1">
        <div className={`flex h-12 w-12 aspect-square justify-center items-center`}>
          <span className={`rounded-full flex shrink-0 items-center justify-center w-10 h-10 border bg-black transition-all duration-300 shadow-lg ${isActive
            ? "border-[hsl(var(--theme-base)/0.5)] text-[hsl(var(--theme-base))] scale-[120%]"
            : "border-white/10 text-gray-400 group-hover:border-[hsl(var(--theme-base)/0.3)] group-hover:text-[hsl(var(--theme-base))]"}`}>
            {ItemIcon && <ItemIcon size={18} />}
          </span>
        </div>
        {!isLast && (
          <div className={`h-full w-px mt-2 bg-gradient-to-b transition-colors duration-300 ${
            isActive
              ? "from-[hsl(var(--theme-base)/0.4)] via-[hsl(var(--theme-base)/0.3)] to-transparent"
              : "from-white/20 to-transparent group-hover:from-[hsl(var(--theme-base)/0.2)]"
          }`} />
        )}
      </div>

      {/* Content (No Card UI) */}
      <div className={`w-full pt-1 relative ${isClickable(link) ? "cursor-pointer group/content" : ""}`}
           onClick={link ? () => window.open(link, "_blank", "noopener,noreferrer") : undefined}>
        
        {/* Link badge (moved to sit inline with title if link exists, or just subtle icon) */}
        <div className="flex items-start justify-between gap-4">
          <h3 className={`type-card-title transition-colors duration-300 ${
            isActive ? "text-[hsl(var(--theme-base))]" : "text-white group-hover/content:text-[hsl(var(--theme-base)/0.8)]"
          }`}>{title}</h3>
          
          {link && (
            <div className={`shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 transition-all ${
              isActive ? "bg-[hsl(var(--theme-base)/0.2)] border-[hsl(var(--theme-base)/0.5)] text-[hsl(var(--theme-base))]" : "group-hover/content:bg-[hsl(var(--theme-base)/0.2)] group-hover/content:border-[hsl(var(--theme-base)/0.5)] group-hover/content:text-[hsl(var(--theme-base))]"
            }`}>
              <ArrowUpRight size={14} />
            </div>
          )}
        </div>

        {/* Row 2: Subtitle · Date · Percentage */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2">
          <span className="type-body-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">{subtitle}</span>
          
          {(date || percentage) && <span className="text-white/15 hidden sm:inline px-1">·</span>}
          
          {date && (
            <div className={`inline-flex items-center gap-2 type-caption italic font-medium ${isActive ? "text-[hsl(var(--theme-base))]" : "text-gray-500"}`}>
              <Calendar size={14} />
              <span className="mt-[1px]">{date}</span>
            </div>
          )}
          
          {percentage && (
            <>
              <span className="text-white/15 hidden sm:inline px-1">·</span>
              <div className={`inline-flex items-center gap-2 type-caption italic font-medium ${isActive ? "text-[hsl(var(--theme-base)/0.7)]" : "text-gray-500"}`}>
                <GraduationCap size={14} />
                <span className="mt-[1px]">{percentage}</span>
              </div>
            </>
          )}
        </div>

        {/* Points */}
        {points && points.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 type-body-sm text-gray-400/90">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 size={16} className={isActive ? "text-[hsl(var(--theme-base)/0.7)]" : "text-white/20"} />
                </div>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function isClickable(link) {
  return !!link;
}

// ── Tab-level collapsible wrapper ─────────────────────────────────────────────
const COLLAPSE_HEIGHT = 320; // px — if content shorter, no collapse shown

function CollapsibleTabContent({ children, label, bottomNote, icon }) {
  const [expanded, setExpanded] = React.useState(false);
  const [needsCollapse, setNeedsCollapse] = React.useState(false);
  const contentRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (contentRef.current) {
      setNeedsCollapse(contentRef.current.scrollHeight > COLLAPSE_HEIGHT);
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl p-6 lg:p-8 lg:pb-4">
      <motion.div
        initial={false}
        animate={{ height: needsCollapse && !expanded ? COLLAPSE_HEIGHT : "auto" }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="pb-10">
          {children}
        </div>
      </motion.div>

      {/* Fade mask + expand button */}
      {needsCollapse && (
        <motion.div 
          initial={false}
          animate={{
            y: expanded ? 0 : -20,
            marginBottom: expanded ? 20 : 0
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="flex justify-center relative z-20"
        >
          <motion.div 
            initial={false}
            animate={{ 
              opacity: expanded ? 0 : 1,
              y: expanded ? 10 : 0
            }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-3 left-0 right-0 h-[200px] bg-gradient-to-t from-[#060507] via-[#060507c4] to-transparent pointer-events-none" 
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="relative z-10 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--theme-base)/0.08)] border border-[hsl(var(--theme-base)/0.2)] text-sm font-semibold text-[hsl(var(--theme-base))] hover:bg-[hsl(var(--theme-base)/0.15)] hover:shadow-[0_0_20px_-5px_hsl(var(--theme-base)/0.4)] transition-all"
          >
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            <div className="relative overflow-hidden h-5 flex items-center justify-center w-[72px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={expanded ? "less" : "more"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`absolute`}
                >
                  {expanded ? "View Less" : "View More"}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.button>
        </motion.div>
      )}

      </div>

      {/* Bottom Note */}
      {bottomNote && (
        <div className="px-2 lg:px-4 flex items-start gap-3 text-white/40">
          {icon && (
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--theme-base)/0.1)] flex items-center justify-center text-[hsl(var(--theme-base))] shrink-0 mt-0.5">
              {React.createElement(icon, { size: 16 })}
            </div>
          )}
          <p className="type-body-sm mt-1">{bottomNote}</p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function About() {
  const { content, loading, activeRole } = useContent();
  const [activeTab, setActiveTab] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (content?.about?.tabs?.length > 0) setActiveTab(content.about.tabs[0].label);
  }, [activeRole, content]);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsSocialMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => { setHoveredIndex(null); }, [activeTab]);

  if (loading || !activeTab) {
    return <div className="min-h-screen grid place-items-center text-white">{content?.global?.labels?.loading || "Loading..."}</div>;
  }

  const { about, global, home } = content;
  const { meta, description, tabs } = about;

  let activeTabData = tabs[0];
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].label === activeTab) { activeTabData = tabs[i]; break; }
  }

  const presentLabel = global.labels.present;

  // ── Hero action ──────────────────────────────────────────────────────────
  const heroAction = (
    <>
      <PrimaryButton href={global.resume.file} target="_blank" icon={<Download size={18} />}
        tooltipTitle={about.cvCta.tooltipTitle} tooltipDesc={about.cvCta.tooltipDesc}>
        {about.cvCta.label}
      </PrimaryButton>
      <div className="relative" ref={menuRef}>
        <IconButton icon={MoreVertical} theme="neutral" onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
          aria-label={global.labels.moreOptions} size="lg"
          className={isSocialMenuOpen ? "!bg-secondary !border-white/20" : ""} />
        {isSocialMenuOpen && (
          <div className="absolute bottom-full mb-3 left-0 min-w-[200px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-300 z-[110]">
            <div className="px-3 py-2">
              <p className="type-label text-white/30">{global.labels.socialProfiles}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 px-2 pb-2">
              {global.socialLinks.map((link, idx) => {
                const SocialIcon = getIcon(link.icon);
                return (
                  <IconButton key={link.id} icon={SocialIcon} theme="neutral" href={link.url} aria-label={link.label} size="social"
                    className="animate-in fade-in zoom-in-75 duration-300"
                    style={{ animationDelay: `${idx * 50}ms` }} onClick={() => setIsSocialMenuOpen(false)} />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );

  // ── Timeline tabs ────────────────────────────────────────────────────────
  const timelineTabs = (
    <motion.div initial="hidden" animate="visible"
      variants={staggerContainer} className="w-full py-16 border-t border-white/5">
      <motion.div variants={fadeInUp} className="mb-10">
        <p className="type-label text-[hsl(var(--theme-base))] mb-2">Background</p>
        <h3 className="type-section-title text-white mb-6">Experience & Education</h3>
      </motion.div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
      {/* Sidebar */}
      <div className="sticky top-4 z-20 w-full lg:w-[260px] flex-shrink-0">
        <div className="flex flex-row lg:flex-col gap-1.5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl overflow-x-auto lg:overflow-visible hide-scrollbar">
          {tabs.map((tab) => {
            const TabIcon = getIcon(tab.icon);
            const isActive = activeTab === tab.label;
            return (
              <button key={tab.label} onClick={() => setActiveTab(tab.label)}
                className={`relative group flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-3 rounded-xl transition-all duration-300 min-w-[80px] lg:min-w-0 w-full py-2 px-2 lg:px-3 lg:py-2.5 text-center lg:text-left ${
                  isActive ? "text-[hsl(var(--theme-base))] bg-black/60" : "text-gray-400 hover:text-white hover:bg-black/60"
                }`}
              >
                <div className={`flex shrink-0 items-center justify-center w-9 h-9 rounded-lg transition-colors ${isActive ? "bg-[hsl(var(--theme-base)/0.15)]" : "bg-white/5"}`}>
                  {TabIcon && <TabIcon size={16} />}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider mt-0.5 lg:mt-0">{tab.label}</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[hsl(var(--theme-base))] rounded-l-full hidden lg:block" />}
                {isActive && <div className="tab-dot lg:hidden" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content with collapse */}
      <div className="flex-1 w-full min-w-0">
        <AnimatePresence mode="wait">
          {activeTabData && (
            <motion.div key={activeTabData.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CollapsibleTabContent 
                label={activeTabData.label} 
                bottomNote={activeTabData.timelineDescription}
                icon={activeTabData.icon ? getIcon(activeTabData.icon) : null}
              >
                {activeTabData.items.map((item, index) => {
                  const isActive = hoveredIndex === null ? index === 0 : hoveredIndex === index;
                  return (
                    <TimelineItem key={index}
                      title={item.title} subtitle={item.subtitle}
                      date={item.date || presentLabel} percentage={item.percentage}
                      points={item.points} link={item.link}
                      isLast={index === activeTabData.items.length - 1}
                      itemIcon={getIcon(activeTabData.itemIcon)}
                      isActive={isActive} onMouseEnter={() => setHoveredIndex(index)}
                    />
                  );
                })}
              </CollapsibleTabContent>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </motion.div>
  );

  // ── What I Deliver ───────────────────────────────────────────────────────
  // All sections use w-full py-16 — horizontal alignment is handled by PageLayout's px-5 wrapper
  const whatIDeliverSection = home?.whatIDeliver ? (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer} className="w-full py-16 border-t border-white/5">
      <motion.div variants={fadeInUp} className="mb-10">
        <p className="type-label text-[hsl(var(--theme-base))] mb-2">Core Principles</p>
        <h3 className="type-section-title text-white mb-6">{home.whatIDeliver.title}</h3>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-5">
        {home.whatIDeliver.blocks.map((block, i) => {
          const BlockIcon = getIcon(block.icon);
          return (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
              className="group relative p-7 rounded-2xl border border-white/10 hover:border-[hsl(var(--theme-base)/0.3)] hover:shadow-[0_8px_30px_-12px_hsl(var(--theme-base)/0.2)] bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--theme-base)/0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[hsl(var(--theme-base))] mb-5 group-hover:scale-110 group-hover:bg-[hsl(var(--theme-base)/0.15)] group-hover:border-[hsl(var(--theme-base)/0.3)] transition-all duration-300">
                  {BlockIcon && <BlockIcon size={22} />}
                </div>
                <h4 className="type-card-title text-white mb-3 group-hover:text-[hsl(var(--theme-base)/0.9)] transition-colors">{block.title}</h4>
                <p className="type-body-sm text-white/55">{block.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  ) : null;

  // ── Why I'm Different ────────────────────────────────────────────────────
  const differentiatorSection = home?.differentiator ? (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer} className="w-full py-16 border-t border-white/5">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <motion.div variants={fadeInUp} className="lg:w-[240px] flex-shrink-0">
          <p className="type-label text-[hsl(var(--theme-base))] mb-2">Secret Sauce</p>
          <h3 className="type-section-title text-white">{home.differentiator.title}</h3>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex-1">
          <div className="space-y-4">
            {home.differentiator.points.map((pt, i) => (
              <div key={i} className="flex gap-3 group">
                <ChevronRight className="w-4 h-4 text-[hsl(var(--theme-base))] mt-1 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                <p className="type-body text-white/65">{pt}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  ) : null;

  // ── Testimonials ─────────────────────────────────────────────────────────
  const testimonialsSection = home?.testimonials ? (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer} className="w-full py-16 border-t border-white/5">
      <motion.div variants={fadeInUp} className="mb-10">
        <p className="type-label text-[hsl(var(--theme-base))] mb-2">Recommendations</p>
        <h3 className="type-section-title text-white mb-3">{home.testimonials.title}</h3>
        <p className="type-body text-white/45">{home.testimonials.subtitle}</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-5">
        {home.testimonials.items.map((testimonial, i) => (
          <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
            className="group relative p-7 rounded-2xl border border-white/10 hover:border-[hsl(var(--theme-base)/0.3)] hover:shadow-[0_8px_30px_-12px_hsl(var(--theme-base)/0.2)] bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--theme-base)/0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="absolute -top-2 -right-2 text-white/10 group-hover:text-[hsl(var(--theme-base))] group-hover:scale-110 transition-all duration-300">
                <Quote size={40} />
              </div>
              <p className="type-body-sm text-white/70 mb-6 relative z-10 mt-2 pr-4">"{testimonial.text}"</p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-[hsl(var(--theme-base)/0.3)] transition-colors shrink-0">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="type-label font-bold text-white group-hover:text-[hsl(var(--theme-base)/0.9)] transition-colors">{testimonial.name}</h5>
                  <p className="type-caption text-[hsl(var(--theme-base)/0.7)]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ) : null;

  return (
    <PageLayout
      themeName={meta.theme}
      title={meta.title}
      letter={meta.letter}
      icon={meta.icon}
      description={description.join(" ")}
      action={heroAction}
      right={
        <div>
          {timelineTabs}
          {whatIDeliverSection}
          {differentiatorSection}
          {testimonialsSection}
        </div>
      }
    />
  );
}

export default About;
