import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateUtils from "../utils/DateUtils";
import Group from "./Group";
import ContentHeader from "./ContentHeader";
import ServiceLoader from "./ServiceLoader";
// import IncidentService from "./IncidentService";
// import MessageBlock from "./MessageBlock";
// import ServiceBlock from "./ServiceBlock";
// import ServicesList from "./ServicesList";
import API from "../config/API";
import { STATUS_COLOR, STATUS_ICON, STATUS_TEXT } from "../utils/meta";
import { findStatus } from "../utils/helper";

const ServicesPage = () => {
  // const data = messages.filter((m) => inRange(m) && m.service === 0);
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const today = DateUtils.format(new Date(), "d MMMM yyyy, hh:mm aaa");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await API.fetchServices();
        const status = findStatus(data);
        setServices(data);
        setStatus(status);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="app-layout">
      <div className="container col-md-7 col-sm-12 sm-container">
        <ContentHeader />
        <div className="app-content">
          <div className="service">
            <h2 className="title font-20">Razorpay payments</h2>
            <div className="d-flex align-items-center subtitle font-12">
              <span className="icon">
                <FontAwesomeIcon
                  icon={STATUS_ICON[status]}
                  style={{
                    fontSize: "16px",
                    color: STATUS_COLOR[status],
                  }}
                />
              </span>
              {STATUS_TEXT[status]}
              <span className="date">{today}</span>
            </div>
          </div>

          {loading && <ServiceLoader text="Loading Services" />}

          {/* <ServicesList loading={loading} services={services} /> */}

          {/* TODO --> Grouped Services to Accordian*/}
          {services && services.length > 0 ? (
            <Group services={services} />
          ) : (
            <span>No Services</span>
          )}

          {/* <div>
            {data.map((message) => {
              return <MessageBlock key={message.id} message={message} />;
            })}
          </div>

          <div>
            {services.map((service) => {
              return <ServiceBlock key={service.id} service={service} />;
            })}
          </div> */}
        </div>

        <div className="app-footer">
          <div className="service-status">
            <span className="service-status-badge uptime"></span>
            <span className="description font-12">100% Uptime</span>
            <span></span>
          </div>
          <div className="service-status">
            <span className="service-status-badge degraded"></span>
            <span className="description font-12">Partial degradation</span>
            <span></span>
          </div>
          <div className="service-status">
            <span className="service-status-badge downtime"></span>
            <span className="description font-12">Downtime</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
