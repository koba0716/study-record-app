# Study Record App

学習内容と学習時間を記録するシンプルな Web アプリです。  
フォームから入力した内容を Supabase に保存し、一覧で確認できます。  
Firebase Hosting にデプロイし、GitHub Actions を使って自動デプロイを行う構成になっています。

---

## 使用技術

- **React (Vite)**
- **Supabase**
  - データ永続化（CRUD）
- **Firebase Hosting**
  - 本番環境へのデプロイ
- **GitHub Actions**
  - push → テスト → ビルド → 自動デプロイ
- **Jest / React Testing Library**
  - UI テスト（4項目）

---

## 主な機能

### 1. 学習記録の一覧表示  
- Supabase の `study-record` テーブルからデータを取得  
- ローディング中は `Loading...` を表示

### 2. 記録の追加  
- フォームから学習内容と時間を入力  
- バリデーション（空欄・0 以下の数値）あり  
- 送信後 Supabase に保存し、一覧に即時反映

### 3. 記録の削除  
- 各記録の「削除」ボタンで Supabase から削除  
- ローカル state からも削除

### 4. 合計時間の表示  
- 現在の一覧から自動計算して表示

---

## テスト（Jest + React Testing Library）

以下の4つのテストを作成しています：

1. **タイトルが表示されていること**  
2. **フォーム入力 → 登録で新しい記録が追加されること**  
3. **削除ボタンで記録が削除されること**  
4. **未入力で登録するとエラーが表示されること**

Supabase の処理はテスト環境では **モック** に置き換えて動作を安定させています。

---

## デプロイ（Firebase Hosting）

Firebase CLI を用いてプロジェクトを初期化し、  
GitHub Actions と連動させて自動デプロイを構築。

`main` ブランチに push すると：

1. `npm install`  
2. `npm test`  
3. `npm run build`  
4. Firebase Hosting へ自動デプロイ  

この流れが自動で実行されます。

---

## 備考

本アプリは学習目的で作成しています。  
Supabase の CRUD、Firebase Hosting、GitHub Actions による CI/CD、  
そして Jest / React Testing Library での UI テストの一連の流れを理解するための構成です。
