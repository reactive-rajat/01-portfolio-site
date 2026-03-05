import React from "react";
import { PageLayout } from "../components/PageLayout";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useContent } from "../context/ContentContext";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motionVariants";

function SimpleCard(props) {
  const children = props.children;
  const className = props.className || "";
  return <div className={"simple-card " + className}>{children}</div>;
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

  const { skills: skillsData, home } = content;
  const { meta } = skillsData;

  // Support new schema (categories) and old schema (levels + tools + craft)
  const hasCategories = Array.isArray(skillsData.categories);
  const hasLevels = Array.isArray(skillsData.levels);

  const coreTechnologiesSection =
    home?.featuredSkills && skillsData.categories ? (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 py-24 lg:px-16 relative z-10 border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <p className="text-sm font-mono tracking-widest text-sky-400 mb-2 uppercase">
              Technical Arsenal
            </p>
            <h3 className="text-4xl font-bold text-white tracking-tight mb-4">
              {home.featuredSkills.title}
            </h3>
            <p className="text-lg text-white/50">{home.featuredSkills.subtitle}</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <PrimaryButton
              theme="sky"
              href="/skills"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {home.featuredSkills.ctaLabel}
            </PrimaryButton>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillsData.categories.slice(0, 2).map((cat, idx) => (
            <motion.div
              key={cat.title}
              variants={fadeInUp}
              className="p-8 rounded-3xl border border-sky-500/20 bg-sky-500/[0.03] backdrop-blur-md relative overflow-hidden group hover:border-sky-500/40 transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon
                  name={idx === 0 ? "Zap" : "Wrench"}
                  className="w-32 h-32 text-sky-400"
                />
              </div>

              <h4 className="text-lg font-bold uppercase tracking-[0.15em] text-sky-400 mb-6 relative z-10">
                {cat.title}
              </h4>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white/90 hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-300 transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    ) : null;

  // --- NEW SCHEMA: categories ---
  if (hasCategories) {
    const categories = skillsData.categories;
    const closingNote = skillsData.closingNote;

    return (
      <>
        {coreTechnologiesSection}
        <PageLayout
          themeName={meta.theme}
          title={meta.title}
          letter={meta.letter}
          icon={meta.icon}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <SimpleCard key={cat.title} className="p-6">
                <h3 className="text-base font-bold uppercase tracking-[0.15em] text-[hsl(var(--sky))] mb-5">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg border border-[hsl(var(--sky)/0.2)] bg-[hsl(var(--sky)/0.05)] text-sm font-medium text-[hsl(var(--sky))] hover:bg-[hsl(var(--sky)/0.12)] hover:border-[hsl(var(--sky)/0.4)] transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SimpleCard>
            ))}
          </div>

          {closingNote && (
            <div className="mt-8 flex items-start gap-3 px-6 py-5 rounded-2xl border border-[hsl(var(--sky)/0.15)] bg-[hsl(var(--sky)/0.04)]">
              <CheckCircle className="w-5 h-5 text-[hsl(var(--sky))] shrink-0 mt-0.5" />
              <p className="text-muted-foreground leading-relaxed italic">
                {closingNote}
              </p>
            </div>
          )}
        </PageLayout>
      </>
    );
  }

  // --- OLD SCHEMA: levels + tools + craft ---
  const levels = skillsData.levels || [];
  const tools = skillsData.tools || [];
  const craft = skillsData.craft || [];

  const leftContent = (
    <div className="space-y-10">
      {levels.map(function (category) {
        return (
          <div key={category.label} className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(var(--sky))]">
                {category.label}
              </span>
            </div>

            <div
              className="grid sm:grid-cols-2 gap-4"
              style={{ marginTop: "0.8rem" }}
            >
              {category.skills.map(function (skill) {
                return (
                  <SimpleCard key={skill.name} className="p-5 pt-3.5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-base font-semibold text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full max-w-[200px] bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[hsl(var(--sky))] transition-all duration-1000 ease-out shadow-[0_0_12px_hsl(var(--sky)/0.5)]"
                        style={{ width: skill.percentage + "%" }}
                      />
                    </div>
                  </SimpleCard>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  const rightContent = (
    <div className="space-y-8 mt-8">
      {tools.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {skillsData.labels?.tools || "Tools"}
          </h3>
          <div className="rounded-2xl border border-[hsl(var(--sky)/0.1)] bg-[hsl(var(--sky)/0.02)] p-6">
            <div className="flex flex-wrap gap-2">
              {tools.map(function (tool) {
                return (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg border border-[hsl(var(--sky)/0.2)] bg-[hsl(var(--sky)/0.05)] text-sm font-medium text-[hsl(var(--sky))] hover:bg-[hsl(var(--sky)/0.1)] transition-all cursor-default"
                  >
                    {tool}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {craft.length > 0 && (
        <section className="space-y-4 pt-1">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {skillsData.labels?.craft || "Capabilities"}
          </h3>
          <div className="rounded-2xl border border-[hsl(var(--sky)/0.1)] bg-[hsl(var(--sky)/0.02)] p-6 grid gap-4">
            {craft.map(function (item, i) {
              return (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-[hsl(var(--sky))] drop-shadow-[0_0_5px_hsl(var(--sky)/0.5)]" />
                  <span className="text-muted-foreground leading-normal">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );

  return (
    <>
      {coreTechnologiesSection}
      <PageLayout
        themeName={meta.theme}
        title={meta.title}
        letter={meta.letter}
        icon={meta.icon}
        left={leftContent}
        right={rightContent}
      />
    </>
  );
}

export default Skills;
