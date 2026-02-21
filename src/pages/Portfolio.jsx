import React, { useRef, useEffect } from "react";
import { PageLayout } from "../components/PageLayout";
import { useContent } from "../context/ContentContext";
import PrimaryButton from "../components/PrimaryButton";
import IconButton from "../components/IconButton";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { getIcon } from "../utils/iconMap";

function Portfolio() {
  const { content, loading, activeRole } = useContent();
  const [activeId, setActiveId] = React.useState(null);
  const isDesktop = useIsDesktop();
  const carouselRef = useRef(null);

  // Reset activeId when role changes or content loads
  useEffect(() => {
    if (content?.portfolio?.projects?.length > 0) {
      setActiveId(content.portfolio.projects[0].id);
    }
  }, [activeRole, content]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        navigateProject(-1);
      } else if (e.key === "ArrowRight") {
        navigateProject(1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [content, activeId]);

  if (loading || activeId === null) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        {content?.global?.labels?.loading || "Loading..."}
      </div>
    );
  }

  const { portfolio, global, contact } = content;
  const { meta, projects } = portfolio;

  // Safe fallbacks for missing data
  const cta = portfolio.cta || {
    label: "Explore Project",
    arrow: "↗",
    tooltipTitle: "Production Build",
    tooltipDesc: "View the live application or case study.",
  };

  const labels = portfolio.labels || {
    projectThumbnails: "Project Previews",
    scrollLeft: "Scroll left",
    scrollRight: "Scroll right",
    prevProject: "Previous",
    nextProject: "Next",
    moreTags: "More",
    connect: "Connect",
  };

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;

    // Calculate center of the visible area
    const centerPosition = scrollLeft + containerWidth / 2;

    // Find the card whose center is closest to the centerPosition
    let minDistance = Infinity;
    let activeIndex = 0;

    Array.from(container.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(centerPosition - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        activeIndex = index;
      }
    });

    if (projects[activeIndex] && projects[activeIndex].id !== activeId) {
      setActiveId(projects[activeIndex].id);
    }
  };

  const portfolioStrings = {
    ctaLabel: cta.label,
    ctaArrow: cta.arrow,
    thumbsLabel: labels.projectThumbnails,
    thumbLeftLabel: labels.scrollLeft,
    thumbRightLabel: labels.scrollRight,
  };

  // Logic to find active project
  let activeProject = projects[0];
  let activeIndex = 0;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === activeId) {
      activeProject = projects[i];
      activeIndex = i;
      break;
    }
  }

  function scrollThumbs(direction) {
    const thumbs = document.getElementById("portfolio-thumbs");
    if (thumbs) {
      const shift = Math.max(220, thumbs.clientWidth * 0.6);
      thumbs.scrollBy({ left: direction * shift, behavior: "smooth" });
    }
  }

  function navigateProject(direction) {
    if (!projects || projects.length <= 1) return;
    const currentIndex = projects.findIndex((p) => p.id === activeId);
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) nextIndex = projects.length - 1;
    if (nextIndex >= projects.length) nextIndex = 0;

    setActiveId(projects[nextIndex].id);

    // Scroll carousel on mobile if navigated via code (e.g., keyboard if connected)
    if (!isDesktop && carouselRef.current) {
      carouselRef.current.scrollTo({
        left: nextIndex * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }

  // Desktop Left Content / Main Carousel Container for Mobile
  const mainContent = isDesktop ? (
    <div style={{ "--accent": activeProject.accent }}>
      <div className="portfolio-main-card h-[490px]">
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-500"
          style={{ background: activeProject.accent }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px circle at 20% 20%, " +
              activeProject.accent +
              "25, transparent 45%)",
          }}
        />

        <div className="relative z-10 grid lg:grid-cols-2 h-full min-h-[460px]">
          {/* Floating Navigation Arrows */}
          <button
            onClick={() => navigateProject(-1)}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/60 text-white/50 hover:text-white hover:scale-110 transition-all backdrop-blur-xl hidden md:flex items-center justify-center group/nav"
            style={{
              boxShadow:
                activeId === projects[0].id
                  ? "none"
                  : `0 0 30px 2px ${activeProject.accent}44`,
            }}
            aria-label={labels.prevProject}
          >
            <ChevronLeft className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => navigateProject(1)}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/60 text-white/50 hover:text-white hover:scale-110 transition-all backdrop-blur-xl hidden md:flex items-center justify-center group/nav"
            style={{
              boxShadow:
                activeId === projects[projects.length - 1].id
                  ? "none"
                  : `0 0 30px 2px ${activeProject.accent}44`,
            }}
            aria-label={labels.nextProject}
          >
            <ChevronRight className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform" />
          </button>

          <div className="p-8 lg:p-14 flex flex-col justify-start">
            <div className="relative mb-6 w-fit">
              <div
                className="absolute inset-0 blur-lg opacity-40 rounded-full"
                style={{ backgroundColor: activeProject.accent }}
              />
              <div
                className="relative flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-black/40 text-md font-bold"
                style={{ color: activeProject.accent }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="portfolio-title text-3xl lg:text-5xl font-bold tracking-tight text-white">
                {activeProject.title}
              </h2>

              <p className="portfolio-desc text-gray-400 text-lg leading-relaxed line-clamp-3">
                {activeProject.description}
              </p>

              <div className="portfolio-tags pt-5">
                {activeProject.tags.map(function (tag) {
                  return (
                    <span key={tag} className="portfolio-tag">
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="relative group overflow-hidden rounded-3xl rounded-l-none isolate transition-all duration-500 bg-black/40 h-[300px] lg:min-h-full border-l border-white/5"
            style={{
              transform: "translateZ(0)",
              WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            }}
          >
            <img
              src={activeProject.thumbnail}
              alt={activeProject.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            <PrimaryButton
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              containerClass="absolute right-[1.6rem] bottom-[1.4rem] z-30"
              tooltipAlign="left"
              icon={portfolioStrings.ctaArrow}
              tooltipTitle={cta.tooltipTitle}
              tooltipDesc={cta.tooltipDesc}
            >
              {portfolioStrings.ctaLabel}
            </PrimaryButton>

            <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-black/65 via-black/35 to-transparent z-10" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    /* Mobile Carousel */
    /* Mobile Carousel */
    <div className="space-y-8">
      <div
        ref={carouselRef}
        className="flex w-screen overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-6 items-stretch pb-0 lg:pb-4 relative -left-6 -mt-6"
        style={{ scrollBehavior: "smooth", overscrollBehaviorX: "contain" }}
        onScroll={handleScroll}
      >
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="snap-center shrink-0 w-[calc(100vw-3rem)] max-w-[400px] flex justify-center"
          >
            <div
              className="portfolio-main-card h-full border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col"
              style={{ "--accent": project.accent }}
            >
              <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/50 text-xs font-bold backdrop-blur-md"
                  style={{ color: project.accent }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              <div className="p-5 pb-6 lg:p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 lg:line-clamp-4">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pb-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] text-white/30 self-center font-medium ml-1">
                      + {project.tags.length - 3} {labels.moreTags}
                    </span>
                  )}
                </div>

                <PrimaryButton
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  containerClass="w-full mt-4"
                  className="w-full justify-center !py-3 !rounded-xl"
                  icon={portfolioStrings.ctaArrow}
                >
                  {portfolioStrings.ctaLabel}
                </PrimaryButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center items-center gap-4 relative z-20 -left-6">
        {projects.map((project, idx) => (
          <button
            key={`dot-${project.id}`}
            onClick={() => {
              if (carouselRef.current) {
                // Scroll to specific card
                const card = carouselRef.current.children[idx];
                if (card) {
                  const scrollLeft =
                    card.offsetLeft -
                    (carouselRef.current.offsetWidth - card.offsetWidth) / 2;
                  carouselRef.current.scrollTo({
                    left: scrollLeft,
                    behavior: "smooth",
                  });
                }
              }
            }}
            className={`h-2 transition-all duration-300 rounded-full ${
              activeId === project.id
                ? "w-8"
                : "w-2 bg-white/10 hover:bg-white/30"
            }`}
            style={{
              backgroundColor:
                activeId === project.id ? project.accent : undefined,
            }}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );

  // Desktop Thumbnails / Mobile Navigation Bar Content
  const footerContent = isDesktop ? (
    <div
      className="mobile-sticky-bar lg:px-0 !p-3 lg:bg-transparent lg:border-none lg:shadow-none"
      style={{ "--accent": activeProject.accent }}
    >
      <div
        className={
          "portfolio-thumbs-shell w-full" +
          (projects.length > 4 ? "" : " no-nav")
        }
        role="tablist"
        aria-label={portfolioStrings.thumbsLabel}
      >
        {projects.length > 4 && (
          <button
            type="button"
            className="portfolio-thumb-nav"
            aria-label={portfolioStrings.thumbLeftLabel}
            onClick={() => scrollThumbs(-1)}
          >
            ←
          </button>
        )}

        <div className="portfolio-thumbs" id="portfolio-thumbs">
          {projects.map(function (project) {
            const isActive = project.id === activeProject.id;
            return (
              <button
                key={project.id}
                type="button"
                className={"portfolio-thumb" + (isActive ? " is-active" : "")}
                style={{ "--accent": project.accent }}
                onClick={() => {
                  setActiveId(project.id);
                  const thumbs = document.getElementById("portfolio-thumbs");
                  if (thumbs) {
                    // Center thumb
                  }
                }}
                aria-pressed={isActive}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>

        {projects.length > 4 && (
          <button
            type="button"
            className="portfolio-thumb-nav"
            aria-label={portfolioStrings.thumbRightLabel}
            onClick={() => scrollThumbs(1)}
          >
            →
          </button>
        )}
      </div>
    </div>
  ) : (
    /* Mobile Sticky Bar: Contact & Social */
    <div className="mobile-sticky-bar w-full">
      <PrimaryButton
        href={`https://wa.me/${contact.info.find((i) => i.label === "Phone")?.value?.replace(/\D/g, "") || "919876543210"}`}
        theme="emerald"
        containerClass="flex-1"
        icon={<MessageSquare className="w-4 h-4" />}
      >
        {labels.connect}
      </PrimaryButton>

      <div className="flex gap-2">
        {global.socialLinks.map((link) => {
          const Icon = getIcon(link.icon);
          return (
            <IconButton
              key={link.id}
              icon={Icon}
              theme="neutral"
              href={link.url}
              className="!w-12 !h-12 !rounded-xl"
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <PageLayout
      themeName={meta.theme}
      title={meta.title}
      letter={meta.letter}
      icon={meta.icon}
      headerContent={footerContent}
    >
      {mainContent}
    </PageLayout>
  );
}
export default Portfolio;
