package miscelnarious

import (
	"time"
)

// WhoAmI - struct for whoami responses
type WhoAmI struct {
	IP       string `json:"ipaddress"`
	Language string `json:"language"`
	Software string `json:"software"`
}

// TimeStamp - timestamp
type TimeStamp struct {
	UNIX int64     `json:"unix"`
	UTC  time.Time `json:"time"`
}
