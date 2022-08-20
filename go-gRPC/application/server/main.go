package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net"

	"github.com/Symthy/golang-practices/go-grpc/unary/pb"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func main() {
	lis, err := net.Listen("tcp", "localhost:50006")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	// ssl
	// credentials, err := credentials.NewServerTLSFromFile(
	// 	"ssl/localhost.pem",
	// 	"ssl/localhost-key.pem",
	// )
	// if err != nil {
	// 	log.Fatalln(err)
	// }

	server := grpc.NewServer(
		// grpc.Creds(credentials), // ssl
		grpc.UnaryInterceptor(
			grpc_middleware.ChainUnaryServer(
				buildLogging(),
				grpc_auth.UnaryServerInterceptor(authorize),
			),
		),
	)
	pb.RegisterFileServiceServer(server, &Server{})
	fmt.Println("Try gRPC Application Server is running...")
	if err := server.Serve(lis); err != nil {
		log.Fatalf("Try gRPC Application Server Failed to Serve: %v", err)
	}
}

func buildLogging() grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		log.Printf("request: %+v", req)
		resp, err = handler(ctx, req)
		if err != nil {
			return nil, err
		}
		log.Printf("response: %+v", resp)
		return resp, nil
	}
}

func authorize(ctx context.Context) (context.Context, error) {
	token, err := grpc_auth.AuthFromMD(ctx, "Bearer")
	if err != nil {
		return nil, err
	}

	if token != "grpc_test_token" {
		// return nil, errors.New("bad token")
		return nil, status.Error(codes.Unauthenticated, "token is invalid")
	}
	return ctx, nil
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

	if len(paths) == 0 {
		return nil, status.Error(codes.NotFound, "not found file")
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
