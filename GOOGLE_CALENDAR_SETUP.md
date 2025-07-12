# Google Calendar 連携設定ガイド

このドキュメントでは、お誘い作成時に Google Calendar にイベントを自動作成する機能の設定方法について説明します。

## 前提条件

- Google Cloud Console でプロジェクトが作成されていること
- Google Calendar API が有効になっていること
- OAuth 2.0 クライアント ID が作成されていること

## 必要な環境変数

以下の環境変数を設定してください：

```bash
# Google OAuth 設定
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri

# データベース設定
DATABASE_URI=your_database_connection_string

# Payload CMS 設定
PAYLOAD_SECRET=your_payload_secret
```

## Google Cloud Console での設定

1. **Google Cloud Console にアクセス**
   - https://console.cloud.google.com/

2. **プロジェクトの作成または選択**
   - 新しいプロジェクトを作成するか、既存のプロジェクトを選択

3. **Google Calendar API の有効化**
   - API とサービス > ライブラリ
   - "Google Calendar API" を検索して有効化

4. **OAuth 2.0 クライアント ID の作成**
   - API とサービス > 認証情報
   - "認証情報を作成" > "OAuth 2.0 クライアント ID"
   - アプリケーションの種類: "ウェブアプリケーション"
   - 承認済みのリダイレクト URI を設定

5. **OAuth 同意画面の設定**
   - スコープに以下を追加：
     - `openid`
     - `email`
     - `profile`
     - `https://www.googleapis.com/auth/calendar`

## 実装の詳細

### 1. Google Calendar 連携の流れ

1. ユーザーが Google OAuth でログイン
2. お誘いが作成される
3. `InvitationsCollection` の `afterChange` フックが発火
4. 作成者の Google OAuth トークンを取得
5. Google Calendar API を呼び出してイベントを作成

### 2. 実装されたファイル

- `src/utils/google-calendar.ts` - Google Calendar API のユーティリティ
- `src/collections/InvitationsCollection/index.ts` - お誘いコレクションの修正
- `src/auth.config.ts` - Google OAuth スコープの追加
- `package.json` - googleapis パッケージの追加

### 3. 現在の制限事項

現在の実装には以下の制限があります：

1. **OAuth トークンの取得**
   - NextAuth の Account テーブルから OAuth トークンを取得する処理が不完全
   - 実際のデータベースクエリの実装が必要

2. **トークンの更新**
   - アクセストークンの期限切れ時の自動更新処理が未実装

3. **エラーハンドリング**
   - より詳細なエラーハンドリングが必要

## 完全な実装のための次のステップ

1. **OAuth トークンの取得を完成させる**
   ```typescript
   // src/utils/google-calendar.ts の getUserGoogleTokens 関数を完成させる
   // NextAuth の Account テーブルから直接トークンを取得
   ```

2. **データベースマイグレーション**
   ```sql
   -- NextAuth の accounts テーブルが存在することを確認
   SELECT * FROM accounts WHERE provider = 'google';
   ```

3. **環境変数の設定**
   ```bash
   # .env.local ファイルを作成し、必要な環境変数を設定
   ```

4. **テスト**
   - Google OAuth でログイン
   - お誘いを作成
   - Google Calendar にイベントが作成されることを確認

## トラブルシューティング

### よくある問題

1. **OAuth スコープエラー**
   - Google Cloud Console で Calendar API スコープが設定されているか確認

2. **トークンアクセスエラー**
   - NextAuth の Account テーブルにトークンが保存されているか確認

3. **API クォータエラー**
   - Google Cloud Console で API のクォータを確認

### ログの確認

実装されたコードは詳細なログを出力します：

```bash
# 開発環境でのログ確認
npm run dev

# お誘い作成時のログを確認
tail -f logs/app.log
```

## 今後の改善案

1. **カレンダー選択機能**
   - プライマリカレンダー以外への作成オプション

2. **イベントの更新・削除**
   - お誘いの更新・削除時にカレンダーイベントも同期

3. **リマインダー設定**
   - カレンダーイベントにリマインダーを追加

4. **参加者の招待**
   - お誘いの参加者をカレンダーイベントにも招待