package main

import (
	"fmt"
	"io"
	"log"
	"net"

	"github.com/Symthy/golang-practices/go-grpc/twowaystream/pb"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", "localhost:50004")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	serv := grpc.NewServer()
	pb.RegisterFileServiceServer(serv, &Server{})
	fmt.Println("Two-way Streaming RPC Server is running...")
	if err := serv.Serve(lis); err != nil {
		log.Fatalf("Two-way Streaming RPC Server Failed to Serve: %v", err)
	}
}

type Server struct {
	pb.UnimplementedFileServiceServer
}

func (*Server) UploadAndNotify(stream pb.FileService_UploadAndNotifyServer) error {
	fmt.Println("UploadingAndNotify invoked")
	size := 0
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			return nil
		}
		if err != nil {
			return err
		}

		data := req.GetData()
		log.Printf("received data: %v", data)
		size += len(data)

		res := &pb.UploadAndNotifyResponse{
			Msg: fmt.Sprintf("total received: %v bytes", size),
		}
		err = stream.Send(res)
		if err != nil {
			return err
		}
	}
}
