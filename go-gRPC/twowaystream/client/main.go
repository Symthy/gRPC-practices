package main

import (
	"context"
	"io"
	"log"
	"os"
	"time"

	"github.com/Symthy/golang-practices/go-grpc/twowaystream/pb"
	"google.golang.org/grpc"
)

func main() {
	con, err := grpc.Dial("localhost:50004", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to Two-way Streaming RPC Server Connect: %v", err)
	}
	defer con.Close()

	client := pb.NewFileServiceClient(con)
	callUpload(client)
}

func callUpload(client pb.FileServiceClient) {
	filename := "alpha.txt"
	path := "../data/" + filename
	file, err := os.Open(path)
	if err != nil {
		log.Fatalln(err)
	}
	defer file.Close()

	stream, err := client.UploadAndNotify(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	sendToServer(file, stream)
	recvFromServer(stream)
}

func sendToServer(file *os.File, stream pb.FileService_UploadAndNotifyClient) {
	buf := make([]byte, 5)
	go func() {
		for {
			num, err := file.Read(buf)
			if num == 0 || err == io.EOF {
				break
			}
			if err != nil {
				log.Fatalln(err)
			}

			req := &pb.UploadAndNotifyRequest{Data: buf[:num]}
			sendErr := stream.Send(req)
			if sendErr != nil {
				log.Fatalln(sendErr)
			}
			time.Sleep(time.Second)
		}

		err := stream.CloseSend()
		if err != nil {
			log.Fatalln(err)
		}
	}()
}

func recvFromServer(stream pb.FileService_UploadAndNotifyClient) {
	ch := make(chan struct{})
	go func() {
		for {
			res, err := stream.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				log.Fatalln(err)
			}

			log.Printf("received message: %v", res.GetMsg())
		}
		close(ch)
	}()
	<-ch
}
