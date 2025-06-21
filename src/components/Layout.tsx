import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { NavItem } from "../types/navigation";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  title: NavItem;
  handleTabClick: (label: NavItem) => void;
}

// 背景効果
export const Background = () => (
  <div className="absolute inset-0">
    {/* 点灯する背景グラデーション */}
    <div className="absolute top-0 left-0 h-full w-full">
      <div className="absolute top-10 left-1/4 h-96 w-96 animate-pulse rounded-full bg-teal-600 opacity-5 mix-blend-screen blur-3xl" />
      <div
        className="absolute bottom-10 right-1/4 h-80 w-80 animate-pulse rounded-full bg-indigo-500 opacity-5 mix-blend-screen blur-3xl"
        style={{ animationDelay: "2s", animationDuration: "7s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 animate-pulse rounded-full bg-purple-500 opacity-5 mix-blend-screen blur-3xl"
        style={{ animationDelay: "1s", animationDuration: "5s" }}
      />
    </div>
  </div>
);

export const Layout = ({ children, title, handleTabClick }: LayoutProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* 背景エフェクト */}
      <Background />

      {/* ヒーローコンテンツ */}
      <div className="container relative mx-auto flex min-h-screen items-center justify-center pb-20 sm:pb-0">
        <motion.div
          className="w-full max-w-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* titleがskillの時はH1はなし */}
          {title !== "Skill" && (
            <h1 className="text-5xl font-bold text-[#0cc0df] px-2 sm:px-0 sm:mb-8">
              {title}
            </h1>
          )}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-1 backdrop-blur-md shadow-lg">
            {/* ホバー時のグロー効果（発光） */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-teal-500/20 via-transparent to-teal-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative rounded-xl bg-gray-900/40 p-8">
              <div className="grid gap-8 md:grid-cols-12">
                {/* メインコンテンツ */}
                <div className="col-span-11 border-r-0 md:border-r-4 border-dotted border-white/10">
                  {children}
                </div>
                {/* nav bar（デスクトップのみ） */}
                <div className="hidden md:flex md:items-center md:justify-center md:h-full">
                  <Navbar handleTabClick={handleTabClick} isDesktop={true} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* nav bar（スマホ時は固定） */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-900/80 backdrop-blur-md border-t border-white/10 py-2 z-50">
        <Navbar handleTabClick={handleTabClick} isDesktop={false} />
      </div>
    </div>
  );
};

export default Layout;
