package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net"

	"github.com/Symthy/golang-practices/go-grpc/unary/pb"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", "localhost:50006")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	server := grpc.NewServer()
	pb.RegisterFileServiceServer(server, &Server{})
	fmt.Println("Unary RPC Server is running...")
	if err := server.Serve(lis); err != nil {
		log.Fatalf("Unary RPC Server Failed to Serve: %v", err)
	}
}

type Server struct {
	pb.UnimplementedFileServiceServer
}

func (*Server) ListsFiles(ctx context.Context, req *pb.ListFilesRequest) (*pb.ListFilesResponse, error) {
	fmt.Println("ListFiles invoked")
	dir := "../data"
	paths, err := ioutil.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	var filenames []string
	for _, path := range paths {
		if !path.IsDir() {
			filenames = append(filenames, path.Name())
		}
	}
	res := &pb.ListFilesResponse{
		Filenames: filenames,
	}
	return res, nil
}
