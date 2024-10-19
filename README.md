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
