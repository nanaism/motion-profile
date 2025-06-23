import { Mail, MessageCircle } from "lucide-react";
import { Icons } from "../components/Icon";

// Profile
export const PROFILE_NAME = "@oga_aiichiro";
export const PROFILE_JOB = "software engineer";
// https://github.com/+ 自分のアカウント + .png
export const PROFILE_AVATAR_PATH = `https://github.com/nanaism.png`;
export const PROFILE_LOCATION = "Fukuoka, Japan";
// Tokyo の緯度・経度
export const LOCATION_LATITUDE = 33.649973;
export const LOCATION_LONGITUDE = 130.263972;

// Contact
export const CONTACT_EMAIL = "datealife2525@gmail.com";
export const CONTACT_TWITTER_HANDLE = "@oga_aiichiro";
export const CONTACT_TWITTER_URL = "https://x.com/oga_aiichiro";
export const CONTACT_GITHUB_HANDLE = "nanaism";
export const CONTACT_GITHUB_URL = `https://github.com/${CONTACT_GITHUB_HANDLE}`;
// Misskeyの情報を追加
export const CONTACT_MISSKEY_HANDLE = "@oga";
export const CONTACT_MISSKEY_URL = "https://oga.aiichiro.jp/@oga";

// Contact セクションのバブル要素
export const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    link: `mailto:${CONTACT_EMAIL}`,
    position: { x: 15, y: 10 }, // 位置を調整
  },
  {
    icon: Icons.twitter,
    label: "X (Twitter)",
    value: CONTACT_TWITTER_HANDLE,
    link: CONTACT_TWITTER_URL,
    position: { x: 65, y: 5 }, // 位置を調整
  },
  {
    icon: Icons.gitHub,
    label: "GitHub",
    value: CONTACT_GITHUB_HANDLE,
    link: CONTACT_GITHUB_URL,
    position: { x: 5, y: 55 }, // 位置を調整
  },
  {
    icon: MessageCircle,
    label: "チャット",
    value: "お気軽にDMください", // 文言を少し変更
    link: CONTACT_TWITTER_URL,
    position: { x: 75, y: 60 }, // 位置を調整
  },
  // Misskeyの項目を追加
  {
    icon: Icons.misskey,
    label: "Misskey",
    value: CONTACT_MISSKEY_HANDLE,
    link: CONTACT_MISSKEY_URL,
    position: { x: 40, y: 45 }, // 中央に配置
  },
];

// Profile セクションに表示する連絡先
export const PROFILE_CONTACT_ITEMS = [
  {
    icon: Icons.twitter,
    text: CONTACT_TWITTER_URL,
    label: "X profile",
  },
  {
    icon: Icons.gitHub,
    text: CONTACT_GITHUB_URL,
    label: "GitHub profile",
  },
  {
    icon: Mail,
    text: CONTACT_EMAIL,
    label: "Email address",
  },
];

export const SKILL_DESCRIPTION =
  "私はReactを使ったWeb開発が得意です。UI/UXの向上から、フルスタックWeb開発まで、幅広く興味を持っています。そして、日々学習を継続しています。";

// 技術スキル（名前/評価値）
export const SKILL_DATA = [
  { subject: "React/Next.js", value: 90 },
  { subject: "TypeScript", value: 85 },
  { subject: "Java", value: 75 },
  { subject: "UI/UX", value: 80 },
  { subject: "AI", value: 75 },
  { subject: "Azure", value: 55 },
];

// 経歴書などのページがあればリンク
export const RESUME_URL = "#";

// スキルとして掲載する数字データ
export const SKILL_OUTPUT = [
  { label: "個人運営サービス", value: 4 },
  { label: "技術ブログ投稿数", value: 15 },
  { label: "GitHub獲得スター", value: 80 },
];

// 開発者として経験したプロジェクト紹介
export const SKILL_PROJECTS = [
  {
    title: "民泊シェアアプリ",
    description:
      "Airbnbのような民泊プラットフォーム。ホストが物件を登録し、ゲストが予約・管理できるフルスタックアプリ。",
    tech: [
      "個人開発",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Clerk",
      "Supabase",
    ],
    link: "https://yadori.aiichiro.jp",
  },
  {
    title: "記事・電子書籍販売アプリ",
    description:
      "知的コンテンツを有料で販売できるアプリを構築。柔軟なアクセス制限、セキュアな運用フローを実現。",
    tech: ["個人開発", "Next.js", "Tailwind CSS", "Stripe", "Auth.js"],
    link: "https://store.aiichiro.jp",
  },
  {
    title: "リアルタイムチャットアプリ",
    description:
      "リアルタイムチャットアプリを開発。ユーザー登録、メッセージ送信・表示、接続管理、ビジュアルマップなど多彩な機能を実装。",
    tech: ["個人開発", "Next.js", "TypeScript", "Socket.IO", "Tailwind CSS"],
    link: "https://chat.aiichiro.jp",
  },
];

// About セクションに表示する対話風自己紹介の内容
export const ABOUT_CONVERSATION = [
  {
    isUser: true,
    message: "はじめまして",
  },
  {
    isUser: false,
    message:
      "はじめまして🙌\nプロフィールサイトを見ていただきありがとうございます！",
  },
  {
    isUser: true,
    message: "あなたについて教えてください！",
  },
  {
    isUser: false,
    message: `私は、Web系のフロントエンドエンジニアです。\n\n同時に、下記でもあります:)\n・インディハッカー（個人開発者）\n・ゲーマー\n・blobcat愛好家`, // Use PROFILE_TITLE if needed here
  },
  {
    isUser: true,
    message: "趣味は何ですか？",
  },
  {
    isUser: false,
    message:
      "ゲーム、ピアノ、読書、そして新しいプログラミング技術の学習が趣味です。休日は散歩してリフレッシュするのも好きです。",
  },
  {
    isUser: true,
    message: "最近ハマっていることは？",
  },
  {
    isUser: false,
    message:
      "最近は、生成 AI の活用に夢中になっています！AIエージェントと、開発者としての経験を組み合わせ、新たな開発フロー・プロダクトの形を模索しています🤖",
  },
];
