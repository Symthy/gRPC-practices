package server

import (
	"context"
	"fmt"
	"log"
	"strings"

	greetv1 "example/gen/greet/v1" // generated by protoc-gen-go
	"example/gen/greet/v1/greetv1connect"

	"github.com/bufbuild/connect-go"
)

var _ greetv1connect.GreetServiceHandler = (*GreetServer)(nil)

type GreetServer struct{}

func (s *GreetServer) Greet(
	ctx context.Context,
	req *connect.Request[greetv1.GreetRequest],
) (*connect.Response[greetv1.GreetResponse], error) {
	log.Println("Request headers: ", req.Header())

	if err := ctx.Err(); err != nil {
		return nil, err // automatically coded correctly
	}
	if err := validateGreetRequest(req.Msg); err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	greeting, err := doGreetWork(ctx, req.Msg)
	if err != nil {
		return nil, connect.NewError(connect.CodeUnknown, err)
	}

	res := connect.NewResponse(&greetv1.GreetResponse{
		Greeting: greeting,
	})
	res.Header().Set("Greet-Version", "v1")
	return res, nil
}

func validateGreetRequest(msg *greetv1.GreetRequest) error {
	if msg.GetName() == "" {
		return fmt.Errorf("No name specified for greeting")
	}
	return nil
}

func doGreetWork(ctx context.Context, msg *greetv1.GreetRequest) (string, error) {
	if strings.ToLower(msg.Name) == "error" {
		return "", fmt.Errorf("invalid name")
	}
	return fmt.Sprintf("Hello, %s!", msg.Name), nil
}

func (s *GreetServer) GreetStream(
	ctx context.Context,
	stream *connect.ClientStream[greetv1.GreetRequest],
) (*connect.Response[greetv1.GreetResponse], error) {
	log.Println("Request headers: ", stream.RequestHeader())
	var greeting strings.Builder
	// stream
	for stream.Receive() {
		g := fmt.Sprintf("Hello, %s!\n", stream.Msg().Name)
		if _, err := greeting.WriteString(g); err != nil {
			return nil, connect.NewError(connect.CodeInternal, err)
		}
	}
	if err := stream.Err(); err != nil {
		return nil, connect.NewError(connect.CodeUnknown, err)
	}
	res := connect.NewResponse(&greetv1.GreetResponse{
		Greeting: greeting.String(),
	})
	res.Header().Set("Greet-Version", "v1")
	return res, nil
}
