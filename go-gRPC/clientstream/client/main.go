package main

import (
	"context"
	"io"
	"log"
	"os"
	"time"

	"github.com/Symthy/golang-practices/go-grpc/clientstream/pb"
	"google.golang.org/grpc"
)

func main() {
	con, err := grpc.Dial("localhost:50003", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to Server Streaming RPC Server Connect: %v", err)
	}
	defer con.Close()

	client := pb.NewFileServiceClient(con)
	callUpload(client)
}

type Server struct {
	pb.UnimplementedFileServiceServer
}

func callUpload(client pb.FileServiceClient) {
	filename := "symthy.txt"
	path := "../data/" + filename

	file, err := os.Open(path)
	if err != nil {
		log.Fatalln(err)
	}
	defer file.Close()

	stream, err := client.Upload(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	buf := make([]byte, 5)
	for {
		num, err := file.Read(buf)
		if num == 0 || err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalln(err)
		}

		req := &pb.UploadRequest{Data: buf[:num]}
		sendErr := stream.Send(req)
		if sendErr != nil {
			log.Fatalln(sendErr)
		}
		time.Sleep(time.Second)
	}

	res, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatalln(err)
	}
	log.Printf("size value in received data: %v", res.GetSize())
}
