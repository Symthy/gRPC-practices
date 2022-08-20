package main

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"net"

	"github.com/Symthy/golang-practices/go-grpc/clientstream/pb"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", "localhost:50003")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	serv := grpc.NewServer()
	pb.RegisterFileServiceServer(serv, &Server{})
	fmt.Println("Client Streaming RPC Server is running...")
	if err := serv.Serve(lis); err != nil {
		log.Fatalf("Client Streaming RPC Server Failed to Serve: %v", err)
	}
}

type Server struct {
	pb.UnimplementedFileServiceServer
}

func (*Server) Upload(stream pb.FileService_UploadServer) error {
	fmt.Println("Upload invoked")
	var buf bytes.Buffer
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			res := &pb.UploadResponse{Size: int32(buf.Len())}
			return stream.SendAndClose(res)
		}
		if err != nil {
			return err
		}

		data := req.GetData()
		log.Printf("Received data(bytes): %v", data)
		log.Printf("Received data(string): %v", string(data))
		buf.Write(data)
	}
}
