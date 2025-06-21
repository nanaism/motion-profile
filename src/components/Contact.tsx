import { motion, useMotionValue } from "framer-motion";
import type { LucideProps } from "lucide-react";
import { useRef, useState } from "react";
import { CONTACT_METHODS } from "../config/constants";

interface FloatingIconProps {
  icon: React.FC<LucideProps> | React.ElementType;
  label: string;
  value: string;
  link: string;
  position: { x: number; y: number };
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

// 【最終完成版 v3】
const FloatingIcon = ({
  icon: Icon,
  label,
  value,
  link,
  position,
  constraintsRef,
}: FloatingIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // ★★★ 修正点: xとyの変位を監視するためのMotionValueを作成 ★★★
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [animationParams] = useState(() => ({
    duration: 5 + Math.random() * 5,
    yRange: [0, -10 + Math.random() * 10, 0],
    xRange: [0, -5 + Math.random() * 10, 0],
  }));

  return (
    <motion.div
      className="absolute cursor-grab"
      initial={{
        opacity: 0,
        scale: 0.5,
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: Math.random() * 0.5,
        ease: "easeOut",
      }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.4}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      // ★★★ 修正点: onTap内でMotionValueの値をチェック ★★★
      onTap={() => {
        const currentX = x.get();
        const currentY = y.get();
        const distanceFromOrigin = Math.sqrt(currentX ** 2 + currentY ** 2);

        // 初期位置からの距離が5px未満の場合のみリンクを開く
        if (distanceFromOrigin < 5) {
          window.open(link, "_blank", "noopener,noreferrer");
        }
      }}
      whileTap={{ cursor: "grabbing" }}
      // ★★★ 修正点: styleにxとyのMotionValueを渡す ★★★
      style={{ x, y, zIndex: isHovered || isDragging ? 10 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isDragging ? 1.15 : isHovered ? 1.1 : 1,
          // 内側のdivのx,yは浮遊アニメーション専用
          y: isDragging ? 0 : animationParams.yRange,
          x: isDragging ? 0 : animationParams.xRange,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
          default: {
            duration: animationParams.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      >
        <motion.div
          className="w-28 h-28 rounded-full flex flex-col items-center justify-center bg-white/10 border border-white/10 backdrop-blur-sm shadow-lg"
          animate={{
            backgroundColor:
              isHovered || isDragging
                ? "rgba(12, 192, 223, 0.3)"
                : "rgba(255, 255, 255, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-1">
            {typeof Icon === "function" && Icon.toString().includes("svg") ? (
              <Icon className="w-8 h-8 fill-white" aria-label={label} />
            ) : (
              <Icon size={32} className="text-[#0cc0df]" aria-label={label} />
            )}
          </div>
          <div className="text-white text-sm text-center">{label}</div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-white/10 backdrop-blur-md border border-[#0cc0df]/20 rounded-lg w-48 z-20 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isHovered && !isDragging ? 1 : 0,
          y: isHovered && !isDragging ? 0 : -10,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="text-[#0cc0df] font-medium text-sm mb-1 break-all">
          {label}
        </div>
        <div className="text-white/80 text-sm break-all">{value}</div>
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <motion.div
        className="relative z-10 pt-8 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl sm:text-4xl font-semibold text-white text-center mb-4">
          ぜひ繋がりましょう
        </h2>
        <p className="text-white/80 max-w-lg mx-auto text-center mb-8">
          アイコンをドラッグしたり、クリックしてリンク先を確認できます！
        </p>
      </motion.div>

      <div
        ref={constraintsRef}
        className="relative z-0 h-[400px] w-full overflow-hidden rounded-lg"
      >
        {CONTACT_METHODS.map((method) => (
          <FloatingIcon
            key={method.label}
            icon={method.icon}
            label={method.label}
            value={method.value}
            link={method.link}
            position={method.position}
            constraintsRef={constraintsRef}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 pt-4 pb-8 text-center"
      >
        <motion.p
          className="text-[#0cc0df] mt-2 font-semibold text-xl italic"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          "一緒にワクワクするものを作りましょう" 🫧
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Contact;
