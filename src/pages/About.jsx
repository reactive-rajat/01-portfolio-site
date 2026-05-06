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

function SimpleCard(props) {
  const children = props.children;
  const className = props.className || "";
  const isActive = props.isActive;
  const isClickable = props.isClickable;
  const onClick = props.onClick;

  return (
    <div
      onClick={onClick}
      className={
        `simple-card transition-all duration-500 ${
          isClickable ? "cursor-pointer group/card" : ""
        } ${
          isActive
            ? "border-[hsl(var(--theme-base)/0.5)] bg-[hsl(var(--theme-base)/0.05)] shadow-[0_0_30px_-10px_hsl(var(--theme-base)/0.3)] translate-y-[-4px]"
            : "border-white/10 hover:border-[hsl(var(--theme-base)/0.3)] hover:shadow-[0_0_20px_-10px_hsl(var(--theme-base)/0.1)] hover:-translate-y-1"
        } ` + className
      }
    >
      {children}
    </div>
  );
}

function TimelineItem(props) {
  const { title, subtitle, date, percentage, points, link, isLast, itemIcon: ItemIcon, calendarIcon: CalendarIcon, isActive, onMouseEnter } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="group relative flex gap-4 lg:gap-6 pb-5 last:pb-0" onMouseEnter={onMouseEnter}>
      <div className="flex flex-col items-center">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-[#0a0a0a] transition-all duration-300 shadow-lg ${
          isActive
            ? "border-[hsl(var(--theme-base)/0.5)] text-[hsl(var(--theme-base))] scale-110"
            : "border-white/10 text-gray-400 group-hover:border-[hsl(var(--theme-base)/0.3)] group-hover:text-[hsl(var(--theme-base))]"
        }`}>
          {ItemIcon && <ItemIcon size={18} />}
        </div>
        {!isLast && (
          <div className={`h-full w-px bg-gradient-to-b transition-colors duration-300 ${
            isActive
              ? "from-[hsl(var(--theme-base)/0.4)] via-[hsl(var(--theme-base)/0.1)] to-transparent"
              : "from-white/10 to-transparent group-hover:from-[hsl(var(--theme-base)/0.2)]"
          }`} />
        )}
      </div>
      <div className="w-full pt-1">
        <SimpleCard
          className="p-4 lg:p-6 relative group/card overflow-hidden"
          isActive={isActive}
          isClickable={!!link}
          onClick={link ? () => window.open(link, "_blank", "noopener,noreferrer") : undefined}
        >
          {link && (
            <div className={`absolute top-0 right-0 z-10 flex h-10 w-11 items-center justify-center rounded-[16px] rounded-bl-[24px] rounded-tl-none rounded-br-none border border-r-0 border-t-0 transition-all duration-500 ${
              isActive
                ? "border-[hsl(var(--theme-base)/0.5)] bg-[hsl(var(--theme-base)/0.2)] text-[hsl(var(--theme-base))]"
                : "border-white/10 bg-white/5 text-gray-500 group-hover/card:border-[hsl(var(--theme-base)/0.4)] group-hover/card:bg-[hsl(var(--theme-base)/0.1)] group-hover/card:text-[hsl(var(--theme-base))] group-hover/card:scale-110 group-hover/card:rotate-12"
            }`}>
              <ArrowUpRight size={20} />
            </div>
          )}
          <h3 className={`text-lg lg:text-xl font-semibold transition-colors duration-300 pr-10 ${
            isActive ? "text-[hsl(var(--theme-base))]" : "text-white group-hover/card:text-[hsl(var(--theme-base)/0.8)]"
          }`}>{title}</h3>
          <p className="text-sm font-medium text-gray-400 mt-2 transition-colors duration-300 group-hover:text-gray-300">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4">
            <div className="inline-flex items-center gap-2.5 text-xs italic font-medium">
              <CalendarIcon size={16} className={isActive ? "text-[hsl(var(--theme-base))]" : ""} />
              <span className={`mt-[1px] ${isActive ? "text-[hsl(var(--theme-base))]" : ""}`}>{date}</span>
            </div>
            {percentage && (
              <div className="inline-flex items-center gap-2.5 text-xs italic font-medium">
                <GraduationCap size={16} className={isActive ? "text-[hsl(var(--theme-base)/0.7)]" : "text-gray-500"} />
                <span className={`mt-[1px] ${isActive ? "text-[hsl(var(--theme-base))]" : ""}`}>{percentage}</span>
              </div>
            )}
          </div>
          {points && points.length > 0 && (
            <div className="mt-5">
              {isExpanded && (
                <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                  {points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-gray-400">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={16} className={isActive ? "text-[hsl(var(--theme-base)/0.7)]" : "text-white/20"} />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-[hsl(var(--theme-base)/0.1)] border-[hsl(var(--theme-base)/0.2)] text-[hsl(var(--theme-base))] hover:bg-[hsl(var(--theme-base)/0.2)]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                {isExpanded ? <><span>Hide Highlights</span><ChevronUp size={14} /></> : <><span>View Highlights</span><ChevronDown size={14} /></>}
              </button>
            </div>
          )}
        </SimpleCard>
      </div>
    </div>
  );
}

function About() {
  const { content, loading, activeRole } = useContent();
  const [activeTab, setActiveTab] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (content?.about?.tabs?.length > 0) {
      setActiveTab(content.about.tabs[0].label);
    }
  }, [activeRole, content]);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSocialMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => { setHoveredIndex(null); }, [activeTab]);

  if (loading || !activeTab) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        {content?.global?.labels?.loading || "Loading..."}
      </div>
    );
  }

  const { about, global, home } = content;
  const { meta, description, tabs } = about;

  let activeTabData = tabs[0];
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].label === activeTab) { activeTabData = tabs[i]; break; }
  }

  const presentLabel = global.labels.present;

  // ── Hero: CV download + social menu ──
  const heroAction = (
    <>
      <PrimaryButton
        href={global.resume.file}
        target="_blank"
        icon={<Download size={18} />}
        tooltipTitle={about.cvCta.tooltipTitle}
        tooltipDesc={about.cvCta.tooltipDesc}
      >
        {about.cvCta.label}
      </PrimaryButton>
      <div className="relative" ref={menuRef}>
        <IconButton
          icon={MoreVertical}
          theme="neutral"
          onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
          aria-label={global.labels.moreOptions}
          size="lg"
          className={isSocialMenuOpen ? "!bg-secondary !border-white/20" : ""}
        />
        {isSocialMenuOpen && (
          <div className="absolute bottom-full mb-3 left-0 min-w-[200px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-300 z-[110]">
            <div className="flex flex-col gap-1">
              <div className="px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{global.labels.socialProfiles}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 px-2 pb-2">
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
                      style={{ animationDelay: `${idx * 50}ms` }}
                      onClick={() => setIsSocialMenuOpen(false)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // ── Timeline tabs ──
  const timelineTabs = (
    <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
      <div className="sticky top-4 z-20 w-full lg:w-1/4 flex-shrink-0">
        <div className="flex flex-row lg:flex-col gap-1.5 p-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-x-auto lg:overflow-visible hide-scrollbar">
          {tabs.map(function (tab) {
            const TabIcon = getIcon(tab.icon);
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={
                  "relative group flex flex-col lg:flex-row items-center lg:items-start lg:justify-start justify-center gap-2 lg:gap-3 rounded-xl transition-all duration-300 " +
                  "min-w-[85px] lg:min-w-0 w-full py-2 px-2 lg:px-3 lg:py-3 text-center lg:text-left " +
                  (isActive
                    ? "text-[hsl(var(--theme-base))] bg-white/5 scale-105 lg:scale-100 lg:bg-white/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5")
                }
              >
                <div className={"flex shrink-0 items-center justify-center w-10 h-10 rounded-lg transition-colors " + (isActive ? "bg-[hsl(var(--theme-base))/0.1]" : "bg-white/5")}>
                  {TabIcon && <TabIcon size={18} className={"transition-transform " + (isActive ? "scale-110" : "group-hover:scale-110")} />}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider mt-1 lg:mt-0 lg:self-center">{tab.label}</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[hsl(var(--theme-base))] rounded-l-full hidden lg:block" />}
                {isActive && <div className="tab-dot lg:hidden" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative pb-10 min-h-[500px] flex-1 w-full">
        <AnimatePresence mode="wait">
          {activeTabData && (
            <motion.div
              key={activeTabData.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {activeTabData.timelineDescription && (
                <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--theme-base)/0.1)] flex items-center justify-center text-[hsl(var(--theme-base))] shrink-0">
                    {React.createElement(getIcon(activeTabData.icon), { size: 20 })}
                  </div>
                  <p className="leading-relaxed mt-1">{activeTabData.timelineDescription}</p>
                </div>
              )}
              {activeTabData.items.map(function (item, index) {
                const date = item.date || presentLabel;
                const isLast = index === activeTabData.items.length - 1;
                const ItemIcon = getIcon(activeTabData.itemIcon);
                const isActive = hoveredIndex === null ? index === 0 : hoveredIndex === index;
                return (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    date={date}
                    percentage={item.percentage}
                    points={item.points}
                    link={item.link}
                    isLast={isLast}
                    itemIcon={ItemIcon}
                    calendarIcon={Calendar}
                    isActive={isActive}
                    onMouseEnter={() => setHoveredIndex(index)}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // ── What I Deliver section (restored — this is core About content) ──
  const whatIDeliverSection = home?.whatIDeliver ? (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-6 py-20 lg:px-16 relative z-10 border-t border-white/5"
    >
      <motion.div variants={fadeInUp} className="mb-12">
        <p className="text-sm font-mono tracking-widest text-[hsl(var(--theme-base))] mb-2 uppercase">Core Principles</p>
        <h3 className="text-4xl font-bold text-white tracking-tight">{home.whatIDeliver.title}</h3>
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
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--theme-base)/0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[hsl(var(--theme-base))] mb-6 group-hover:scale-110 group-hover:bg-[hsl(var(--theme-base)/0.2)] transition-all duration-300 shadow-[0_0_20px_transparent] group-hover:shadow-[0_0_20px_hsl(var(--theme-base)/0.2)]">
                  {BlockIcon && <BlockIcon size={26} />}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[hsl(var(--theme-base)/0.9)] transition-colors">{block.title}</h4>
                <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{block.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  ) : null;

  // ── Why I'm Different section (restored) ──
  const differentiatorSection = home?.differentiator ? (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-6 py-20 lg:px-16 relative z-10 border-t border-white/5"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <motion.div variants={fadeInUp} className="lg:w-1/3 flex-shrink-0">
          <p className="text-sm font-mono tracking-widest text-[hsl(var(--theme-base))] mb-2 uppercase">Secret Sauce</p>
          <h3 className="text-4xl font-bold text-white tracking-tight mb-4">{home.differentiator.title}</h3>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-2/3 flex-1 flex flex-col justify-center">
          <div className="space-y-6 text-lg text-white/70 font-medium leading-relaxed">
            {home.differentiator.points.map((pt, i) => (
              <div key={i} className="flex gap-4 group">
                <span className="text-[hsl(var(--theme-base))] mt-1 shrink-0 group-hover:scale-125 transition-transform">
                  <ChevronRight className="w-5 h-5" />
                </span>
                <p className={i >= 3 ? "text-white" : ""}>{pt}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  ) : null;

  // ── Testimonials section (restored) ──
  const testimonialsSection = home?.testimonials ? (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-6 py-20 lg:px-16 relative z-10 border-t border-white/5"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div variants={fadeInUp} className="max-w-2xl">
          <p className="text-sm font-mono tracking-widest text-[hsl(var(--theme-base))] mb-2 uppercase">Recommendations</p>
          <h3 className="text-4xl font-bold text-white tracking-tight mb-4">{home.testimonials.title}</h3>
          <p className="text-lg text-white/50">{home.testimonials.subtitle}</p>
        </motion.div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {home.testimonials.items.map((testimonial, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] relative group hover:border-[hsl(var(--theme-base)/0.3)] transition-colors"
          >
            <div className="absolute top-6 right-6 text-white/10 group-hover:text-[hsl(var(--theme-base)/0.2)] transition-colors">
              <Quote size={40} />
            </div>
            <p className="text-white/80 leading-relaxed mb-8 relative z-10 text-sm md:text-base">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="font-bold text-white">{testimonial.name}</h5>
                <p className="text-xs text-[hsl(var(--theme-base))]">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ) : null;

  const allSections = (
    <div className="space-y-0">
      {timelineTabs}
      {whatIDeliverSection}
      {differentiatorSection}
      {testimonialsSection}
    </div>
  );

  return (
    <PageLayout
      themeName={meta.theme}
      title={meta.title}
      letter={meta.letter}
      icon={meta.icon}
      description={description.join(" ")}
      action={heroAction}
      right={allSections}
    />
  );
}

export default About;
