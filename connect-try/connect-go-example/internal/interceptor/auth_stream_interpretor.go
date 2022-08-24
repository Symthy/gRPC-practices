package interceptor

import (
	"context"
	"errors"

	"github.com/bufbuild/connect-go"
)

var errNoToken = errors.New("no token provided")

type authStreamInterceptor struct{}

func NewAuthStreamInterceptor() *authStreamInterceptor {
	return &authStreamInterceptor{}
}

func (i *authStreamInterceptor) WrapUnary(next connect.UnaryFunc) connect.UnaryFunc {
	// Same as previous UnaryInterceptorFunc.
	return connect.UnaryFunc(func(
		ctx context.Context,
		req connect.AnyRequest,
	) (connect.AnyResponse, error) {
		if req.Spec().IsClient {
			// Send a token with client requests.
			req.Header().Set(tokenHeader, "sample")
		} else if req.Header().Get(tokenHeader) == "" {
			// Check token in handlers.
			return nil, connect.NewError(connect.CodeUnauthenticated, errNoToken)
		}
		return next(ctx, req)
	})
}

func (*authStreamInterceptor) WrapStreamingClient(next connect.StreamingClientFunc) connect.StreamingClientFunc {
	return connect.StreamingClientFunc(func(
		ctx context.Context,
		spec connect.Spec,
	) connect.StreamingClientConn {
		conn := next(ctx, spec)
		conn.RequestHeader().Set(tokenHeader, "sample")
		return conn
	})
}

func (i *authStreamInterceptor) WrapStreamingHandler(next connect.StreamingHandlerFunc) connect.StreamingHandlerFunc {
	return connect.StreamingHandlerFunc(func(
		ctx context.Context,
		conn connect.StreamingHandlerConn,
	) error {
		if conn.RequestHeader().Get(tokenHeader) == "" {
			return connect.NewError(connect.CodeUnauthenticated, errNoToken)
		}
		return next(ctx, conn)
	})
}
