# Connect Traial

作成記事：

[[gRPC] Connect について 作られた背景(概要+α) と チュートリアル＋ α を通して基本的な機能を押さえる](https://qiita.com/SYM_simu/items/85d572e3520e98e09044)

## connect-go-example

```
cd connect-go-example
buf generate

go run cmd/server/main.go
go run cmd/client/main.go  // サーバにリクエスト送信するのみ
```

## connect-web-example

```
npm install
npm run codegen
npm run dev
```
