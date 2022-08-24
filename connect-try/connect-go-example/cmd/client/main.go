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
	fmt.Println("[send request]")
	res, err := client.Greet(
		context.Background(),
		connect.NewRequest(&greetv1.GreetRequest{Name: "Jane"}),
	)
	if err != nil {
		log.Println(err)
		return
	}
	log.Println(res.Msg.Greeting)

	fmt.Println("[send request stream]")
	clientStream := client.GreetStream(
		context.Background(),
	)
	clientStream.Send(&greetv1.GreetRequest{Name: "Verstappen"})
	clientStream.Send(&greetv1.GreetRequest{Name: "Hamilton"})
	clientStream.Send(&greetv1.GreetRequest{Name: "Leclerc"})
	time.Sleep(time.Second * 1)
	res2, err := clientStream.CloseAndReceive()
	if err != nil {
		log.Println(err)
		return
	}
	log.Println(res2.Msg.Greeting)
}
