import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useIsDesktop } from "../hooks/useIsDesktop";

const MetaLogo = ({ className }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="28" height="28" fill="transparent" />
    <path d="M20.0953 4.30334C17.7994 4.30334 16.0047 6.03258 14.38 8.22925C12.1474 5.38654 10.2802 4.30334 8.04583 4.30334C3.49038 4.30334 0 10.2319 0 16.5068C0 20.4335 1.89967 22.9101 5.08158 22.9101C7.37171 22.9101 9.01877 21.8305 11.9468 16.7121C11.9468 16.7121 13.1674 14.5567 14.0071 13.0719C14.3013 13.547 14.6112 14.0589 14.9368 14.6077L16.3098 16.9175C18.9845 21.3933 20.4747 22.9101 23.1751 22.9101C26.2749 22.9101 28 20.3996 28 16.3913C28 9.82122 24.4309 4.30334 20.0953 4.30334ZM9.71403 15.3263C7.34006 19.0476 6.51879 19.8817 5.19707 19.8817C3.83685 19.8817 3.02841 18.6876 3.02841 16.5582C3.02841 12.0027 5.29973 7.34459 8.00733 7.34459C9.47357 7.34459 10.6989 8.19139 12.5757 10.8783C10.7936 13.6118 9.71403 15.3263 9.71403 15.3263ZM18.6737 14.8578L17.032 12.1198C16.5878 11.3973 16.1608 10.7322 15.7512 10.1246C17.2308 7.84091 18.4513 6.70298 19.9028 6.70298C22.9184 6.70298 25.3309 11.143 25.3309 16.5967C25.3309 18.6755 24.65 19.8817 23.2392 19.8817C21.8871 19.8817 21.2411 18.9887 18.6737 14.8578Z" />
  </svg>
);

const CertificationBadge = ({ name, issuer, date, url }) => {
  const isDesktop = useIsDesktop();

  return (
    <div className={(isDesktop ? "tooltip-wrapper " : "") + "relative"}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="cert-badge group inline-flex"
      >
        {/* Icon Wrapper */}
        <div className="cert-icon-box flex-shrink-0">
          <MetaLogo className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-sm text-white/90 group-hover:text-white transition-colors truncate">
            {name}
          </h3>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
        </div>
      </a>

      {isDesktop && (
        <div className="tooltip-panel">
          <span className="tooltip-title">{issuer}</span>
          <span className="tooltip-desc">
            Issued in {date}. Click to verify this professional credential on
            the official platform and view curriculum details.
          </span>
        </div>
      )}
    </div>
  );
};

export default CertificationBadge;
