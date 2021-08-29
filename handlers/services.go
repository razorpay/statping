package handlers

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/statping/statping/database"
	"github.com/statping/statping/types/errors"
	"github.com/statping/statping/types/failures"
	"github.com/statping/statping/types/hits"
	"github.com/statping/statping/types/services"
	"github.com/statping/statping/utils"
	"net/http"
	"time"
)

type serviceOrder struct {
	Id    int64 `json:"service"`
	Order int   `json:"order"`
}

func findService(r *http.Request) (*services.Service, error) {
	vars := mux.Vars(r)
	id := utils.ToInt(vars["id"])
	servicer, err := services.Find(id)
	if err != nil {
		return nil, err
	}
	if !servicer.Public.Bool && !IsReadAuthenticated(r) {
		return nil, errors.NotAuthenticated
	}
	return servicer, nil
}

func findPublicSubService(r *http.Request, service *services.Service) (*services.Service, error) {
	vars := mux.Vars(r)
	id := utils.ToInt(vars["sub_id"])
	if val, ok := service.SubServicesDetails[id]; ok && val.Public {
		sub, err := services.Find(id)
		if err != nil {
			return nil, err
		}
		return sub, nil
	}
	return nil, fmt.Errorf("Public sub service not mapped to parent")
}

func reorderServiceHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	var newOrder []*serviceOrder
	if err := DecodeJSON(r, &newOrder); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	for _, s := range newOrder {
		service, err := services.Find(s.Id)
		if err != nil {
			sendErrorJson(err, w, r)
			return
		}
		service.Order = s.Order
		service.Update()
	}
	returnJson(newOrder, w, r)
}

func apiServiceHandler(r *http.Request) interface{} {
	srv, err := findService(r)
	if err != nil {
		return err
	}
	srv = srv.UpdateStats()
	return *srv
}

func apiCreateServiceHandler(w http.ResponseWriter, r *http.Request) {
	var service *services.Service
	if err := DecodeJSON(r, &service); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	if err := service.Create(); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	go services.ServiceCheckQueue(service, true)

	sendJsonAction(service, "create", w, r)
}

type servicePatchReq struct {
	Online  bool   `json:"online"`
	Issue   string `json:"issue,omitempty"`
	Latency int64  `json:"latency,omitempty"`
}

func apiServicePatchHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	var req servicePatchReq
	if err := DecodeJSON(r, &req); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	//service.Online = req.Online
	service.Latency = req.Latency

	issueDefault := "Service was triggered to be offline"
	if req.Issue != "" {
		issueDefault = req.Issue
	}

	if !req.Online {
		services.RecordFailure(service, issueDefault, "trigger")
	} else {
		services.RecordSuccess(service)
	}

	if err := service.Update(); err != nil {
		sendErrorJson(err, w, r)
		return
	}

	sendJsonAction(service, "update", w, r)
}

func apiServiceUpdateHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	if err := DecodeJSON(r, &service); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	if err := service.Update(); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	go service.CheckService(true)
	sendJsonAction(service, "update", w, r)
}

func apiServiceDataHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	groupQuery, err := database.ParseQueries(r, service.AllHits())
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	objs, err := groupQuery.GraphData(database.ByAverage("latency", 1000))
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	returnJson(objs, w, r)
}

func apiServiceFailureDataHandler(w http.ResponseWriter, r *http.Request) {
	if objs, err := apiServiceFailureDataHandlerCore(r); err != nil {
		sendErrorJson(err, w, r)
	} else {
		returnJson(objs, w, r)
	}
}

func apiServiceFailureDataHandlerCore(r *http.Request) ([]*database.TimeValue, error) {
	service, err := findService(r)
	if err != nil {
		return nil, err
	}

	groupQuery, err := database.ParseQueries(r, service.AllFailures())
	if err != nil {
		return nil, err
	}

	objs, err := groupQuery.GraphData(database.ByCount)
	if err != nil {
		return nil, err
	}
	return objs, nil
}

func apiServicePingDataHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	groupQuery, err := database.ParseQueries(r, service.AllHits())
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	objs, err := groupQuery.GraphData(database.ByAverage("ping_time", 1000))
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	returnJson(objs, w, r)
}

