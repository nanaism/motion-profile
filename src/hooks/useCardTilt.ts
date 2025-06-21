import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * 3Dカードチルト効果を実装するためのカスタムフック (安定性向上版)
 * @returns ref, スタイル用のMotionValue
 */
export const useCardTilt = () => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothOptions = { stiffness: 150, damping: 20, mass: 0.5 }; // 少し柔らかく調整
  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["12deg", "-12deg"]); // 傾きを少し抑える
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const parallaxTranslateX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["-12px", "12px"]
  );
  const parallaxTranslateY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    ["-12px", "12px"]
  );

  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ["120%", "-20%"]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ["120%", "-20%"]);

  const glareOpacity = useMotionValue(0);

  useEffect(() => {
    const updateOpacity = () => {
      const x = smoothMouseX.get();
      const y = smoothMouseY.get();
      const distance = Math.sqrt(x ** 2 + y ** 2);
      const newOpacity = Math.max(0, 0.4 * (1 - distance / 0.7));
      glareOpacity.set(newOpacity);
    };

    const unsubscribeX = smoothMouseX.on("change", updateOpacity);
    const unsubscribeY = smoothMouseY.on("change", updateOpacity);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [smoothMouseX, smoothMouseY, glareOpacity]);

  // --- ▼▼▼ イベントリスナーのロジックを全面的に改善 ▼▼▼ ---
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isMouseOver = false;

    // マウスが要素上にあるかどうかを判定する
    const handleMouseEnter = () => {
      isMouseOver = true;
    };
    const handleMouseLeave = () => {
      isMouseOver = false;
      // 要素から離れたら、ゆっくりと中心に戻す
      mouseX.set(0);
      mouseY.set(0);
    };

    // マウスの動きはウィンドウ全体で監視する
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseOver) return; // 要素上にない場合は何もしない

      const { left, top, width, height } = element.getBoundingClientRect();
      const normalizedX = (e.clientX - left) / width - 0.5;
      const normalizedY = (e.clientY - top) / height - 0.5;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    // イベントリスナーを登録
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);

    // ブラウザウィンドウからマウスが出た場合もリセットする
    document.addEventListener("mouseleave", handleMouseLeave);

    // クリーンアップ関数
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]); // 依存配列は変更なし

  return {
    ref,
    cardStyle: {
      rotateX,
      rotateY,
      transformStyle: "preserve-3d" as const,
    },
    contentStyle: {
      translateX: parallaxTranslateX,
      translateY: parallaxTranslateY,
      transformStyle: "preserve-3d" as const,
    },
    glareStyle: {
      x: glareX,
      y: glareY,
      opacity: glareOpacity,
    },
  };
};
