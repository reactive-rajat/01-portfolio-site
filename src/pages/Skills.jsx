import React, { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { Code2, Layers, Bot, ChevronRight } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motionVariants";

// Map category IDs to their icon
const CATEGORY_ICONS = {
  "frontend": Code2,
  "backend": Layers,
  "tools": Bot,
};

function getIconForCategory(id) {
  return CATEGORY_ICONS[id] || Code2;
}

function SkillPill({ item }) {
  return (
    <span className="tech-pill group-hover:border-[hsl(var(--theme-base)/0.55)] group-hover:bg-[hsl(var(--theme-base)/0.12)] group-hover:text-[hsl(var(--theme-base))] transition-all duration-250 cursor-default select-none">
      {item}
    </span>
  );
}

function Skills() {
  const { content, loading } = useContent();
  const [activeTabId, setActiveTabId] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        {content?.global?.labels?.loading || "Loading..."}
      </div>
    );
  }

  const { skills: skillsData } = content;
  const { meta, skillGroups } = skillsData;
  
  // Set default active tab
  if (skillGroups?.length > 0 && !activeTabId) {
    setActiveTabId(skillGroups[0].id);
  }

  const activeGroup = skillGroups?.find(g => g.id === activeTabId) || skillGroups?.[0];

  const mainContent = (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16">
      {/* Left Column - Category Tabs */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="lg:col-span-5 space-y-4"
      >
        {skillGroups?.map((group) => {
          const Icon = getIconForCategory(group.id);
          const isActive = activeTabId === group.id;

          return (
            <motion.button
              key={group.id}
              variants={fadeInUp}
              onClick={() => setActiveTabId(group.id)}
              className={`w-full group relative p-6 rounded-2xl border transition-all duration-400 overflow-hidden text-left flex items-center justify-between backdrop-blur-md ${
                isActive
                  ? "border-[hsl(var(--theme-base))] bg-black shadow-[0_0_25px_2px_hsl(var(--theme-base))]"
                  : "border-white/10 bg-white/[0.02] hover:bg-[hsl(var(--theme-base)/0.1)] hover-glow"
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300 shrink-0 ${
                  isActive
                    ? "bg-[hsl(var(--theme-base)/0.2)] border border-[hsl(var(--theme-base)/0.4)] text-[hsl(var(--theme-base))]"
                    : "bg-white/5 border border-white/10 text-white/50 group-hover:bg-[hsl(var(--theme-base)/0.1)] group-hover:text-[hsl(var(--theme-base))]"
                }`}>
                  <Icon size={18} />
                </div>
                <h3 className={`text-sm font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/50 group-hover:text-white"
                }`}>
                  {group.title}
                </h3>
              </div>
              <div className={`relative z-10 transition-all duration-300 ${
                isActive ? "text-[hsl(var(--theme-base))] translate-x-0 opacity-100" : "text-white/20 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}>
                <ChevronRight size={20} />
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Right Column - Detail View */}
      <motion.div
        className="lg:col-span-7 relative min-h-[400px]"
      >
        <AnimatePresence mode="wait">
          {activeGroup && (
            <motion.div
              key={activeGroup.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Pills Block */}
              <div className="group relative p-7 rounded-2xl border border-[hsl(var(--theme-base)/0.4)] shadow-[0_0_25px_2px_hsl(var(--theme-base)/0.1)] bg-black backdrop-blur-md overflow-hidden transition-all duration-500 hover-glow">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--theme-base))]">
                      Technologies
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeGroup.pills.map((item) => (
                      <SkillPill key={item} item={item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Capabilities Block */}
              <div className="group relative p-7 rounded-2xl border border-[hsl(var(--theme-base)/0.4)] shadow-[0_0_25px_2px_hsl(var(--theme-base)/0.1)] bg-black backdrop-blur-md overflow-hidden transition-all duration-500 h-full hover-glow">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--theme-base))]">
                      Capabilities
                    </h3>
                  </div>
                  <div className="space-y-5 mt-2 flex-1">
                    {activeGroup.points.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <ChevronRight size={16} strokeWidth={3} className="text-[hsl(var(--theme-base))] shrink-0 mt-0.5 opacity-80 transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="text-white/50 leading-relaxed text-[0.95rem] transition-colors duration-300 group-hover:text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  return (
    <PageLayout
      themeName={meta.theme}
      title={meta.title}
      letter={meta.letter}
      icon={meta.icon}
      right={mainContent}
    />
  );
}

export default Skills;
