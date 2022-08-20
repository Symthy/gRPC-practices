package main

import (
	"context"
	"io"
	"log"

	"github.com/Symthy/golang-practices/go-grpc/unary/pb"
	"google.golang.org/grpc"
)

func main() {
	con, err := grpc.Dial("localhost:50002", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to Server Streaming RPC Server Connect: %v", err)
	}
	defer con.Close()

	client := pb.NewFileServiceClient(con)
	callDownload(client)
}

type Server struct {
	pb.UnimplementedFileServiceServer
}

func callDownload(client pb.FileServiceClient) {
	req := &pb.DownloadRequest{Filename: "alpha.txt"}
	stream, err := client.Download(context.Background(), req)
	if err != nil {
		log.Fatalln(err)
	}

	for {
		res, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalln(err)
		}
		log.Printf("download data(bytes): %v", res.GetData())
		log.Printf("download data(bytes): %v", string(res.GetData()))
	}
}
