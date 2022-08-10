package handlers

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/statping/statping/types/errors"
	"github.com/statping/statping/types/incidents"
	"github.com/statping/statping/types/services"
	"github.com/statping/statping/utils"
	"net/http"
	"time"
)

func findIncident(r *http.Request) (*incidents.Incident, int64, error) {
	vars := mux.Vars(r)
	if utils.NotNumber(vars["id"]) {
		return nil, 0, errors.NotNumber
	}
	id := utils.ToInt(vars["id"])
	if id == 0 {
		return nil, id, errors.IDMissing
	}
	checkin, err := incidents.Find(id)
	if err != nil {
		return nil, id, errors.Missing(&incidents.Incident{}, id)
	}
	return checkin, id, nil
}

func apiServiceIncidentsHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	returnJson(service.Incidents, w, r)
}

func apiServiceIncidentsHandlerActive(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	visibleIncidents := getVisibleIncidentsOfService(service)
	returnJson(visibleIncidents, w, r)
}

func apiSubServiceIncidentsHandlerActive(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	subService, err := findPublicSubService(r, service)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	visibleIncidents := getVisibleIncidentsOfService(subService)
	returnJson(visibleIncidents, w, r)
}

func getVisibleIncidentsOfService(service *services.Service) []incidents.Incident {
	var visibleIncidents []incidents.Incident
	var visibleIncidentIds []int64
	for _, incident := range service.Incidents {
		if visibilityCheck(incident) == true {
			incidentVar := *incident
			reverse(incidentVar.Updates)
			visibleIncidents = append(visibleIncidents, incidentVar)
			visibleIncidentIds = append(visibleIncidentIds, incident.Id)
		}
	}
	log.Info(fmt.Sprintf("Visible Incidents of Service %v : %v", service.Name, visibleIncidentIds))
	return visibleIncidents
}

func reverse(incidents []*incidents.IncidentUpdate) {
	for i, j := 0, len(incidents)-1; i < j; i, j = i+1, j-1 {
		incidents[i], incidents[j] = incidents[j], incidents[i]
	}
}

func visibilityCheck(incident *incidents.Incident) bool {
	incidentUpdates := incident.Updates
	log.Infof(fmt.Sprintf("Latest Incident Update: %v, Time Diff: %v ", &incidentUpdates[len(incidentUpdates)-1], timeDiff(incidentUpdates[len(incidentUpdates)-1])))
	if len(incidentUpdates) == 0 {
		return true
	}
	if !(incidentUpdates[len(incidentUpdates)-1].Type == resolved && timeDiff(incidentUpdates[len(incidentUpdates)-1]) > incidentsTimeoutInMinutes) {
		return true
	}

	return false
}

func timeDiff(update *incidents.IncidentUpdate) float64 {
	return time.Now().Sub(update.CreatedAt).Minutes()
}

func apiIncidentUpdatesHandler(w http.ResponseWriter, r *http.Request) {
	incid, _, err := findIncident(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	returnJson(incid.Updates, w, r)
}

func apiCreateIncidentUpdateHandler(w http.ResponseWriter, r *http.Request) {
	incid, _, err := findIncident(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	var update *incidents.IncidentUpdate
	if err := DecodeJSON(r, &update); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	update.IncidentId = incid.Id

	if err := update.Create(); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	sendJsonAction(update, "create", w, r)
}

func apiCreateIncidentHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	var incident *incidents.Incident
	if err := DecodeJSON(r, &incident); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	incident.ServiceId = service.Id
	if err := incident.Create(); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	sendJsonAction(incident, "create", w, r)
}

func apiUpdateIncidentHandler(w http.ResponseWriter, r *http.Request) {
	incident, _, err := findIncident(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	var incidentVar *incidents.Incident
	if err := DecodeJSON(r, &incidentVar); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	incident.Title = incidentVar.Title
	incident.Description = incidentVar.Description
	if err := incident.Update(); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	sendJsonAction(incident, "update", w, r)
}

func apiIncidentUpdateHandler(w http.ResponseWriter, r *http.Request) {
	incident, _, err := findIncident(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	if err := DecodeJSON(r, &incident); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	sendJsonAction(incident.Updates, "update", w, r)
}

func apiDeleteIncidentHandler(w http.ResponseWriter, r *http.Request) {
	incident, _, err := findIncident(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	if err := incident.Delete(); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	sendJsonAction(incident, "delete", w, r)
}

func apiDeleteIncidentUpdateHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	update, err := incidents.FindUpdate(utils.ToInt(vars["uid"]))
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	if err := update.Delete(); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	sendJsonAction(update, "delete", w, r)
}
