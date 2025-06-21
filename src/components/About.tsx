import { motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { ABOUT_CONVERSATION } from "../config/constants";

// タイピングアニメーション
const TypewriterText = ({
  text,
  delay = 50,
  onComplete = () => {},
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [currentIndex, delay, text, isComplete, onComplete]);

  return <>{displayedText}</>;
};

const ChatMessage = ({
  isUser,
  message,
  delay = 50,
  onComplete = () => {},
}: {
  isUser: boolean;
  message: string | ReactNode;
  delay?: number;
  onComplete?: () => void;
}) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-[80%] rounded-lg p-4 whitespace-break-spaces ${
          isUser
            ? "bg-[#0cc0df]/20 text-white rounded-tr-none"
            : "bg-white/10 text-white/90 rounded-tl-none"
        }`}
      >
        {typeof message === "string" ? (
          <TypewriterText
            text={message}
            delay={delay}
            onComplete={onComplete}
          />
        ) : (
          <div onAnimationEnd={onComplete}>{message}</div>
        )}
      </motion.div>
    </div>
  );
};

const About = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  return (
    <>
      <div className="bg-gray-900/80 p-6 rounded-lg border border-white/10 text-white text-lg h-[600px] overflow-y-scroll">
        {ABOUT_CONVERSATION.slice(0, currentMessage + 1).map((msg, index) => (
          <ChatMessage
            key={index}
            isUser={msg.isUser}
            message={msg.message}
            onComplete={() => {
              if (
                index === currentMessage &&
                currentMessage < ABOUT_CONVERSATION.length - 1
              ) {
                setTimeout(() => setCurrentMessage((c) => c + 1), 800);
              }
            }}
          />
        ))}

        {/* AI のローディング中を模したアニメーション */}
        {currentMessage < ABOUT_CONVERSATION.length - 1 &&
          currentMessage % 2 === 0 && (
            <div className="flex justify-start mb-6">
              <div className="bg-white/10 text-white/90 rounded-lg rounded-tl-none p-4">
                <motion.div
                  className="flex space-x-1"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-white/70"></div>
                  <div className="w-2 h-2 rounded-full bg-white/70"></div>
                  <div className="w-2 h-2 rounded-full bg-white/70"></div>
                </motion.div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default About;
