package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/shibukawa/frontend-go"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	"connecttry"
	"connecttry/gen/greet/v1/greetv1connect"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	greeter := &connecttry.GreetServer{}
	mux := http.NewServeMux()
	path, handler := greetv1connect.NewGreetServiceHandler(greeter)
	mux.Handle(path, handler)
	mux.Handle("/", frontend.MustNewSPAHandler(ctx)) // リバースプロキシ経由でSPAを表示

	serv := &http.Server{
		Addr:    ":8888",
		Handler: h2c.NewHandler(mux, &http2.Server{}),
	}

	go func() {
		<-ctx.Done() // キャンセルされたら進む
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		serv.Shutdown(ctx)
	}()
	fmt.Println("start receiving at :8888")
	log.Fatal(serv.ListenAndServe())
}
