import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import IconButton from "./IconButton";
import { themes } from "../theme";

export function GlowCard(props) {
  const variant = props.variant;
  const letter = props.letter;
  const title = props.title;
  const description = props.description;
  const to = props.to;
  const Icon = props.icon;
  const className = props.className || "";
  const size = props.size || "normal";
  const isHovered = props.isHovered || false;
  const isDimmed = props.isDimmed || false;

  const styles = themes[variant];

  // Logic for size class
  let sizeClass = "h-[170px] lg:h-[240px]";
  if (size === "large") {
    sizeClass = "h-[190px] lg:h-[310px]";
  }

  // Logic for dimmed class
  let dimmedClass = "opacity-100";
  if (isDimmed) {
    dimmedClass = "opacity-40 scale-95";
  }

  // Logic for hovered scale
  let hoveredClass = "";
  if (isHovered) {
    hoveredClass = "scale-[0.98]";
  }

  // Logic for box shadow
  let boxShadowValue = undefined;
  if (isHovered) {
    boxShadowValue = "0 0 100px 30px hsl(var(--" + variant + ") / 0.4)";
  }

  return (
    <Link to={to} className={"block " + className}>
      <div
        className={
          "glow-card-hover group relative flex flex-col justify-between " +
          sizeClass +
          " rounded-2xl lg:rounded-3xl cursor-pointer overflow-hidden p-4 lg:p-6 " +
          "transition-all duration-300 " +
          styles.glowClass +
          " " +
          dimmedClass +
          " " +
          hoveredClass
        }
        style={{
          boxShadow: boxShadowValue,
        }}
      >
        <div
          className={
            "absolute -right-8 top-2 " +
            "select-none pointer-events-none " +
            "transition-all duration-300 ease-out " +
            "mix-blend-screen " +
            styles.letterColor
          }
          style={{
            filter: isHovered ? "drop-shadow(0 0 40px currentColor)" : "none",
            opacity: isHovered ? 0.7 : 0.3,
            transform: isHovered
              ? "scale(1.15) rotate(-4deg) translateY(-4px)"
              : "scale(1) rotate(0deg) translateY(0)",
          }}
        >
          {Icon && <Icon className="w-[10rem] h-auto" strokeWidth={0.7} />}
        </div>

        <IconButton
          icon={ArrowRight}
          theme={variant}
          className={
            "absolute bottom-0 right-0 !rounded-tr-none !rounded-bl-none !rounded-tl-3xl border-t-0 border-r-0 z-20 " +
            "opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"
          }
        />

        <div className="relative overflow-hidden mb-4">
          <IconButton icon={Icon} theme={variant} isNavCard={true} />
        </div>

        <div className="relative z-10">
          <h3 className={"type-card-title mb-1 " + styles.text}>{title}</h3>
          <p className="type-body-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
