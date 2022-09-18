package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	greetv1 "example/gen/greet/v1"
	"example/gen/greet/v1/greetv1connect"
	"example/internal/interceptor"

	"github.com/bufbuild/connect-go"
)

func main() {
	interceptors := connect.WithInterceptors(
		interceptor.NewAuthInterceptor(),
		interceptor.NewAuthStreamInterceptor(),
	)

	client := greetv1connect.NewGreetServiceClient(
		http.DefaultClient,
		// "http://localhost:8080",
		"http://localhost:8080/connect",
		interceptors,
	)
	fmt.Println("\n[send request: Unary RPC]")
	res, err := client.Greet(
		context.Background(),
		connect.NewRequest(&greetv1.GreetRequest{Name: "Jane"}),
	)
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Println(res.Msg.Greeting)

	fmt.Println("\n[send request: Client-side Streaming RPC]")
	clientStream := client.GreetByClientStreaming(
		context.Background(),
	)
	clientStream.Send(&greetv1.GreetRequest{Name: "Verstappen"})
	clientStream.Send(&greetv1.GreetRequest{Name: "Hamilton"})
	clientStream.Send(&greetv1.GreetRequest{Name: "Leclerc"})
	time.Sleep(time.Second * 1)
	res2, err := clientStream.CloseAndReceive()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Print(res2.Msg.Greeting)

	fmt.Println("\n[send request: Server-side Streaming RPC]")
	res3, err := client.GreetByServerStreaming(
		context.Background(),
		connect.NewRequest(&greetv1.GreetRequest{Name: "SYM"}),
	)
	if err != nil {
		fmt.Println(err)
		return
	}

	for res3.Receive() {
		fmt.Println(res3.Msg().GetGreeting())
		fmt.Printf("trailer: %v\n", res3.ResponseTrailer())
	}
	fmt.Printf("trailer: %v\n", res3.ResponseTrailer())
}
