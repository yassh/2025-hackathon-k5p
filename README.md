# 2025-hackathon-k5p

## 概要

このプロジェクトは、Payload CMS 3.0をベースとしたWebアプリケーションです。Next.js、TypeScript、PostgreSQLを使用して構築されており、モダンなWebコンテンツ管理システムを提供します。

Payload CMSは、開発者向けのヘッドレスCMSで、管理画面、認証、ファイル管理などの機能を提供します。

## システム構成

### 技術スタック

- **フロントエンド**: Next.js 15.3.2, React 19.1.0
- **バックエンド**: Payload CMS 3.45.0
- **データベース**: PostgreSQL (via @payloadcms/db-postgres)
- **認証**: NextAuth.js 5.0.0-beta.29
- **ストレージ**: Vercel Blob Storage
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript 5.7.3
- **パッケージマネージャー**: pnpm

### 主要な機能

- **コンテンツ管理**: Payload CMSによる直感的なコンテンツ管理
- **認証システム**: NextAuth.jsによる認証機能
- **ファイル管理**: 画像アップロード、リサイズ、フォーカルポイント設定
- **多言語対応**: @payloadcms/translations による多言語サポート
- **リッチテキストエディタ**: Lexical エディタによる高度なテキスト編集

## セットアップ方法

### 必要な環境

- Node.js (18.20.2以上または20.9.0以上)
- pnpm (9以上)
- PostgreSQL データベース

### インストール手順

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd 2025-hackathon-k5p
   ```

2. **依存関係のインストール**
   ```bash
   pnpm install
   ```

3. **環境変数の設定**
   ```bash
   cp .env.example .env
   ```
   `.env`ファイルを編集して、以下の環境変数を設定してください：
   - `MONGODB_URI`: PostgreSQL接続URL
   - その他の必要な環境変数

4. **データベースの初期化**
   ```bash
   pnpm run init-db
   ```

5. **型定義の生成**
   ```bash
   pnpm run gen
   ```

6. **開発サーバーの起動**
   ```bash
   pnpm run dev
   ```

7. **アプリケーションにアクセス**
   ブラウザで `http://localhost:3000` にアクセスしてください。

## 基本的なコマンドの説明

### 開発関連

- `pnpm run dev`: 開発サーバーの起動
- `pnpm run devsafe`: .nextを削除してからの開発サーバー起動
- `pnpm run build`: 本番用ビルドの実行
- `pnpm run start`: 本番モードでの起動

### コード品質管理

- `pnpm run lint`: ESLint、Prettier、TypeScriptの型チェックを実行
- `pnpm run lint:eslint`: ESLintのみ実行
- `pnpm run lint:prettier`: Prettierのチェックのみ実行
- `pnpm run lint:tsc`: TypeScriptの型チェックのみ実行
- `pnpm run fix`: ESLintとPrettierの自動修正を実行
- `pnpm run fix:eslint`: ESLintの自動修正のみ実行
- `pnpm run fix:prettier`: Prettierの自動修正のみ実行

### テスト

- `pnpm run test`: 統合テストとE2Eテストを実行
- `pnpm run test:int`: 統合テストのみ実行
- `pnpm run test:e2e`: E2Eテスト（Playwright）のみ実行

### Payload CMS関連

- `pnpm run payload`: Payload CLIの実行
- `pnpm run gen`: 型定義とインポートマップの生成
- `pnpm run gen:types`: 型定義の生成
- `pnpm run gen:importmap`: インポートマップの生成
- `pnpm run init-db`: データベースの初期化
- `pnpm run init-db:fresh`: データベースの新規作成（既存データは削除）

### その他

- `pnpm run start`: 本番環境でのアプリケーション起動

## 質問・サポート

問題が発生した場合や質問がある場合は、以下のリソースをご利用ください：

- [Payload CMS Discord](https://discord.com/invite/payload)
- [GitHub Discussions](https://github.com/payloadcms/payload/discussions)