import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { animate } from "motion";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import {
  SKILL_DATA,
  SKILL_DESCRIPTION,
  SKILL_OUTPUT,
  SKILL_PROJECTS,
} from "../config/constants";

interface RadarDataItem {
  subject: string;
  value: number;
}

// レーダーチャートでスキル可視化
const SkillRadar = ({ data }: { data: RadarDataItem[] }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-80 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#ffffff20" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "white" }} />
          <Radar
            name="スキルレベル"
            dataKey={animationComplete ? "value" : "initialValue"}
            stroke="#0cc0df"
            fill="#0cc0df"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// 数字のカウントアップアニメーション
const AnimatedCounter = ({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      ease: "circOut",
      onUpdate: (latest) => setCount(Math.floor(latest)),
    });

    // クリーンアップ関数でアニメーションを停止
    return () => controls.stop();
  }, [value, duration]);

  return <motion.span>{count}</motion.span>;
};

const ProjectCard = ({
  title,
  description,
  tech,
  link,
  delay = 0,
}: {
  title: string;
  description: string;
  tech: string[];
  link: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="border border-white/10 rounded-lg p-5 bg-white/5 hover:border-[#0cc0df]/30 transition-all"
    >
      <h3 className="text-xl font-medium text-white mb-2 flex items-center">
        <Award size={18} className="text-[#0cc0df] mr-2" />
        {title}
      </h3>
      <p className="text-white/70 mb-4 text-sm">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((item: string, i: number) => (
          <span
            key={i}
            className="bg-white/10 text-white/90 px-2 py-1 rounded text-xs"
          >
            {item}
          </span>
        ))}
      </div>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-[#0cc0df] text-sm flex items-center cursor-pointer hover:underline"
        whileHover={{ x: 3 }}
      >
        <span>詳細を見る</span>
        <ExternalLink size={14} className="ml-1" />
      </motion.a>
    </motion.div>
  );
};

const Skill = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold text-[#0cc0df] mb-6"
          >
            Skill
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 mb-8"
          >
            {SKILL_DESCRIPTION}
          </motion.p>

          <SkillRadar data={SKILL_DATA} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 mt-8"
          >
            {SKILL_OUTPUT.map((output, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#0cc0df]">
                  <AnimatedCounter value={output.value} />
                </div>
                <div className="text-sm text-white/80">{output.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl font-semibold text-[#0cc0df] mb-6"
          >
            Project
          </motion.h2>

          <div className="space-y-4">
            {SKILL_PROJECTS.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tech={project.tech}
                link={project.link}
                delay={0.4 + index * 0.2}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;
