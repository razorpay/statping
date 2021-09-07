package handlers

import (
	"github.com/gorilla/mux"
	"github.com/statping/statping/types/downtimes"
	"github.com/statping/statping/utils"
	"net/http"
	"time"
)

func findDowntime(r *http.Request) (*downtimes.Downtime, error) {
	vars := mux.Vars(r)
	id := utils.ToInt(vars["id"])
	downtime, err := downtimes.Find(id)
	if err != nil {
		return nil, err
	}

	return downtime, nil
}

func apiAllDowntimesForServiceHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	service_id := utils.ToInt(vars["service_id"])

	ninetyDaysAgo := time.Now().Add(time.Duration(-90*24) * time.Hour)

	downtime, err := downtimes.FindByService(service_id, ninetyDaysAgo, time.Now())
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	sendJsonAction(downtime, "fetch", w, r)
}

func apiCreateDowntimeHandler(w http.ResponseWriter, r *http.Request) {
	var downtime *downtimes.Downtime
	if err := DecodeJSON(r, &downtime); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	if err := downtime.Create(); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	sendJsonAction(downtime, "create", w, r)
}

func apiDowntimeHandler(w http.ResponseWriter, r *http.Request) {
	downtime, err := findDowntime(r)
	if downtime == nil {
		sendErrorJson(err, w, r)
		return
	}
	sendJsonAction(downtime, "fetch", w, r)
}

func apiPatchDowntimeHandler(w http.ResponseWriter, r *http.Request) {
	downtime, err := findDowntime(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	var req downtimes.Downtime
	if err := DecodeJSON(r, &req); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	downtime.Start = req.Start
	downtime.End = req.End
	downtime.Manual = req.Manual
	downtime.Failures = req.Failures
	downtime.SubStatus = req.SubStatus

	if err := downtime.Update(); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	sendJsonAction(downtime, "update", w, r)
}

func apiDeleteDowntimeHandler(w http.ResponseWriter, r *http.Request) {
	downtime, err := findDowntime(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	err = downtime.Delete()
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	sendJsonAction(downtime, "delete", w, r)
}
