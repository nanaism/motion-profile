import { motion } from "framer-motion";
import { Briefcase, Home, Mail, User } from "lucide-react";
import type { NavItem } from "../types/navigation";

type NavbarProps = {
  handleTabClick: (label: NavItem) => void;
  isDesktop?: boolean;
};

export const Navbar = ({ handleTabClick, isDesktop = true }: NavbarProps) => {
  const navItems = [
    { icon: Home, label: "Profile" as const },
    { icon: User, label: "About" as const },
    { icon: Briefcase, label: "Skill" as const },
    { icon: Mail, label: "Contact" as const },
  ];

  // デスクトップモードとモバイルモードでスタイルを切り替え
  const containerClasses = isDesktop
    ? "space-y-4 relative"
    : "flex items-center justify-around flex-row w-full relative";

  const buttonClasses = isDesktop
    ? "w-12 h-12 rounded-full flex items-center justify-center border border-gray-700 relative z-10"
    : "w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 relative z-10";

  return (
    <nav className={containerClasses}>
      {navItems.map((item, i) => (
        <motion.button
          key={i}
          className={buttonClasses}
          aria-label={item.label}
          onClick={() => {
            handleTabClick(item.label);
          }}
          whileHover={{
            scale: isDesktop ? 1.6 : 1.3,
            y: isDesktop ? -3 : -2,
            transition: {
              scale: { duration: 0.2 },
              y: { type: "spring", stiffness: 300 },
            },
          }}
          transition={{
            scale: { duration: 0.3 },
          }}
        >
          <item.icon size={isDesktop ? 24 : 20} className="text-white" />
        </motion.button>
      ))}
    </nav>
  );
};

export default Navbar;
