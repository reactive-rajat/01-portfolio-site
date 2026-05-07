import React from "react";
import { useLocation } from "react-router-dom";
import { useIsDesktop } from "../hooks/useIsDesktop";

function PrimaryButton(props) {
  const children = props.children;
  const href = props.href;
  const onClick = props.onClick;
  const className = props.className || "";
  const Icon = props.icon;
  const type = props.type || "button";
  const theme = props.theme;
  const tooltipAlign = props.tooltipAlign || "center"; // center, left, right
  const containerClass = props.containerClass || "";
  const isDesktop = useIsDesktop();

  const location = useLocation();
  const isPortfolioPage = location.pathname === "/portfolio";

  // Base classes for the button
  const isSecondary = theme === "neutral";
  const baseClasses =
    (isSecondary ? "secondary-btn " : "primary-btn ") + className;

  const style = {};
  if (theme && !isSecondary) {
    style["--accent"] = "hsl(var(--" + theme + "))";
  }

  const content = (
    <>
      {!isSecondary && <div className="btn-shine" />}
      <span className="relative z-[2] flex items-center justify-center gap-[0.85rem]">
        {children}
        {Icon && (
          <span
            className={isSecondary ? "secondary-btn-icon" : "primary-btn-icon"}
          >
            {Icon}
          </span>
        )}
      </span>
    </>
  );

  const tooltip =
    (props.tooltipTitle || props.tooltipDesc) && isDesktop ? (
      <div className="tooltip-panel">
        {props.tooltipTitle && (
          <span className="tooltip-title">{props.tooltipTitle}</span>
        )}
        {props.tooltipDesc && (
          <span className="tooltip-desc">{props.tooltipDesc}</span>
        )}
      </div>
    ) : null;

  const wrapperClasses = [
    tooltip && isDesktop ? "tooltip-wrapper " : "",
    tooltip && isDesktop && tooltipAlign !== "center"
      ? `tooltip-${tooltipAlign}`
      : "",
    tooltip && isPortfolioPage ? "" : "relative ",
    containerClass,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <div className={wrapperClasses}>
        <a
          href={href}
          className={baseClasses}
          target={props.target}
          rel={props.rel}
          download={props.download}
          style={style}
        >
          {content}
        </a>
        {tooltip}
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <button
        type={type}
        form={props.form}
        onClick={onClick}
        className={baseClasses}
        style={style}
      >
        {content}
      </button>
      {tooltip}
    </div>
  );
}

export default PrimaryButton;
