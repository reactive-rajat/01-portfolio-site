import React from "react";
import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { Workflow, Code2, Palette, Sparkles } from "lucide-react";

const roleConfig = {
  product_engineer_hybrid: {
    icon: Workflow,
    label: "Product Engineer",
    shortLabel: "Hybrid",
    color: "violet",
    glow: "rgba(138, 43, 226, 0.3)",
  },
  frontend_engineer: {
    icon: Code2,
    label: "Frontend Engineer",
    shortLabel: "Frontend",
    color: "coral",
    glow: "rgba(255, 127, 80, 0.3)",
  },
  product_designer: {
    icon: Palette,
    label: "Product Designer",
    shortLabel: "Designer",
    color: "sky",
    glow: "rgba(0, 191, 255, 0.3)",
  },
};

const RoleSwitcher = () => {
  const { activeRole, setActiveRole, roles } = useContent();

  if (!roles || roles.length === 0) return null;

  return (
    <div className="relative p-1 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="relative flex items-center">
        {/* Dynamic Indicator */}
        <motion.div
          className="absolute inset-y-0 rounded-xl shadow-lg border border-white/10"
          initial={false}
          animate={{
            left:
              (Math.max(0, roles.indexOf(activeRole)) * 100) / roles.length +
              "%",
            width: 100 / roles.length + "%",
            backgroundColor:
              roleConfig[activeRole]?.glow.replace("0.3", "0.2") ||
              "rgba(255,255,255,0.1)",
            boxShadow: `0 0 20px ${roleConfig[activeRole]?.glow || "rgba(255,255,255,0.1)"}`,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />

        {roles.map((role) => {
          const config = roleConfig[role] || {
            icon: Code2,
            label: role,
            color: "white",
            glow: "rgba(255,255,255,0.1)",
          };
          const Icon = config.icon;
          const isActive = activeRole === role;

          return (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              title={config.label}
              className={`relative flex-1 flex items-center justify-center gap-2.5 px-3 sm:px-4 lg:px-6 py-2.5 rounded-xl transition-all duration-300 min-w-[50px] sm:min-w-[100px] lg:min-w-[140px] z-10 group ${
                isActive ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              <div className="flex items-center justify-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <Icon
                    size={16}
                    className={`transition-all duration-500 ${
                      isActive
                        ? "scale-110 rotate-[360deg] text-white"
                        : "group-hover:scale-110"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="sparkle"
                      className="absolute -top-2 -right-2 text-yellow-400"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Sparkles size={8} fill="currentColor" />
                    </motion.div>
                  )}
                </div>
                {/* Responsive Labels */}
                <span className="text-[12px] font-bold tracking-widest uppercase font-mono whitespace-nowrap overflow-hidden">
                  <span className="hidden lg:inline">{config.label}</span>
                  <span className="hidden sm:inline lg:hidden">
                    {config.shortLabel}
                  </span>
                </span>
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSwitcher;
