# Connect お試し

以下をやってみた

ref: [Programming カテゴリ gRPC がフロントエンド通信の第一の選択肢になる時代がやってきたかも？](https://future-architect.github.io/articles/20220819a/)

## 実践

use： golang、connect、solidjs

```
go mod init connect-try
npx degit solidjs/templates/ts frontend

go install github.com/bufbuild/buf/cmd/buf@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install github.com/bufbuild/connect-go/cmd/protoc-gen-connect-go@latest
cd frontend
npm install --save-dev @bufbuild/protoc-gen-connect-web @bufbuild/protoc-gen-es
npm install @bufbuild/connect-web
```

```
buf mod init  // buf.yaml 自動生成
// buf.gen.yaml 作成してから
buf generate
```

※ buf.gen.yaml の path の項目は、使用 OS にパスセパレータを合わせないと buf generate が失敗する

## refs

- [よくわかる context の使い方](https://zenn.dev/hsaki/books/golang-context/viewer/done)

- [frontend-go](https://github.com/shibukawa/frontend-go)
  - go サーバー用の SPA (Single Page Application) スタイル Web アプリケーションフロントエンドヘルパー。このパッケージは、Next.js、Vue.js、SvelteKit、Solid.js で動作します。
  - リバースプロキシとして機能？ リクエストを go の server で受け取り、go 側の API やフロントエンドへの振り分けを行うイメージ
