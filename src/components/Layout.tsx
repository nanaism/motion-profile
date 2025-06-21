import { motion, MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useCardTilt } from "../hooks/useCardTilt";
import type { NavItem } from "../types/navigation";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  title: NavItem;
  handleTabClick: (label: NavItem) => void;
}

// 背景効果 (変更なし)
export const Background = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-0 left-0 h-full w-full">
      <div className="absolute top-10 left-1/4 h-96 w-96 animate-pulse rounded-full bg-teal-600 opacity-5 mix-blend-screen blur-3xl" />
      <div
        className="absolute bottom-10 right-1/4 h-80 w-80 animate-pulse rounded-full bg-indigo-500 opacity-5 mix-blend-screen blur-3xl"
        style={{ animationDelay: "2s", animationDuration: "7s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 animate-pulse rounded-full bg-purple-500 opacity-5 mix-blend-screen blur-3xl"
        style={{ animationDelay: "1s", animationDuration: "5s" }}
      />
    </div>
  </div>
);

// 動的な光沢（グレア）エフェクトコンポーネント (変更なし)
const Glare = ({
  style,
}: {
  style: {
    x: MotionValue<string>;
    y: MotionValue<string>;
    opacity: MotionValue<number>;
  };
}) => (
  <motion.div
    className="pointer-events-none absolute -inset-px rounded-2xl"
    style={{
      ...style,
      background:
        "radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%)",
      mixBlendMode: "soft-light",
    }}
  />
);

// --- ▼▼▼ ここからが主要な変更点 ▼▼▼ ---

export const Layout = ({ children, title, handleTabClick }: LayoutProps) => {
  const { ref, cardStyle, contentStyle, glareStyle } = useCardTilt();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <Background />

      <div
        className="container relative mx-auto flex min-h-screen items-center justify-center pb-20 sm:pb-0"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="w-full max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* --- 構造変更: カードとNavbarをFlexboxで並べる --- */}
          <div className="flex items-center justify-center gap-8">
            {/* カード本体 (flex-growで幅を確保) */}
            <motion.div
              ref={ref}
              style={cardStyle}
              className="group relative flex-grow rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-1 shadow-2xl shadow-black/40"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-teal-500/20 via-transparent to-purple-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Glare style={glareStyle} />

              <div className="relative rounded-xl bg-gray-900/50 backdrop-blur-lg">
                <motion.div style={contentStyle} className="p-8">
                  {title !== "Skill" && (
                    <h1 className="mb-8 px-2 text-5xl font-bold text-[#0cc0df] sm:px-0">
                      {title}
                    </h1>
                  )}
                  {/* Navbarが外に出たので、中のグリッドは不要に */}
                  <div className="border-r-0 border-dotted border-white/10 md:border-r-4 pr-4">
                    {children}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* デスクトップ用Navbar (3D Transformの外に配置) */}
            <div className="hidden md:flex flex-shrink-0">
              <Navbar handleTabClick={handleTabClick} isDesktop={true} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* モバイル用Navbar (変更なし) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-gray-900/80 py-2 backdrop-blur-md md:hidden">
        <Navbar handleTabClick={handleTabClick} isDesktop={false} />
      </div>
    </div>
  );
};

export default Layout;
