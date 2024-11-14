# 開発フロー

バージョン情報

- nodejs: 20.18.0
- pnpm: 9.12.1

## ホストのバージョン固定化

clone した後、ホスト環境(WSL2 など)で NodeJs と Pnpm のバージョンを統一するために Volta を install してください。

```bash
# voltaでnodeのinstall
volta install node@20.18.0

# corepackの有効化
volta install corepack

# pnpmの有効化
corepack enable
corepack enable pnpm

pnpm -v
→9.12.1
```

## Docker によるコンテナ立ち上げ

```bash
# 最初の一回 or 何かdocker関係のファイルを編集した時
docker-compose build --no-cache

docker-compose up -d
```

## huskyによるコミット時自動整形
huskyとlint-stagedを使用して、commit時にBiomeでLintとFormatを行いコードの品質を保ちます。

## CICD
GitHubActionsを使用。

**CI**
- BiomeによるLint
- VitestによるTest
- NextjsによるBuild



**CD**
- CI
- Vercelにデプロイ

# その他

## 認証
NextAuthを使用して認証処理+セッション管理を行っています。

- GoogleのOAuthに対応
- SessionはDBで管理を行っている
- DBにはNeonを使用
- AdapterにはDrizzleを使用

## コード最適化
- vscodeの設定で保存時にBiomeでLint Formatを行う
- huskyとlint-stagedを使用し、commit時にLint Formatを行いコード品質を担保
- CI・CD時にLintを走らせる

## 環境変数の読み込み
- 環境変数に型定義を行えるように整備。(process.envで環境変数を取得する際にいちいちnullかどうかを判定する必要がなくなります)
- 環境変数が不足している状態でNextJsサーバーを立ち上げられないようにする。

## DB関連
- Drizzle ORMを使用しています。
  - コード(typescript)ベースでスキーマを管理
  - マイグレーションファイルの作成・DBへのマイグレーションのコマンドも整備しています。
 
## Test関連
Vitest・React Testing Libraryを使用しています。