func apiServiceTimeDataHandler(w http.ResponseWriter, r *http.Request) {
	if objs, err := apiServiceTimeDataHandlerCore(r); err != nil {
		sendErrorJson(err, w, r)
	} else {
		returnJson(objs, w, r)
	}
}

func apiServiceTimeDataHandlerCore(r *http.Request) (*services.UptimeSeries, error) {
	service, err := findService(r)
	if err != nil {
		return nil, err
	}

	groupHits, err := database.ParseQueries(r, service.AllHits())
	if err != nil {
		return nil, err
	}

	groupFailures, err := database.ParseQueries(r, service.AllFailures())
	if err != nil {
		return nil, err
	}

	var allFailures []*failures.Failure
	var allHits []*hits.Hit

	if err := groupHits.Find(&allHits); err != nil {
		return nil, err
	}

	if err := groupFailures.Find(&allFailures); err != nil {
		return nil, err
	}

	uptimeData, err := service.UptimeData(allHits, allFailures)
	if err != nil {
		return nil, err
	}
	return uptimeData, err
}

func apiSubServiceBlockSeriesHandler(w http.ResponseWriter, r *http.Request) {
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
	if objs, err := apiServiceBlockSeriesHandlerCoreV2(r, subService); err != nil {
		sendErrorJson(err, w, r)
	} else {
		returnJson(objs, w, r)
	}
}

func apiServiceBlockSeriesHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	if objs, err := apiServiceBlockSeriesHandlerCoreV2(r, service); err != nil {
		sendErrorJson(err, w, r)
	} else {
		returnJson(objs, w, r)
	}
}

func apiServiceBlockSeriesHandlerCore(r *http.Request, service *services.Service) (*services.BlockSeries, error) {

	groupHits, err := database.ParseQueries(r, service.AllHits())
	if err != nil {
		return nil, err
	}

	groupFailures, err := database.ParseQueries(r, service.AllFailures())
	if err != nil {
		return nil, err
	}

	failuresData, err := database.ParseQueries(r, service.AllFailures())
	if err != nil {
		return nil, err
	}

	objs, err := failuresData.GraphData(database.ByCount)
	if err != nil {
		return nil, err
	}

	var blockSeries services.BlockSeries = services.BlockSeries{}

	if len(objs) == 0 {
		return &blockSeries, nil
	}

	var allFailures []*failures.Failure
	var allHits []*hits.Hit

	if err := groupHits.Find(&allHits); err != nil {
		return nil, err
	}

	if err := groupFailures.Find(&allFailures); err != nil {
		return nil, err
	}

	uptimeData, err := service.UptimeData(allHits, allFailures)
	if err != nil {
		return nil, err
	}

	blockSeries.Start = uptimeData.Start
	blockSeries.End = uptimeData.End
	blockSeries.Downtime = uptimeData.Downtime
	blockSeries.Uptime = uptimeData.Uptime
	blockSeries.Series = &[]services.Block{}

	var nextFrameTime time.Time

	for c := 0; c < len(objs); c++ {

		currentFrame := objs[c]
		currentFrameTime, _ := time.Parse("2006-01-02T15:04:05Z", currentFrame.Timeframe)
		if c+1 < len(objs) {
			nextFrameTime, _ = time.Parse("2006-01-02T15:04:05Z", objs[c+1].Timeframe)
		} else {
			nextFrameTime = uptimeData.End
		}

		block := services.Block{
			Timeframe: currentFrame.Timeframe,
			Status:    services.STATUS_UP,
			Downtimes: &[]services.Downtime{}}

		for _, data := range uptimeData.Series {

			if !data.Online && currentFrameTime.Before(data.Start) && nextFrameTime.After(data.Start) {

				*block.Downtimes = append(*block.Downtimes, services.Downtime{
					Start:     data.Start,
					End:       data.End,
					Duration:  data.Duration,
					SubStatus: services.HandleEmptyStatus(data.SubStatus),
				})

				if block.Status != services.STATUS_DOWN {
					block.Status = services.HandleEmptyStatus(data.SubStatus)
				}
			}
		}
		*blockSeries.Series = append(*blockSeries.Series, block)
	}

	return &blockSeries, nil
}

