import React from "react";
import { getIcon } from "../utils/iconMap";

/**
 * A generic Icon component that can render both Lucide and Custom icons.
 * Usage: <Icon name="Github" className="w-6 h-6" />
 */
const Icon = ({ name, className, size, ...props }) => {
  const IconComponent = getIcon(name);

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} size={size} {...props} />;
};

export default Icon;
