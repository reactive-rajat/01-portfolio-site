import React from "react";
import { PageLayout } from "../components/PageLayout";
import IconButton from "../components/IconButton";
import {
  Download,
  Calendar,
  MoreVertical,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import { getIcon } from "../utils/iconMap";
import PrimaryButton from "../components/PrimaryButton";

// Local component, renamed to avoid confusion
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
            ? "border-orange-500/50 bg-orange-500/5 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)] translate-y-[-4px]"
            : "border-white/10 hover:border-orange-500/30 hover:shadow-[0_0_20px_-10px_rgba(249,115,22,0.1)] hover:-translate-y-1"
        } ` + className
      }
    >
      {children}
    </div>
  );
}

function TimelineItem(props) {
  const title = props.title;
  const subtitle = props.subtitle;
  const date = props.date;
  const percentage = props.percentage;
  const points = props.points;
  const link = props.link;
  const isLast = props.isLast;
  const ItemIcon = props.itemIcon;
  const CalendarIcon = props.calendarIcon;
  const isActive = props.isActive;
  const onMouseEnter = props.onMouseEnter;
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      className="group relative flex gap-4 lg:gap-6 pb-5 last:pb-0"
      onMouseEnter={onMouseEnter}
    >
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-[#0a0a0a] transition-all duration-300 shadow-lg ${
            isActive
              ? "border-orange-500/50 text-orange-500 scale-110 shadow-orange-500/20"
              : "border-white/10 text-gray-400 group-hover:border-orange-500/30 group-hover:text-orange-400"
          }`}
        >
          {ItemIcon && <ItemIcon size={18} />}
        </div>
        {!isLast && (
          <div
            className={`h-full w-px bg-gradient-to-b transition-colors duration-300 ${
              isActive
                ? "from-orange-500/40 via-orange-500/10 to-transparent"
                : "from-white/10 to-transparent group-hover:from-orange-500/20"
            }`}
          />
        )}
      </div>
      <div className="w-full pt-1">
        <SimpleCard
          className="p-4 lg:p-6 relative group/card overflow-hidden"
          isActive={isActive}
          isClickable={!!link}
          onClick={
            link
              ? () => window.open(link, "_blank", "noopener,noreferrer")
              : undefined
          }
        >
          {/* Prominent Link Indicator */}
          {link && (
            <div
              className={`absolute top-0 right-0 z-10 flex h-10 w-11 items-center justify-center rounded-[16px] rounded-bl-[24px] rounded-tl-none rounded-br-none border border-r-0 border-t-0 transition-all duration-500 ${
                isActive
                  ? "border-orange-500/50 bg-orange-500/20 text-orange-400"
                  : "border-white/10 bg-white/5 text-gray-500 group-hover/card:border-orange-500/40 group-hover/card:bg-orange-500/10 group-hover/card:text-orange-400 group-hover/card:scale-110 group-hover/card:rotate-12"
              }`}
            >
              <ArrowUpRight size={20} />
            </div>
          )}

          <h3
            className={`text-lg lg:text-xl font-semibold transition-colors duration-300 pr-10 ${
              isActive
                ? "text-[hsl(var(--coral))]"
                : "text-white group-hover/card:text-[hsl(var(--coral))]/80"
            }`}
          >
            {title}
          </h3>

          <p className="text-sm font-medium text-gray-400 mt-2 lg:mt-2 transition-colors duration-300 group-hover:text-gray-300">
            {subtitle}
          </p>

          {/* Information Row: Date & Percentage */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4">
            <div className="inline-flex items-center gap-2.5 text-xs italic font-medium transition-colors duration-300">
              <CalendarIcon
                size={16}
                className={`transition-colors duration-300 ${isActive ? "text-[hsl(var(--coral))]" : ""}`}
              />
              <span
                className={`mt-[1px] ${isActive ? "text-[hsl(var(--coral))]" : ""}`}
              >
                {date}
              </span>
            </div>

            {percentage && (
              <div className="inline-flex items-center gap-2.5 text-xs italic font-medium transition-colors duration-300">
                <GraduationCap
                  size={16}
                  className={`transition-colors duration-300 ${isActive ? "text-orange-500/70" : "text-gray-500"}`}
                />
                <span
                  className={`${isActive ? "text-[hsl(var(--coral))]" : ""} mt-[1px]`}
                >
                  {percentage}
                </span>
              </div>
            )}
          </div>

          {/* List highlights: hidden by default */}
          {points && points.length > 0 && (
            <div className="mt-5">
              {isExpanded && (
                <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                  {points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-gray-400"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2
                          size={16}
                          className={
                            isActive ? "text-orange-500/70" : "text-white/20"
                          }
                        />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500/20"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                {isExpanded ? (
                  <>
                    <span>Hide Highlights</span>
                    <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    <span>View Highlights</span>
                    <ChevronDown size={14} />
                  </>
                )}
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

  // Reset activeTab when role changes or content loads
  React.useEffect(() => {
    if (content?.about?.tabs?.length > 0) {
      setActiveTab(content.about.tabs[0].label);
    }
  }, [activeRole, content]);

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

  // Reset hovered state when tab changes
  React.useEffect(() => {
    setHoveredIndex(null);
  }, [activeTab]);

  if (loading || !activeTab) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        {content?.global?.labels?.loading || "Loading..."}
      </div>
    );
  }

  const { about, global } = content;
  const { meta, description, tabs } = about;

  // Logic to find active tab data
  let activeTabData = tabs[0];
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].label === activeTab) {
      activeTabData = tabs[i];
    }
  }

  const presentLabel = global.labels.present;

  const leftContent = (
    <div className="space-y-10">
      <div className="space-y-4 lg:space-y-6 text-base lg:text-lg leading-relaxed text-gray-400">
        {description.map(function (para, i) {
          return <p key={i}>{para}</p>;
        })}
      </div>

      <div className="mobile-sticky-bar">
        <PrimaryButton
          href={global.resume.file}
          target="_blank"
          containerClass="flex-1 lg:flex-none"
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
            <div className="absolute bottom-full mb-3 right-0 lg:left-0 lg:right-auto min-w-[200px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-300 z-[110]">
              <div className="flex flex-col gap-1">
                <div className="px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    {global.labels.socialProfiles}
                  </p>
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
      </div>
    </div>
  );

  const rightContent = (
    <div className="relative mt-6 lg:mt-0">
      <div className="sticky top-4 z-20 mb-10 flex justify-center">
        <div className="grid w-full lg:w-2/3 grid-cols-[repeat(auto-fit,minmax(0,1fr))] justify-center gap-1.5 p-1 px-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
          {tabs.map(function (tab) {
            const TabIcon = getIcon(tab.icon);
            const isActive = activeTab === tab.label;

            return (
              <button
                key={tab.label}
                onClick={function () {
                  setActiveTab(tab.label);
                }}
                className={
                  "relative group flex flex-col items-center justify-center gap-1.5 rounded-xl transition-all duration-300 " +
                  "min-w-[85px] py-2 px-1 " +
                  (isActive
                    ? "text-orange-500 scale-105"
                    : "text-gray-400 hover:text-white")
                }
              >
                <div
                  className={
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-colors " +
                    (isActive ? "bg-orange-500/10" : "bg-white/5")
                  }
                >
                  {TabIcon && (
                    <TabIcon
                      size={18}
                      className={
                        "transition-transform " +
                        (isActive ? "scale-110" : "group-hover:scale-110")
                      }
                    />
                  )}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  {tab.label}
                </span>
                {isActive && <div className="tab-dot" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative pb-10">
        {activeTabData && (
          <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {activeTabData.items.map(function (item, index) {
              const date = item.date || presentLabel;
              const isLast = index === activeTabData.items.length - 1;
              const ItemIcon = getIcon(activeTabData.itemIcon);
              const isActive =
                hoveredIndex === null ? index === 0 : hoveredIndex === index;

              return (
                <TimelineItem
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  date={date}
                  percentage={item.percentage}
                  points={item.points}
                  link={item.link}
                  description={activeTabData.timelineDescription}
                  isLast={isLast}
                  itemIcon={ItemIcon}
                  calendarIcon={Calendar}
                  isActive={isActive}
                  onMouseEnter={() => setHoveredIndex(index)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <PageLayout
      themeName={meta.theme}
      title={meta.title}
      letter={meta.letter}
      icon={meta.icon}
      left={leftContent}
      right={rightContent}
    />
  );
}

export default About;
