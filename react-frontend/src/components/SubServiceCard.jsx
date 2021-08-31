import React from "react";
import langs from "../config/langs";
import GroupServiceFailures from "./GroupServiceFailures";
// import IncidentsBlock from "./IncidentsBlock";

const SubServiceCard = ({ group, service }) => {
  return (
    <div className="service-card service_item border-radius-0 border-right-0 border-left-0">
      {/** TODO: change span to navlink */}

      <div className="service_item--header">
        <span
          className="subtitle no-decoration font-14"
          // to="/service/1"
        >
          {service.name}
        </span>
        <span
          className={`badge float-right font-12 ${
            service.online ? "status-green" : "status-red"
          }`}
        >
          {service.online ? langs("online") : langs("offline")}
        </span>
      </div>

      <GroupServiceFailures group={group} service={service} />
      {/* <IncidentsBlock service={service} /> */}
    </div>
  );
};

export default SubServiceCard;
