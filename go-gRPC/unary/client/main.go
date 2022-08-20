package main

import (
	"context"
	"fmt"
	"log"

	"github.com/Symthy/golang-practices/go-grpc/unary/pb"
	"google.golang.org/grpc"
)

func main() {
	con, err := grpc.Dial("localhost:50001", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to Unary RPC Server Connect: %v", err)
	}
	defer con.Close()

	client := pb.NewFileServiceClient(con)
	callListsFiles(client)
}

func callListsFiles(client pb.FileServiceClient) {
	res, err := client.ListsFiles(context.Background(), &pb.ListFilesRequest{})
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(res.GetFilenames())
}
