# gRPC practice

proto基本

```sh
cd basic
protoc -I. --go_out=. proto/*.proto
```

Unary RPC

```sh
cd unary
protoc -I. --go_out=. --go-grpc_out=. proto/*.proto
```

Server Streming RPC

```sh
cd serverstream
protoc -I. --go_out=. --go-grpc_out=. proto/*.proto
```

Client Streaming RPC

```sh
cd clientstream
protoc -I. --go_out=. --go-grpc_out=. proto/*.proto
```

Two-way Streaming RPC

```sh
cd twowaystream
protoc -I. --go_out=. --go-grpc_out=. proto/*.proto
```