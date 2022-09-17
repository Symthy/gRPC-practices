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
	fmt.Println("\n[send request]")
	res, err := client.Greet(
		context.Background(),
		connect.NewRequest(&greetv1.GreetRequest{Name: "Jane"}),
	)
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Println(res.Msg.Greeting)

	fmt.Println("\n[send request client stream]")
	clientStream := client.GreetStream(
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

	fmt.Println("\n[send request server stream]")
	res3, err := client.GreetServerStream(
		context.Background(),
		connect.NewRequest(&greetv1.GreetRequest{Name: "SYM"}),
	)
	if err != nil {
		fmt.Println(err)
		return
	}

	for res3.Receive() {
		fmt.Println(res3.Msg().GetGreeting())
		printTrailer(res3)
	}
	printTrailer(res3)
}

func printTrailer[T any](res *connect.ServerStreamForClient[T]) {
	fmt.Print("trailer: ")
	fmt.Println(res.ResponseTrailer())
}