func apiServiceBlockSeriesHandlerCoreV2(r *http.Request, service *services.Service) (*services.BlockSeries, error) {

	failuresData, err := database.ParseQueries(r, service.AllFailures())
	if err != nil {
		return nil, err
	}

	objs, err := failuresData.NoFailureGraphData(database.ByCount)
	if err != nil {
		return nil, err
	}

	var blockSeries services.BlockSeries = services.BlockSeries{}

	if len(objs) == 0 {
		return &blockSeries, nil
	}

	uptimeData, downtimesList, err := service.DowntimeData(failuresData.Start, failuresData.End)
	if err != nil {
		return nil, err
	}

	blockSeries.Start = uptimeData.Start
	blockSeries.End = uptimeData.End
	blockSeries.Downtime = uptimeData.Downtime
	blockSeries.Uptime = uptimeData.Uptime
	blockSeries.Series = &[]services.Block{}

	var nextFrameTime time.Time

	for c := 0; c < len(objs); c++ {

		currentFrame := objs[c]
		currentFrameTime, _ := time.Parse("2006-01-02T15:04:05Z0530", currentFrame.Timeframe)
		if c+1 < len(objs) {
			nextFrameTime, _ = time.Parse("2006-01-02T15:04:05Z0530", objs[c+1].Timeframe)
		} else {
			nextFrameTime = uptimeData.End
		}

		block := services.Block{
			Timeframe: currentFrame.Timeframe,
			Status:    services.STATUS_UP,
			Downtimes: &[]services.Downtime{}}

		for _, data := range *downtimesList {

			if currentFrameTime.Before(data.Start) && nextFrameTime.After(data.Start) {

				*block.Downtimes = append(*block.Downtimes, services.Downtime{
					Start:     data.Start,
					End:       data.End,
					Duration:  data.End.Sub(data.Start).Milliseconds(),
					SubStatus: services.HandleEmptyStatus(data.SubStatus),
				})

				if block.Status != services.STATUS_DOWN {
					block.Status = services.HandleEmptyStatus(data.SubStatus)
				}
			}
		}
		*blockSeries.Series = append(*blockSeries.Series, block)
	}

	return &blockSeries, nil
}

func apiServiceHitsDeleteHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	if err := service.AllHits().DeleteAll(); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	sendJsonAction(service, "delete", w, r)
}

func apiServiceDeleteHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	err = service.Delete()
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}

	sendJsonAction(service, "delete", w, r)
}

func apiAllServicesHandler(r *http.Request) interface{} {
	var srvs []services.Service
	for _, v := range services.AllInOrder() {
		if !v.Public.Bool && !IsUser(r) {
			continue
		}
		srvs = append(srvs, v)
	}
	return srvs
}

func apiAllSubServicesHandler(r *http.Request) interface{} {
	var srvs []services.Service
	service, err := findService(r)
	if err != nil {
		return err
	}
	if service.Type != "collection" {
		return fmt.Errorf("Not a supported operation")
	}
	for id, config := range service.SubServicesDetails {
		if config.Public {
			if sub, err := services.Find(id); err == nil {
				subClone := *sub
				subClone.DisplayName = config.DisplayName
				srvs = append(srvs, subClone)
			}
		}
	}
	return srvs
}

func servicesDeleteFailuresHandler(w http.ResponseWriter, r *http.Request) {
	service, err := findService(r)
	if err != nil {
		sendErrorJson(err, w, r)
		return
	}
	if err := service.AllFailures().DeleteAll(); err != nil {
		sendErrorJson(err, w, r)
		return
	}
	sendJsonAction(service, "delete_failures", w, r)
}

func apiServiceFailuresHandler(r *http.Request) interface{} {
	service, err := findService(r)
	if err != nil {
		return err
	}
	var fails []*failures.Failure
	query, err := database.ParseQueries(r, service.AllFailures())
	if err != nil {
		return err
	}
	query.Find(&fails)
	return fails
}

func apiServiceHitsHandler(r *http.Request) interface{} {
	service, err := findService(r)
	if err != nil {
		return err
	}
	var hts []*hits.Hit
	query, err := database.ParseQueries(r, service.AllHits())
	if err != nil {
		return err
	}
	query.Find(&hts)
	return hts
}
