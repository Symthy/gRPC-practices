package connecttry

import (
	"context"
	"fmt"

	greetv1 "connecttry/gen/greet/v1"

	"github.com/bufbuild/connect-go"
)

type GreetServer struct{}

func (s *GreetServer) Greet(
	ctx context.Context,
	req *connect.Request[greetv1.GreetRequest],
) (*connect.Response[greetv1.GreetResponse], error) {
	res := connect.NewResponse(&greetv1.GreetResponse{
		Greeting: fmt.Sprintf("Hello, %s!", req.Msg.Name),
	})
	return res, nil
}
