//go:build release

package connecttry

import (
	"embed"

	"github.com/shibukawa/frontend-go"
)

//go:embed frontend/dist/*
var asset embed.FS

func init() {
	frontend.SetFrontAsset(asset, frontend.Opt{
		FrameworkType: frontend.SolidJS,
	})
}
