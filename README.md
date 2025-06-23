# Oga Aiichiro - Interactive Portfolio

[![Deploy on www.aiichiro.jp](https://img.shields.io/badge/Live%20Demo-www.aiichiro.jp-brightgreen?style=for-the-badge&logo=vercel)](https://www.aiichiro.jp/)

天気と連動する、遊び心あふれるインタラクティブなポートフォリオサイトです。
訪問者が楽しめるユニークな体験を提供することを目指して開発しました。

**👇 今すぐサイトを体験！**
### [https://www.aiichiro.jp/](https://www.aiichiro.jp/)

![ポートフォリオサイトのスクリーンショット](https://github.com/user-attachments/assets/6fb6ba9e-6452-4116-b4af-43a2ea77211e)

---

## 🌟 プロジェクトの特徴 (Features)

このポートフォリオは、単に情報を表示するだけでなく、随所にアニメーションやインタラクションを散りばめています。

-   🌍 **天気と連動するヒーローセクション**
    -   リアルタイムの天気情報を[Open-Meteo API](#-open-meteo-api)から取得。
    -   天候に合わせて、ドラッグ＆ドロップで動かせるオブジェクト（🌞, ☁️, 🌧️など）が出現します。

-   ✍️ **タイピングアニメーションによる自己紹介**
    -   AIが文章を生成しているかのような、一文字ずつ表示されるタイピングエフェクトで自己紹介文を演出します。

-   🖱️ **インタラクティブなUI/UX**
    -   **ナビゲーションバー**: マウスホバーでメニューが拡大する直感的なアニメーション。
    -   **スキル & プロジェクト**: スクロールすると、各要素が順番にフェードインで表示されます。
    -   **コンタクト**: SNSアイコンがふわふわと浮遊し、ホバーすると詳細情報が表示されるエフェクトを実装。

-   📱 **レスポンシブデザイン**
    -   PC、タブレット、スマートフォンなど、あらゆるデバイスで最適な表示と体験を提供します。

-   🚀 **即時共有可能**
    -   ウェブサイトとしてデプロイ済みのため、GitHubプロフィールや名刺からいつでも共有できます。

## 🛠️ 使用技術 (Tech Stack)

このプロジェクトは、以下の技術を主に使用して構築されています。

-   **Frontend**: (例: React, Next.js, Vue.js, TypeScript)
-   **Styling**: (例: Tailwind CSS, SCSS, Framer Motion)
-   **API**: [Open-Meteo API](#-open-meteo-api)
-   **Deployment**: (例: Vercel, Netlify)

*(注: ここにはプロジェクトで使用した具体的な技術スタックを追記してください)*

## 🔌 APIについて: Open-Meteo API

このプロジェクトのヒーローセクションでは、[Open-Meteo](https://open-meteo.com/)の無料天気予報APIを使用しています。

-   **提供情報**: 特定の地域の緯度・経度に基づいて、詳細な天気情報を提供します。
-   **利便性**: APIキーや認証は不要で、誰でも自由に利用できます。
-   **URL**: `https://api.open-meteo.com/v1/forecast`

## 🚀 ローカルでの実行方法 (Getting Started)

このプロジェクトをご自身の環境で動かす場合は、以下の手順に従ってください。

1.  **リポジトリをクローン**
    ```sh
    git clone https://github.com/your-username/your-repository.git
    ```
2.  **ディレクトリに移動**
    ```sh
    cd your-repository
    ```
3.  **依存関係をインストール**
    ```sh
    npm install
    # または yarn install
    ```
4.  **開発サーバーを起動**
    ```sh
    npm run dev
    # または yarn dev
    ```
    ブラウザで `http://localhost:3000` (または指定されたポート) を開いてください。

