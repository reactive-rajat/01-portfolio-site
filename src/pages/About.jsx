import React from "react";
import { PageLayout } from "../components/PageLayout";
import IconButton from "../components/IconButton";
import { Download, Calendar, MoreVertical } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { getIcon } from "../utils/iconMap";
import PrimaryButton from "../components/PrimaryButton";

// Local component, renamed to avoid confusion
function SimpleCard(props) {
  const children = props.children;
  const className = props.className || "";
  const isActive = props.isActive;

  return (
    <div
      className={
        `simple-card transition-all duration-300 hover:-translate-y-1 ${
          isActive
            ? "border-orange-500/50 bg-orange-500/5 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)] translate-y-[-4px]"
            : "border-white/10 hover:border-orange-500/30 hover:shadow-[0_0_20px_-10px_rgba(249,115,22,0.1)]"
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
  const isLast = props.isLast;
  const ItemIcon = props.itemIcon;
  const CalendarIcon = props.calendarIcon;
  const isActive = props.isActive;
  const onMouseEnter = props.onMouseEnter;

  return (
    <div
      className="group relative flex gap-4 lg:gap-6 pb-8 lg:pb-12 last:pb-0"
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
        <SimpleCard className="p-4 lg:p-6" isActive={isActive}>
          <div className="flex flex-col-reverse justify-between gap-3 lg:gap-5 sm:flex-row sm:items-start">
            <h3
              className={`text-lg lg:text-xl font-semibold transition-colors duration-300 ${
                isActive
                  ? "text-[hsl(var(--coral))]"
                  : "text-white group-hover:text-[hsl(var(--coral))]/80"
              }`}
            >
              {title}
            </h3>
            <div
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors duration-300 ${
                isActive
                  ? "bg-orange-500/10 text-orange-200 border-orange-500/20"
                  : "bg-white/5 text-gray-300 border-white/5 group-hover:border-white/10"
              }`}
            >
              <CalendarIcon
                size={12}
                className={`transition-colors duration-300 ${
                  isActive ? "text-[hsl(var(--coral))]" : "text-gray-400"
                }`}
              />
              <span className="text-nowrap">{date}</span>
            </div>
          </div>

          <p className="text-sm font-medium text-gray-400 mt-2 lg:mt-2 transition-colors duration-300 group-hover:text-gray-300">
            {subtitle}
          </p>
          <p
            className={`${
              percentage
                ? "text-sm leading-relaxed text-gray-400 mt-2 lg:mt-4"
                : ""
            }`}
          >
            {percentage}
          </p>
        </SimpleCard>
      </div>
    </div>
  );
}

function About() {
  const { content, loading } = useContent();
  const [activeTab, setActiveTab] = React.useState("Experience");
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

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

  if (loading) {
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
      <div className="sticky top-4 z-10 mb-8 flex justify-center lg:justify-center">
        <div className="flex w-full lg:w-auto gap-1 rounded-full border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl shadow-xl">
          {tabs.map(function (tab) {
            const TabIcon = getIcon(tab.icon);
            let activeClass = "text-gray-400 hover:text-white";
            if (activeTab === tab.label) {
              activeClass =
                "bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20";
            }
            return (
              <button
                key={tab.label}
                onClick={function () {
                  setActiveTab(tab.label);
                }}
                className={
                  "flex w-full lg:w-auto lg:min-w-[160px] items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 " +
                  activeClass
                }
              >
                {TabIcon && <TabIcon size={16} />}
                {tab.label}
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
      left={leftContent}
      right={rightContent}
    />
  );
}

export default About;
