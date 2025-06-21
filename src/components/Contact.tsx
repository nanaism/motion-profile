import type { LucideProps } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { CONTACT_METHODS } from "../config/constants";

interface FloatingIconProps {
  icon: React.FC<LucideProps> | React.ElementType;
  label: string;
  value: string;
  link: string;
  position: { x: number; y: number };
}

// ふわふわ漂うアイコン
const FloatingIcon = ({
  icon: Icon,
  label,
  value,
  link,
  position,
}: FloatingIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="absolute"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 浮遊アニメーション */}
        <motion.div
          className={`w-24 h-24 rounded-full flex flex-col items-center justify-center ${
            isHovered ? "bg-[#0cc0df]/30" : "bg-white/10"
          } border border-white/10 backdrop-blur-sm transition-colors`}
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1">
            {typeof Icon === "function" && Icon.toString().includes("svg") ? (
              <Icon className="w-6 h-6 fill-white" aria-label={label} />
            ) : (
              <Icon size={24} className="text-[#0cc0df]" aria-label={label} />
            )}
          </div>
          <div className="text-white text-sm text-center">{label}</div>
        </motion.div>
      </motion.a>

      {/* ホバー時の詳細パネル */}
      <motion.div
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-white/5 backdrop-blur-sm border border-[#0cc0df]/20 rounded-lg w-44 z-10"
        initial={{ opacity: 0, y: -5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -5,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-[#0cc0df] font-medium text-sm mb-1">{label}</div>
        <div className="text-white/80 text-sm">{value}</div>
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  return (
    <>
      <motion.div
        className="relative z-10 pt-8 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl sm:text-4xl font-semibold text-white text-center mb-4">
          ぜひ繋がりましょう
        </h2>
        <p className="text-white/80 max-w-lg mx-auto text-center mb-8">
          開発者コミュニティの一員として、私をフォローしてください;){" "}
          <br className="hidden sm:inline" />
          お仕事のご依頼や質問など、お気軽にご連絡ください。
        </p>
      </motion.div>

      <div className="relative z-10 h-[300px]">
        {CONTACT_METHODS.map((method, index) => (
          <FloatingIcon
            key={index}
            icon={method.icon}
            label={method.label}
            value={method.value}
            link={method.link}
            position={method.position}
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
    </>
  );
};

export default Contact;
