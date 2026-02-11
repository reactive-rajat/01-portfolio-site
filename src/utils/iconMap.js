import * as LucideIcons from "lucide-react";
import * as CustomIcons from "../icons";

/**
 * Mapping of explicitly imported Lucide icons.
 * This ensures only used icons are bundled if tree-shaking is working.
 */
const lucideMap = {
  User: LucideIcons.User,
  Zap: LucideIcons.Zap,
  Briefcase: LucideIcons.Briefcase,
  Mail: LucideIcons.Mail,
  Github: LucideIcons.Github,
  Linkedin: LucideIcons.Linkedin,
  Layers: LucideIcons.Layers,
  BookOpen: LucideIcons.BookOpen,
  GraduationCap: LucideIcons.GraduationCap,
  Phone: LucideIcons.Phone,
  MapPin: LucideIcons.MapPin,
  ExternalLink: LucideIcons.ExternalLink,
  MessageCircle: LucideIcons.MessageCircle,
  ArrowRight: LucideIcons.ArrowRight,
  MessageSquare: LucideIcons.MessageSquare,
};

/**
 * getIcon returns an icon component based on the name.
 * It searches in:
 * 1. The explicit Lucide map
 * 2. Custom icons in src/icons/index.js
 * 3. Fallback to HelpCircle if not found
 *
 * @param {string} iconName - The name of the icon (e.g., "Github", "Whatsapp")
 * @returns {React.ComponentType} - The icon component
 */
export const getIcon = (iconName) => {
  if (!iconName) return null;

  // 1. Try explicitly mapped Lucide icons
  if (lucideMap[iconName]) {
    return lucideMap[iconName];
  }

  // 2. Try the whole Lucide library (in case we forgot to map it)
  // Note: This might prevent tree-shaking if Vite doesn't optimize it,
  // but for a portfolio it's generally fine given the ease of use.
  if (LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }

  // 3. Try custom icons from src/icons
  if (CustomIcons[iconName]) {
    return CustomIcons[iconName];
  }

  // 3a. Case-insensitive / Capitalized check for custom icons
  const capitalized = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  if (CustomIcons[capitalized]) {
    return CustomIcons[capitalized];
  }

  // 4. Default fallback
  console.warn(`Icon "${iconName}" not found in Lucide or Custom icons.`);
  return LucideIcons.HelpCircle || LucideIcons.User;
};
