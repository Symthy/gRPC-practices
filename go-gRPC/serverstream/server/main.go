package main

import (
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"time"

	"github.com/Symthy/golang-practices/go-grpc/unary/pb"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", "localhost:50002")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	serv := grpc.NewServer()
	pb.RegisterFileServiceServer(serv, &Server{})
	fmt.Println("Server Streaming RPC Server is running...")
	if err := serv.Serve(lis); err != nil {
		log.Fatalf("Server Streaming RPC Server Failed to Serve: %v", err)
	}
}

type Server struct {
	pb.UnimplementedFileServiceServer
}

func (*Server) Download(req *pb.DownloadRequest, stream pb.FileService_DownloadServer) error {
	fmt.Println("Download invoked")
	filename := req.GetFilename()
	path := "../data/" + filename
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	buf := make([]byte, 5)
	for {
		i, err := file.Read(buf)
		if i == 0 || err == io.EOF {
			break
		}
		if err != nil {
			return err
		}

		res := &pb.DownloadResponse{Data: buf[:i]}
		sendErr := stream.Send(res)
		if sendErr != nil {
			return sendErr
		}
		time.Sleep(time.Second)
	}

	return nil
}
