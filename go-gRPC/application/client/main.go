package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Symthy/golang-practices/go-grpc/unary/pb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

func main() {
	// ssl
	// certfile := "xxxxxx/rootCA.pem"
	// creds, err := credentials.NewClientTLSFromFile(certFile, "")
	// con, err := grpc.Dial("localhost:50000", grpc.WithTransportCredentials(creds))
	con, err := grpc.Dial("localhost:50006", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to Try gRPC Application Server Connect: %v", err)
	}
	defer con.Close()

	client := pb.NewFileServiceClient(con)
	callListsFiles(client)
}

func callListsFiles(client pb.FileServiceClient) {
	md := metadata.New(map[string]string{"authorization": "Bearer bad-token"})
	ctx := metadata.NewOutgoingContext(context.Background(), md)

	ctx2, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	//res, err := client.ListsFiles(context.Background(), &pb.ListFilesRequest{})
	res, err := client.ListsFiles(ctx2, &pb.ListFilesRequest{})
	if err != nil {
		resErr, ok := status.FromError(err)
		if ok {
			if resErr.Code() == codes.NotFound {
				log.Fatalf("Error Code: %v, Error Message: %v", resErr.Code(), resErr.Message())
			} else if resErr.Code() == codes.DeadlineExceeded {
				log.Fatalln("deadline exceeded")
			} else if resErr.Code() == codes.Unauthenticated {
				log.Fatalln("unauthenticated")
			} else {
				log.Fatalln("unknown error")
			}
		} else {
			log.Fatalln(err)
		}
	}
	fmt.Println(res.GetFilenames())
}
