import type { LucideProps } from "lucide-react";
import { MapPin } from "lucide-react";
import { motion, useDragControls } from "motion/react";
import {
  PROFILE_AVATAR_PATH,
  PROFILE_CONTACT_ITEMS,
  PROFILE_JOB,
  PROFILE_LOCATION,
  PROFILE_NAME,
} from "../config/constants";
import { useWeather } from "../hooks/useWeather";

// ヘッダー部分（プロフィール画像とタイトル）
const ProfileHeader = () => (
  <div className="flex flex-col md:flex-row gap-12 items-start">
    {/* Avatar */}
    <div className="w-80 h-80 rounded-full overflow-hidden bg-[#f5f0e6] flex-shrink-0">
      <img
        src={PROFILE_AVATAR_PATH}
        alt={`${PROFILE_NAME} avatar`}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="mt-4 md:mt-8">
      <h2 className="text-6xl lg:text-8xl font-semibold leading-tight text-white">
        Hi, I am
        <br />
        {PROFILE_NAME}
      </h2>
      <p className="text-4xl text-[#0cc0df] mt-2">{PROFILE_JOB}</p>
    </div>
  </div>
);

interface ContactItemProps {
  icon: React.FC<LucideProps>;
  text: string;
  label: string;
}

const ContactItem = ({ icon: Icon, text, label }: ContactItemProps) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ring-1 ring-white/10 transition-all hover:bg-teal-500/10 hover:ring-teal-500/20 backdrop-blur-sm">
      {/* Lucide のアイコンか、ブランドアイコンかの分岐 */}
      {typeof Icon === "function" && Icon.toString().includes("svg") ? (
        <Icon className={`w-6 h-6 fill-white`} aria-label={label} />
      ) : (
        <Icon size={24} className="text-white" aria-label={label} />
      )}
    </div>
    <span className="text-lg sm:text-2xl">{text}</span>
  </div>
);

// 連絡先セクション
const ContactSection = () => {
  return (
    <div className="space-y-6 text-white">
      {PROFILE_CONTACT_ITEMS.map((item, i) => (
        <ContactItem
          key={i}
          icon={item.icon}
          text={item.text}
          label={item.label}
        />
      ))}
    </div>
  );
};

// 活動拠点の情報
const LocationInfo = () => {
  const { weatherData } = useWeather();
  return (
    <div className="group flex items-center gap-2 mt-6 sm:mt-auto mr-8 rounded-lg bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10 transition-all hover:bg-teal-500/10 hover:ring-teal-500/20">
      <div className="flex items-center gap-4">
        <MapPin size={28} className="text-[#0cc0df]" aria-label="Location" />
        <div className="flex flex-col">
          <div className="text-lg">{PROFILE_LOCATION}</div>
          <p>
            {weatherData?.label}・{weatherData?.temperature}°C
          </p>
        </div>
      </div>
    </div>
  );
};

// ドラッグ可能な天気アイコン
const AnimatedWeatherIcon = () => {
  const { weatherData } = useWeather();
  const WeatherIcon = weatherData?.icon;
  // ドラッグコントロール
  const dragControls = useDragControls();

  if (!WeatherIcon) {
    return null;
  }

  return (
    // 外側のコンテナがドラッグを処理
    <motion.div
      drag
      dragControls={dragControls}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      whileDrag={{ scale: 1.05 }}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
      className="absolute top-[20%] right-[15%] z-10"
    >
      {/* 内側の要素が浮遊アニメーションを処理 */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <WeatherIcon
          size={120}
          className="text-white/10"
          aria-label="Decorative weather icon"
        />
      </motion.div>
    </motion.div>
  );
};

const Profile = () => {
  return (
    <>
      <AnimatedWeatherIcon />
      <ProfileHeader />
      <div className="flex flex-col md:flex-row justify-between mt-20">
        <ContactSection />
        <LocationInfo />
      </div>
    </>
  );
};

export default Profile;
