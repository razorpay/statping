package services

import (
	"fmt"
	"github.com/razorpay/statping/database"
	"github.com/razorpay/statping/types/errors"
	"github.com/razorpay/statping/types/metrics"
	"github.com/razorpay/statping/utils"
	"sort"
	"time"
)

var (
	db          database.Database
	log         = utils.Log.WithField("type", "service")
	allServices map[int64]*Service
)

func (s *Service) Validate() error {
	if s.Name == "" {
		return errors.New("missing service name")
	} else if s.Domain == "" && s.Type != "static" {
		return errors.New("missing domain name")
	} else if s.Type == "" {
		return errors.New("missing service type")
	} else if s.Interval == 0 && s.Type != "static" {
		return errors.New("missing check interval")
	}
	return nil
}

func (s *Service) BeforeCreate() error {
	return s.Validate()
}

func (s *Service) BeforeUpdate() error {
	return s.Validate()
}

func (s *Service) AfterFind() {
	//db.Model(s).Related(&s.Incidents).Related(&s.Messages).Related(&s.Checkins).Related(&s.Incidents)
	metrics.Query("service", "find")
}

func (s *Service) AfterCreate() error {
	s.prevOnline = true
	s.LastProcessingTime = time.Now()
	db.Update(s)
	allServices[s.Id] = s
	metrics.Query("service", "create")
	return nil
}

func (s *Service) AfterUpdate() {
	metrics.Query("service", "update")
}

func (s *Service) AfterDelete() {
	metrics.Query("service", "delete")
}

func init() {
	allServices = make(map[int64]*Service)
}

func Services() map[int64]*Service {
	return allServices
}

func SetDB(database database.Database) {
	db = database.Model(&Service{})
}

func Find(id int64) (*Service, error) {
	srv := allServices[id]
	if srv == nil {
		return nil, errors.Missing(&Service{}, id)
	}
	res := db.First(&srv, id)
	return srv, res.Error()
}

func FindFirstFromDB(id int64) (*Service, error) {
	var srv = Service{}
	res := db.First(&srv, id)
	return &srv, res.Error()
}

func FindOne(id int64) (*Service, error) {
	srv := allServices[id]
	if srv == nil {
		return nil, errors.Missing(&Service{}, id)
	}
	service := &Service{}
	db.Preload(INCIDENTS).First(&service, id)
	return service, nil
}

func all() []*Service {
	var services []*Service
	db.Find(&services)
	return services
}

func All() map[int64]*Service {
	return allServices
}

func AllInOrder() []Service {
	var services []Service
	for _, service := range allServices {
		//service.UpdateStats()
		services = append(services, *service)
	}
	sort.Sort(ServiceOrder(services))
	return services
}

func (s *Service) Create() error {
	err := db.Create(s)
	if err.Error() != nil {
		log.Errorln(fmt.Sprintf("Failed to create service %v #%v: %v", s.Name, s.Id, err))
		return err.Error()
	}
	return nil
}

func (s *Service) Update() error {
	s.Close()
	q := db.Update(s)
	delete(allServices, s.Id)
	//s.SleepDuration = s.Duration()
	//go ServiceCheckQueue(allServices[s.Id], true)
	return q.Error()
}

func (s *Service) UpdateOrder() (err error) {
	updateFields := map[string]interface{}{
		"order_id": s.Order,
	}

	d := db.Model(s).Where(" id = ? ", s.Id).Updates(updateFields)
	if err = d.Error(); d.Error() != nil {
		log.Errorf("[DB ERROR]Failed toservice order : %v %s %s %s", s.Id, s.Name, updateFields, d.Error())
		return err
	}
	if d.RowsAffected() == 0 {
		err = fmt.Errorf("[Zero]Failed to update service order : %v %s %s %s", s.Id, s.Name, updateFields, d.Error())
		log.Errorf("[Zero]Failed to update service order : %v %s %s %s", s.Id, s.Name, updateFields, d.Error())
		return err
	}
	log.Infof("Service Order updates Saved : %v %s %s", s.Id, s.Name, updateFields)
	return nil
}

func (s *Service) Delete() error {

	if err := s.AllFailures().DeleteAll(); err != nil {
		return err
	}
	if err := s.AllHits().DeleteAll(); err != nil {
		return err
	}
	if err := s.DeleteCheckins(); err != nil {
		return err
	}
	db.Model(s).Association("Checkins").Clear()
	if err := s.DeleteIncidents(); err != nil {
		return err
	}
	db.Model(s).Association("Incidents").Clear()
	if err := s.DeleteMessages(); err != nil {
		return err
	}
	db.Model(s).Association("Messages").Clear()

	s.Close()
	delete(allServices, s.Id)
	q := db.Model(&Service{}).Delete(s)
	return q.Error()
}

func (s *Service) DeleteMessages() error {
	for _, m := range s.Messages {
		if err := m.Delete(); err != nil {
			return err
		}
	}
	db.Model(s).Association("messages").Clear()
	return nil
}

func (s *Service) DeleteCheckins() error {
	for _, c := range s.Checkins {
		if err := c.Delete(); err != nil {
			return err
		}
	}
	db.Model(s).Association("checkins").Clear()
	return nil
}

func (s *Service) acquireServiceRun() error {

	rows := db.Model(s).Where("last_processing_time + (check_interval * interval '1 second') < ?", time.Now()).Update("last_processing_time", time.Now())

	if rows.RowsAffected() == 0 {
		return errors.New("Service already acquired")
	}
	return nil
}

func (s *Service) UpdateSpecificFields(updateFields map[string]interface{}) error {
	d := db.Model(s).Where(" id = ?", s.Id).Updates(updateFields)
	if d.Error() != nil {
		log.Errorf("[DB ERROR]Failed to update service : %v %s %s %s", s.Id, s.Name, updateFields, d.Error())
		return d.Error()
	}
	if d.RowsAffected() == 0 {
		log.Errorf("[Zero]Failed to update service : %v %s %s %s", s.Id, s.Name, updateFields, d.Error())
		return fmt.Errorf("Failed to update Service fields : %v", s.Id)
	}
	log.Infof("Service Updates Saved : %v %s %s", s.Id, s.Name, updateFields)
	return nil
}

func (s *Service) markServiceRunProcessed() {
	updateFields := map[string]interface{}{
		"online":           s.Online,
		"last_check":       s.LastCheck,
		"last_success":     s.LastOnline,
		"last_error":       s.LastOffline,
		"failure_counter":  s.FailureCounter,
		"current_downtime": s.CurrentDowntime,
	}

	d := db.Model(s).Where(" id = ? and manual_downtime = ?", s.Id, false).Updates(updateFields)
	if d.Error() != nil {
		log.Errorf("[DB ERROR]Failed to update service run : %v %s %s %s", s.Id, s.Name, updateFields, d.Error())
		return
	}
	if d.RowsAffected() == 0 {
		log.Errorf("[Zero]Failed to update service run : %v %s %s %s", s.Id, s.Name, updateFields, d.Error())
		return
	}
	log.Infof("Service Run Updates Saved : %v %s %s", s.Id, s.Name, updateFields)
}
