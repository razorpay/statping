package services

var (
	CRITICAL = "critical"
	PARTIAL  = "partial"
	DELAYED  = "delayed"
	NO       = "no"
)

var (
	STATUS_UP       = "up"
	STATUS_DOWN     = "down"
	STATUS_DEGRADED = "degraded"
)

var (
	FAILURE_TYPE_COMPLETE = "complete"
	FAILURE_TYPE_DEGRADED = "degraded"
)

var failureTypeStatusMap = map[string]string{
	FAILURE_TYPE_COMPLETE: STATUS_DOWN,
	FAILURE_TYPE_DEGRADED: STATUS_DEGRADED,
}


func HandleEmptyStatus(status string) string {
	if status == ""{
		return STATUS_DOWN
	} else {
		return status
	}
}