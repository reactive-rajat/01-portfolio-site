import React from "react";
import { PageLayout } from "../components/PageLayout";
import { Code2, Layers, Palette, Bot, CheckCircle } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motionVariants";

// Map category titles to their icon and a decorative label
const CATEGORY_META = {
  "Frontend Engineering": {
    Icon: Code2,
    label: "Frontend",
    decorSize: "w-28 h-28",
  },
  "Design Systems": {
    Icon: Layers,
    label: "Systems",
    decorSize: "w-28 h-28",
  },
  "UI & Interaction Design": {
    Icon: Palette,
    label: "Design",
    decorSize: "w-28 h-28",
  },
  "AI & Workflow Tools": {
    Icon: Bot,
    label: "AI Tools",
    decorSize: "w-28 h-28",
  },
};

// Fallback for any unrecognised category
function getIconForCategory(title) {
  return CATEGORY_META[title]?.Icon || Code2;
}

function SkillPill({ item }) {
  return (
    <span
      className="tech-pill hover:border-[hsl(var(--theme-base)/0.55)] hover:bg-[hsl(var(--theme-base)/0.12)] hover:text-[hsl(var(--theme-base))] transition-all duration-250 cursor-default select-none"
    >
      {item}
    </span>
  );
}

function CategoryCard({ cat, index }) {
  const CategoryIcon = getIconForCategory(cat.title);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="group relative p-7 rounded-2xl border border-white/10 hover-glow bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-500"
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--theme-base)/0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative large icon — top right */}
      <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none">
        <CategoryIcon className="w-28 h-28 text-[hsl(var(--theme-base))]" />
      </div>

      <div className="relative z-10">
        {/* Category header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(var(--theme-base)/0.1)] border border-[hsl(var(--theme-base)/0.2)] text-[hsl(var(--theme-base))] group-hover:bg-[hsl(var(--theme-base)/0.18)] transition-colors duration-300 shrink-0">
            <CategoryIcon size={18} />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[hsl(var(--theme-base))]">
            {cat.title}
          </h3>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-2">
          {cat.items.map((item) => (
            <SkillPill key={item} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Skills() {
  const { content, loading } = useContent();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-white">
        {content?.global?.labels?.loading || "Loading..."}
      </div>
    );
  }

  const { skills: skillsData } = content;
  const { meta } = skillsData;

  // ── New schema: categories ──
  if (Array.isArray(skillsData.categories)) {
    const categories = skillsData.categories;
    const closingNote = skillsData.closingNote;

    const mainContent = (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, index) => (
            <CategoryCard key={cat.title} cat={cat} index={index} />
          ))}
        </div>

        {closingNote && (
          <motion.div
            variants={fadeInUp}
            className="flex items-start gap-3 px-5 py-4 rounded-2xl border border-[hsl(var(--theme-base)/0.15)] bg-[hsl(var(--theme-base)/0.04)]"
          >
            <CheckCircle className="w-5 h-5 text-[hsl(var(--theme-base))] shrink-0 mt-0.5" />
            <p className="type-body-sm text-white/50 italic">
              {closingNote}
            </p>
          </motion.div>
        )}
      </motion.div>
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

  // ── Legacy schema: levels + tools + craft ──
  const levels = skillsData.levels || [];
  const tools = skillsData.tools || [];
  const craft = skillsData.craft || [];

  const legacyContent = (
    <div className="space-y-8">
      {levels.map(function (category) {
        return (
          <div key={category.label} className="space-y-4">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(var(--theme-base))]">
              {category.label}
            </span>
            <div className="grid sm:grid-cols-2 gap-4" style={{ marginTop: "0.8rem" }}>
              {category.skills.map(function (skill) {
                return (
                  <div
                    key={skill.name}
                    className="simple-card p-5 pt-3.5"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="type-body font-semibold text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full max-w-[200px] bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[hsl(var(--theme-base))] transition-all duration-1000 ease-out shadow-[0_0_12px_hsl(var(--theme-base)/0.5)]"
                        style={{ width: skill.percentage + "%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {tools.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(var(--theme-base))]">
            {skillsData.labels?.tools || "Tools"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map(function (tool) {
              return <SkillPill key={tool} item={tool} />;
            })}
          </div>
        </div>
      )}

      {craft.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(var(--theme-base))]">
            {skillsData.labels?.craft || "Capabilities"}
          </h3>
          <div className="grid gap-3">
            {craft.map(function (item, i) {
              return (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--theme-base))] shrink-0 mt-0.5" />
                  <span className="text-white/60 leading-normal">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <PageLayout
      themeName={meta.theme}
      title={meta.title}
      letter={meta.letter}
      icon={meta.icon}
      right={legacyContent}
    />
  );
}

export default Skills;
