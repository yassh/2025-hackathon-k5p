# お誘いくん

お誘いくんは、友人や同僚との集まりやイベントを簡単に企画・管理できるWebアプリケーションです。イベントの作成から参加者の管理まで、すべてをシンプルに行えます。

## サービスの概要

### どんなサービスか
- **イベント企画機能**: タイトル、メッセージ、開始/終了日時、参加人数上限、締切日時を設定してイベントを作成
- **参加者管理**: 誰が参加するかを簡単に管理
- **画像アップロード**: イベントに関連する画像を添付可能
- **認証システム**: ログイン機能により、安全にイベントを管理
- **レスポンシブデザイン**: PC・スマートフォン両方に対応

### 主な機能
- イベント作成・編集・削除
- 参加者の招待と管理
- イベント画像の添付
- 管理者機能
- 直感的なユーザーインターフェース

## 技術スタック

### フロントエンド
- **Next.js 15**: Reactベースのフルスタックフレームワーク
- **React 19**: 最新のReactライブラリ
- **TailwindCSS**: ユーティリティファーストのCSSフレームワーク
- **TypeScript**: 型安全な開発のためのプログラミング言語

### バックエンド・CMS
- **Payload CMS 3.0**: 強力なヘッドレスCMS
- **PostgreSQL**: リレーショナルデータベース
- **NextAuth.js**: 認証システム
- **GraphQL**: APIクエリ言語

### 開発・デプロイ
- **Docker**: コンテナ化による環境統一
- **ESLint**: コード品質管理
- **Prettier**: コード整形
- **Playwright**: E2Eテスト
- **Vitest**: ユニットテスト

## セットアップ方法

### 必要な環境
- Node.js 18.20.2以上または20.9.0以上
- pnpm 9以上
- PostgreSQL（またはDocker）

### ローカル開発環境のセットアップ

#### 1. リポジトリのクローン
```bash
git clone https://github.com/yassh/2025-hackathon-k5p.git
cd 2025-hackathon-k5p
```

#### 2. 依存関係のインストール
```bash
pnpm install
```

#### 3. 環境変数の設定
```bash
cp .env.example .env
```

`.env`ファイルを編集して、必要な環境変数を設定してください：
- `DATABASE_URI`: PostgreSQLの接続URL
- `PAYLOAD_SECRET`: Payload用のシークレットキー
- その他の必要な設定

#### 4. データベースの初期化
```bash
pnpm run init-db
```

#### 5. 開発サーバーの起動
```bash
pnpm run dev
```

アプリケーションは `http://localhost:3000` で起動します。

### Docker を使用した開発

Dockerを使用することで、より簡単に開発環境を構築できます。

#### 1. Docker Composeの起動
```bash
docker-compose up
```

#### 2. データベースの初期化（別のターミナルで）
```bash
pnpm run init-db
```

### 本番環境へのデプロイ

#### 1. ビルド
```bash
pnpm run build
```

#### 2. 本番サーバーの起動
```bash
pnpm run start
```

## 利用可能なコマンド

### 開発
- `pnpm run dev`: 開発サーバーを起動
- `pnpm run devsafe`: .nextディレクトリをクリアしてから開発サーバーを起動

### ビルド・本番
- `pnpm run build`: 本番用ビルドを作成
- `pnpm run start`: 本番サーバーを起動

### コード品質
- `pnpm run lint`: リント（ESLint、Prettier、TypeScript）を実行
- `pnpm run fix`: リントエラーを自動修正
- `pnpm run fix:eslint`: ESLintエラーを自動修正
- `pnpm run fix:prettier`: Prettierでコード整形

### テスト
- `pnpm run test`: 全てのテストを実行
- `pnpm run test:int`: 統合テストを実行
- `pnpm run test:e2e`: E2Eテストを実行

### データベース
- `pnpm run init-db`: データベースを初期化
- `pnpm run payload`: Payloadコマンドを実行

### 型・コード生成
- `pnpm run gen`: 型定義とインポートマップを生成
- `pnpm run gen:types`: TypeScript型定義を生成
- `pnpm run gen:importmap`: インポートマップを生成

## 使い方

1. アプリケーションにアクセスしてログインします
2. 「お誘い一覧」から既存のイベントを確認できます
3. 「管理画面」からイベントを作成・編集できます
4. イベント作成時には以下を設定できます：
   - タイトル
   - メッセージ
   - 開始・終了日時
   - 参加人数上限
   - 締切日時
   - 画像

## ライセンス

MIT License

## サポート

質問や問題がある場合は、GitHubのIssuesを通じてお知らせください。